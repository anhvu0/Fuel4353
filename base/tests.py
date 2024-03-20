from django.test import RequestFactory, TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from base.models import Profile
from base.api.views import profile_view, user_registration, submit_quote, quote_history, get_quote_price


class ProfileViewTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')

    def test_get_profile(self):
        request = self.factory.get('/profile/')
        request.user = self.user
        response = profile_view(request)
        self.assertEqual(response.status_code, 401)  # No profile exists yet

        profile = Profile.objects.create(user=self.user, bio='Test Bio')
        response = profile_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bio'], 'Test Bio')

    def test_create_profile(self):
        request = self.factory.post('/profile/', {'bio': 'New Bio'}, format='json')
        request.user = self.user
        response = profile_view(request)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(Profile.objects.count(), 1)
        self.assertEqual(Profile.objects.first().bio, 'New Bio')

    def test_update_profile(self):
        profile = Profile.objects.create(user=self.user, bio='Initial Bio')
        request = self.factory.patch('/profile/', {'bio': 'Updated Bio'}, format='json')
        request.user = self.user
        response = profile_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Profile.objects.first().bio, 'Updated Bio')

    def test_profile_not_found(self):
        request = self.factory.get('/profile/')
        request.user = self.user
        response = profile_view(request)
        self.assertEqual(response.status_code, 401)

    def test_profile_already_exists(self):
        profile = Profile.objects.create(user=self.user, bio='Test Bio')
        request = self.factory.post('/profile/', {'bio': 'New Bio'}, format='json')
        request.user = self.user
        response = profile_view(request)
        self.assertEqual(response.status_code, 400)


class UserRegistrationTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.client = APIClient()

    def test_user_registration(self):
        request = self.factory.post('/register/', {'username': 'testuser', 'password': 'testpassword'}, format='json')
        response = user_registration(request)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_invalid_user_registration(self):
        request = self.factory.post('/register/', {'username': '', 'password': ''}, format='json')
        response = user_registration(request)
        self.assertEqual(response.status_code, 400)
        self.assertFalse(User.objects.filter(username='').exists())

class SubmitQuoteTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_submit_quote(self):
        request = self.factory.post('/submit_quote/', {'location': 'New York', 'gallons_requested': 100}, format='json')
        request.user = self.user
        response = submit_quote(request)
        self.assertEqual(response.status_code, 201)

    def test_invalid_submit_quote(self):
        request = self.factory.post('/submit_quote/', {'location': '', 'gallons_requested': ''}, format='json')
        request.user = self.user
        response = submit_quote(request)
        self.assertEqual(response.status_code, 400)

class QuoteHistoryTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_quote_history(self):
        request = self.factory.get('/quote_history/')
        request.user = self.user
        response = quote_history(request)
        self.assertEqual(response.status_code, 200)

class GetQuotePriceTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_get_quote_price(self):
        request = self.factory.post('/get_quote_price/', {'location': 'New York', 'gallons_requested': 100}, format='json')
        request.user = self.user
        response = get_quote_price(request)
        self.assertEqual(response.status_code, 200)
