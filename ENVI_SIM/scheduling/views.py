from django.shortcuts import render

from django.shortcuts import render

# Create your views here.

def schedulingDashboard(request):
    return render(request,"scheduling/scheduling_dashboard.html")
