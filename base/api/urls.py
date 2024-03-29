from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('profile/', profile_view, name='profile_view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', user_registration, name='register'),
    path('submit-quote/', submit_quote, name='submit_quote'),
    path('quote-history/', quote_history, name='quote_history'),
    path('get-quote/', get_quote_price, name='get_quote_price'),
    path('ppg/', current_price_per_gallon, name='current_price_per_gallon'),
]