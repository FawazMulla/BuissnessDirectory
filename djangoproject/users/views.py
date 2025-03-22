from django.shortcuts import render,redirect
from django.contrib import messages
from django.core.mail import send_mail
from .forms import UserRegisterForm
from .forms import ContactUSForm
from django.conf import settings
from .models import Profile

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST,request.FILES)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request,f'Your Account Created for username: {username} . You can login now')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request,'users/register.html',{'form':form})

def contactus(request):
    if request.method == 'POST':
        form = ContactUSForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data.get('name')
            email = form.cleaned_data.get('email')
            subject = form.cleaned_data.get('subject')
            message = form.cleaned_data.get('message')
            try:
                send_mail(
                f"New Contact Form Submission: {subject}",  # More descriptive subject
                f"From: {name} <{email}>\n\n{message}",  # Includes sender's details
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],
                fail_silently=False,  # Will raise an error if email fails
                )
                messages.success(request,f'Thank you {name} for contacting us. We will get back to you soon.')
                return redirect('index')
            except Exception as e:
                messages.error(request, "Error sending email. Please try again later.")
                # print(f"Email Error: {e}")
    else:
        form = ContactUSForm()
    return render(request,'users/contactus.html',{'form':form})

def explorer(request):
    explore_list = Profile.objects.all()
    return render(request,'users/explorer.html',
                  {'explore_list':explore_list})

