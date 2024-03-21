from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

#def ready(self):
        #from .signal import create_profile, save_profile
#if stuff breaks, uncomment this