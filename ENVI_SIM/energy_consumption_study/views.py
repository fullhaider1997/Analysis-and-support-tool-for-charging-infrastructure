from django.shortcuts import render

# Create your views here.
def energyConsumptionDashBoard(request):
    return render(request, "energy_consumption_study/energy_consumption_study.html")
    

def hello(request):
    return render(request, "<div> hello </div>")