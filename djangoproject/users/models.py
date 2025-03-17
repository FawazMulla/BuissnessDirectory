from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact_no = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    buiness_name = models.TextField(blank=True, null=True)
    google_map_link = models.URLField(blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    image = models.ImageField(default='default.jpg',upload_to='images_uploaded',blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} Profile '
