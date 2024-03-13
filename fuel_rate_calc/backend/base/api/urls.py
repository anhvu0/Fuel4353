from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import submit_quote, quote_history

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('profile/', views.profile_view, name='profile-view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.user_registration, name='register'),
    path('quotes/', submit_quote, name='submit_quote'),
    path('quote-history/', quote_history, name='quote_history'),
]