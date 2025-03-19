from django.urls import path
from . import views

urlpatterns = [

    path('register/', views.register, name='register'),  # Added register URL
    path('contact/', views.contactus, name='contact'),  # Added contact us URL
]