from django.shortcuts import render

# Create your views here.
def energyConsumptionDashBoard(request):
    return render(request, "energy_consumption_study/energy_dashboard.html")
    

def socStudy(request):
    return render(request,"energy_consumption_study/soc_study.html")

def speedStudy(request):
    return render(request,"energy_consumption_study/speed_profile.html")

def TimeStudy(request):
    return render(request,"energy_consumption_study/time_study.html")

def hello(request):
    return render(request, "<div> hello </div>")