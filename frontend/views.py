
from django.shortcuts import render

# Create your views here.
from django.views import View


def index(request):
    return render(request, 'index.html')


def verify(request):
    return render(request, 'verify.html')
