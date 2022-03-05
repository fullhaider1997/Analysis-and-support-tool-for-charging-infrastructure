
from django.contrib import admin
from django.urls import path,include


from schedule_impact_study.views import scheduleDashBoard


urlpatterns = [   
    path("", scheduleDashBoard, name="schedule_impact_study"),
    
    
]
