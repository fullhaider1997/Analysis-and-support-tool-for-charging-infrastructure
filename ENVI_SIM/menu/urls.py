from django.contrib import admin
from django.urls import path,include


from export.views import exportDashBoard
from BusDashBoard.views import fuelDashBoard,eletricalDashBoard
from menu.views import menu

urlpatterns = [   
    path("", menu ,name="main"),
    path("export/", include("export.urls")),
    path("energy_consumption_study/", include("energy_consumption_study.urls")),
   

    path("schedule_impact_study/",include("schedule_impact_study.urls")),
    path("environmental_impact_study/",include("environmental_impact_study.urls")),
    path("financial_impact_study/",include("financial_impact_study.urls")),
    path("charging_stations/", include("charging_stations.urls")),
    path("scheduling/", include("scheduling.urls")),
    path("bus/", include("BusDashBoard.urls")),
    path("Electrical/",eletricalDashBoard),
    path("Fuel/",fuelDashBoard)
    

]