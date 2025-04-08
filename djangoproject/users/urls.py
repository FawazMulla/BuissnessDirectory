from django.urls import path
from . import views

urlpatterns = [

    path('register/', views.register, name='register'),  # Added register URL
    path('contact/', views.contactus, name='contact'),  # Added contact us URL
    path('explore/', views.explorer, name='explore'),  # Added explorer URL
    path('update_info/',views.update_info, name='update_info'),
    path('explore/<str:category>/', views.explore_category, name='explore_category'),
    path('business/<int:pk>/', views.business_detail, name='business_detail'),

]