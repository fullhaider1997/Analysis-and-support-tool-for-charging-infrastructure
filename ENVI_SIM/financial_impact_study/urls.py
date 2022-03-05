
from django.contrib import admin
from django.urls import path,include


from financial_impact_study.views import financialDashboard


urlpatterns = [   
    path("", financialDashboard, name="financial_impact_study"),
    
    
]