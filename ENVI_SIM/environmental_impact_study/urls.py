
from django.contrib import admin
from django.urls import path,include


from environmental_impact_study.views import environmentalDashboard


urlpatterns = [   
    path("", environmentalDashboard, name="environmental_impact_study"),
    
    
]
