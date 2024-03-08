from django.urls import path
from . import views
from .views import MyTokenObtainPairView
#from .views import UserRegistrationAPIView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('profile/', views.get_profile),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('register/', UserRegistrationAPIView.as_view(), name='register'),"""
    path('register/', views.user_registration, name='register'),  # Updated
]