
from django.contrib import admin
from django.urls import path,include


from scheduling.views import schedulingDashboard


urlpatterns = [   
    path("", schedulingDashboard, name="scheduling"),
    
    
]