from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('profile/', profile_view, name='profile-view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', user_registration, name='register'),
    path('quotes/', submit_quote, name='submit_quote'),
    path('quote-history/', quote_history, name='quote_history'),
    path('getquote/', get_quote_price, name='get_quote_price'),
]