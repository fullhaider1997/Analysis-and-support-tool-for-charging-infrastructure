from django.contrib import admin
from django.urls import path,include


from export.views import exportDashBoard
from BusDashBoard.views import fuelDashBoard,eletricalDashBoard
from energy_consumption_study.views import socStudy,speedStudy,TimeStudy
from menu.views import menu

from routes.views import routeOne
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
    path("Fuel/",fuelDashBoard),
    path("routes/",include("routes.urls")),
    path("soc_study/", socStudy),
    path("speed_study/",speedStudy),
    path("time_study/",TimeStudy),

    path("routeOne/", routeOne, name= "routeOne")
]