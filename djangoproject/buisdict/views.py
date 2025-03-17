from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

def index(request):
    return render(request, 'buisdict/index.html')



@login_required
def dashboard(request):
    return render(request, 'buisdict/dashboard.html')
