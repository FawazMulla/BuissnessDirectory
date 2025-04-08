from django.shortcuts import render,redirect,get_object_or_404
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
from users.forms import UserRegisterForm,UserUpdateForm,ProfileUpdateForm
from users.forms import ContactUSForm
from django.conf import settings
from .models import Profile

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST,request.FILES)
        if form.is_valid():
            user = form.save()
            Profile.objects.create(
                user=user,
                buiness_name=form.cleaned_data['buiness_name'],  # Typo fixed from 'buiness_name' to 'business_name'
                contact_no=form.cleaned_data['contact_no'],
                address=form.cleaned_data['address'],
                about=form.cleaned_data.get('about', ''),  # Optional field
                google_map_link=form.cleaned_data['google_map_link'],
                image=form.cleaned_data.get('image', None),
                profile_type=form.cleaned_data['profile_type'],
            )
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
                f"From: {name} \nEMAIL:- <{email}>\nSUBJECT:- {subject}\nMESSAGE:- {message}\n",  # Includes sender's details
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

@login_required
def update_info(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST,  request.FILES,instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('dashboard')  
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'users/update_info.html', context)

def explorer(request):
    explore_list = Profile.objects.all()
    return render(request,'users/explore.html',
                  {'explore_list':explore_list})


def explore_category(request, category=None):
    if category:
        explore_list = Profile.objects.filter(profile_type__iexact=category)
    else:
        explore_list = Profile.objects.all()
    return render(request, 'users/explore.html', {'explore_list': explore_list, 'category': category})

def business_detail(request, pk):
    business = get_object_or_404(Profile, pk=pk)
    return render(request, 'users/explore_cat.html', {'business': business})