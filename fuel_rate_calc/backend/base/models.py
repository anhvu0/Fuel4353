from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=50, blank=True)
    addressOne = models.CharField(max_length=50, blank=True)
    addressTwo = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=50, blank=True)
    zip_code = models.CharField(max_length=9, blank=True,
        validators=[
            RegexValidator(
                regex=r'^\d{5}(\d{4})?$',
                message='Zip code must be either 5 or 9 digits.',
                code='invalid_zip_code'
            )
        ]
    )
    def __str__(self):
        return self.user.username