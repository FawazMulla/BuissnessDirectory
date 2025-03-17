from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Authentication URLs
    path('login/', auth_views.LoginView.as_view(template_name='buisdict/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    
    # Password Reset URLs
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='buisdict/password_reset.html'), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='buisdict/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='buisdict/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='buisdict/password_reset_complete.html'), name='password_reset_complete'),

    path("logout/", views.logout_view, name="logout"),
]