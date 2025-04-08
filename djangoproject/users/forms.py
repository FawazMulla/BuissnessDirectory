from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from . models import Profile

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
    CATEGORY_CHOICES = [
        ('medical', 'Medical'),
        ('food', 'Food'),
    ]
    profile_type = forms.ChoiceField(choices=CATEGORY_CHOICES, required=True)
    class Meta:
        model = User
        fields = ['username',
                  'email',
                  'password1',
                  'password2',
                  'buiness_name',
                  'profile_type',
                  'about',
                  'google_map_link',
                  'images'
                  ]
        
class ContactUSForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea(attrs={
        'rows': 2, 
        'cols': 40, 
        'style': 'width: 500px; height: 80px;'}),required=True)
    
class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username',
                  'email']

class ProfileUpdateForm(forms.ModelForm):
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
    CATEGORY_CHOICES = [
            ('medical', 'Medical'),
            ('food', 'Food'),
        ]
    profile_type = forms.ChoiceField(choices=CATEGORY_CHOICES, required=True)
    class Meta:
            model = Profile
            fields = ['buiness_name',
                    'profile_type',
                    'about',
                    'google_map_link',
                    'images',
                    'contact_no',
                    'address'
                    ]