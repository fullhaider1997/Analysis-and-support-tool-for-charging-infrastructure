
from django.contrib import admin
from django.urls import path

from energy_consumption_study.views import  energyConsumptionDashBoard,hello

urlpatterns = [   
    path("", energyConsumptionDashBoard, name="energy_consumption_study"),

    
    
]

