from django.shortcuts import render

# Create your views here.

def scheduleDashBoard(request):
    return render(request,"schedule_impact_study/schedule_dashboard.html")

