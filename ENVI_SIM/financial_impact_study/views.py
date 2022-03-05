from django.shortcuts import render

# Create your views here.

def financialDashboard(request):
    return render(request,"financial_impact_study/financial_dashboard.html")
