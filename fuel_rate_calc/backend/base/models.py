from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=100, default='address')
    city = models.CharField(max_length=50, default='city')
    state = models.CharField(max_length=50, default='state')
    zip_code = models.CharField(max_length=10, default='zip_code')
    def __str__(self):
        return self.user.username