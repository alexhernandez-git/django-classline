
from django.shortcuts import render

# Create your views here.
from django.views import View
from django.views.decorators.clickjacking import xframe_options_exempt


def index(request):
    return render(request, 'index.html')


@xframe_options_exempt
def academy(request):
    return render(request, 'index.html')
