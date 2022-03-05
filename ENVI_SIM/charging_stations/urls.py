
from django.contrib import admin
from django.urls import path,include


from charging_stations.views import chargingDashboard


urlpatterns = [   
    path("", chargingDashboard, name="charging_stations"),
]