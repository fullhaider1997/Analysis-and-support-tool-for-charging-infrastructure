from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def menu(request):
    return render(request, "menu/menu_page.html")


        

