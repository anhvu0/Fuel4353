from django.test import RequestFactory, TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from base.models import Profile, QuoteForm
from base.api.views import profile_view, user_registration, submit_quote, quote_history, get_quote_price
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.url = reverse('token_obtain_pair')  # Replace 'token_obtain_pair' with your actual URL name

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
        self.url = reverse('profile_view')  # Replace 'profile_view' with your actual URL name

    def test_get_profile_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_profile_creation(self):
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  # Assuming profile already exists

    def test_patch_profile_update(self):
        response = self.client.patch(self.url, {'field_to_update': 'new_value'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserRegistrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('register')  # Make sure 'register' matches the name in your URLconf.

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
    # Example for missing username, similar approach can be applied for missing passwords
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
    # This test assumes 'validate_password' enforces certain strength requirements.
        data = {
            'username': 'userweakpw',
            'password': '123456789',  # Password is entirely numeric
            'password2': '123456789'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Adjust the assertion to match the nested structure under 'errors' key
        self.assertIn('password', response.data['errors'])  # Now correctly accessing the nested 'errors' key

        # If you want to check for a specific error message related to password strength, adjust accordingly
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

        # If you want to check for a specific error message related to password strength, adjust accordingly
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

#This test below is not working yet.
    """def test_get_quote_price(self):
        self.authenticate()
        url = reverse('get_quote_price')
        data = {
            'location': 'Texas',
            'gallons_requested': 500
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check for keys in response. Add more detailed assertions based on your business logic.
        self.assertIn('suggested_price', response.json())
        self.assertIn('total_amount_due', response.json())"""

    # Add more tests for different scenarios and error cases