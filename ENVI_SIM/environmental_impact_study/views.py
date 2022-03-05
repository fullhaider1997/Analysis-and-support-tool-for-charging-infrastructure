from django.shortcuts import render

# Create your views here.

def environmentalDashboard(request):
    return render(request,"environmental_impact_study/enviormental_dashboard.html")