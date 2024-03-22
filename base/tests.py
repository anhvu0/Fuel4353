from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from base.models import Profile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from unittest.mock import patch

class MyTokenObtainPairViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.url = reverse('token_obtain_pair')

    def test_token_obtain_success(self):
        response = self.client.post(self.url, {'username': 'testuser', 'password': 'password'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_obtain_fail(self):
        response = self.client.post(self.url, {'username': 'wronguser', 'password': 'password'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ProfileViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.profile = Profile.objects.create(user=self.user)
        self.client.force_authenticate(user=self.user)
        self.url = reverse('profile_view')

    def test_get_profile_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_profile_creation(self):
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST) 

    def test_patch_profile_update(self):
        response = self.client.patch(self.url, {'field_to_update': 'new_value'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserRegistrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('register')

    def test_user_registration_success(self):
        data = {
            'username': 'newuser',
            'password': 'test123@@',
            'password2': 'test123@@'  # Passwords match
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())  # Check the user was created

    def test_passwords_do_not_match(self):
        data = {
            'username': 'testuser',
            'password': 'test321pw##',
            'password2': 'test321##'  # Passwords do not match
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data['errors'])  # Now correctly accessing the nested 'errors' key

        # If you want to check for a specific error message related to password strength, adjust accordingly
        password_errors = response.data['errors']['password']
        self.assertTrue(any("Password fields didn't match" in error for error in password_errors))


    def test_missing_required_fields(self):
        data = {
            'password': 'test123@@',
            'password2': 'test123@@'  # Missing username
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Adjusted check for username error in response to match the structure
        self.assertIn('username', response.data['errors'])  
        self.assertEqual(response.data['errors']['username'][0].code, 'required')


    def test_invalid_password1(self):
        data = {
            'username': 'userweakpw',
            'password': '123456789',  # Password is entirely numeric
            'password2': '123456789'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Adjust the assertion to match the nested structure under 'errors' key
        self.assertIn('password', response.data['errors'])

        password_errors = response.data['errors']['password']
        self.assertTrue(any("This password is entirely numeric." in error for error in password_errors))
        

    def test_invalid_password2(self):
    # This test assumes 'validate_password' enforces certain strength requirements.
        data = {
            'username': 'userweakpw',
            'password': 'testxab',  # Example of a short password. Must be at least 8 characters.
            'password2': 'testxab'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data['errors'])

        password_errors = response.data['errors']['password']
        self.assertTrue(any("This password is too short." in error for error in password_errors))

class TestViews(APITestCase):

    def setUp(self):
        # Create a user for authenticated tests
        self.user = User.objects.create_user(username='testauser', password='test123@@')
        self.token = RefreshToken.for_user(self.user)
    
    def authenticate(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token.access_token}')

    def test_profile_view_get_not_found(self):
        self.authenticate()
        url = reverse('profile_view')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_submit_quote_unauthenticated(self):
        url = reverse('submit_quote')
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_quote_history_empty(self):
        self.authenticate()
        url = reverse('quote_history')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])  # Assuming no quotes exist yet

    def test_get_quote_price(self):
        self.authenticate()
        url = reverse('get_quote_price')
        data = {
            'location': 'TX',
            'gallons_requested': 500
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('suggested_price', response.json())
        self.assertIn('total_amount_due', response.json())
        
class SubmitQuoteTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.profile = Profile.objects.create(user=self.user, 
                                              full_name='Test User',
                                              addressOne='123 Main St',
                                              addressTwo='Apt 1',
                                              city='Anytown',
                                              state='TX',
                                              zip_code='12345')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.quote_url = reverse('submit_quote')
        delivery_address = f"{self.profile.addressOne} {self.profile.addressTwo}, {self.profile.city}, {self.profile.state}, {self.profile.zip_code}"
        self.valid_quote_data = {
            'delivery_address': delivery_address,
            'gallons_requested': 1000,
            'delivery_date': '2021-12-31',
            'price_per_gallon': 2.00,
            'total_amount_due': 2000.0
        }
        self.invalid_quote_data = {
            'delivery_address': '   ',  # Invalid because delivery address is empty
            'gallons_requested': 1000,
            'delivery_date': '2021-12-31',
            'price_per_gallon': 2.00,
            'total_amount_due': 2000.0
        }

    
    def test_submit_quote_with_valid_data(self):
        response = self.client.post(self.quote_url, self.valid_quote_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)

        # Iterate over each key-value pair in the valid quote data
        for key, value in self.valid_quote_data.items():
            if key in response.data:
                # If the value is numeric, convert both the expected and actual values to floats for comparison
                if isinstance(value, (int, float)):
                    self.assertEqual(float(response.data[key]), float(value))
                else:
                    self.assertEqual(response.data[key], value)

    def test_submit_quote_with_invalid_data(self):
        response = self.client.post(self.quote_url, self.invalid_quote_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('delivery_address', response.data)
        self.assertIn('This field may not be blank.', response.data['delivery_address'])


class CurrentPricePerGallonTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('base.api.pricing.get_price_per_gallon') 
    def test_current_price_per_gallon(self, mock_get_price_per_gallon):

        url = reverse('current_price_per_gallon') 

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"current_price_per_gallon": 1.5})