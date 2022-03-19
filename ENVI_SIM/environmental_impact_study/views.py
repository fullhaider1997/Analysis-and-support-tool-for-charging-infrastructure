from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def environmentalDashboard(request):
    return render(request,"environmental_impact_study/enviormental_dashboard.html")





