from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True) #By Default it was True
    contact_no = forms.RegexField(
        regex=r'^\+?\d{7,15}$',  # Allows numbers with an optional '+' at the start
        error_messages={'invalid': 'Enter a valid phone number (7-15 digits).'}
    )
    buiness_name = forms.CharField(widget=forms.Textarea(attrs={
        'rows': 2, 
        'cols': 40, 
        'style': 'width: 600px; height: 40px;'}),required=True)
    address = forms.CharField(widget=forms.Textarea(attrs={
        'rows': 2, 
        'cols': 40, 
        'style': 'width: 600px; height: 40px;'}),required=True)
    about = forms.CharField(widget=forms.Textarea(attrs={
        'rows': 2, 
        'cols': 40, 
        'style': 'width: 600px; height: 80px;'}),required=False)
    images = forms.ImageField(required=False)
    google_map_link = forms.URLField(required=True)
    class Meta:
        model = User
        fields = ['username',
                  'email',
                  'password1',
                  'password2',
                  'buiness_name',
                  'contact_no',
                  'about',
                  'google_map_link',
                  'images'
                  ]