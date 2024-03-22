from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator

class Profile(models.Model): #models.py file define the database schema. Each class is a table in the database.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=50, blank=True)
    addressOne = models.CharField(max_length=100, blank=True)
    addressTwo = models.CharField(max_length=100, blank=True)
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
    
class QuoteForm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quotes')
    gallons_requested = models.PositiveIntegerField(validators=[
            MinValueValidator(0),
            MaxValueValidator(10000000)  # Ensure gallons_requested does not exceed 10,000,000
            ]
    )
    delivery_address = models.CharField(max_length=410)  # Combined address at the time of the quote
    delivery_date = models.DateField()
    price_per_gallon = models.DecimalField(max_digits=5, decimal_places=2)
    total_amount_due = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.delivery_date}"

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if the quote is being created for the first time
            profile = self.user.profile
            # Combine address fields from the user's profile for this quote
            self.delivery_address = f"{profile.addressOne} {profile.addressTwo}, {profile.city}, {profile.state}, {profile.zip_code}"
        super().save(*args, **kwargs)