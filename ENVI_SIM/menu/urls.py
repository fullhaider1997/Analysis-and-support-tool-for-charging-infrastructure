from django.contrib import admin
from django.urls import path,include


from export.views import exportDashBoard
from BusDashBoard.views import fuelDashBoard,eletricalDashBoard
from menu.views import menu,hello

from routes.views import route1,route2, route3c,route3m,route3j,route4,route5, route6,route7,route8,route9,route10,route11,route12,route13,route14,route16
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
    ,path("routes/",include("routes.urls")),

    path("route1/", route1, name= "route1"),
    path("route2/", route2, name= "route2"),
    path("route3c/", route3c, name= "route3c"),
    path("route3m/", route3m, name= "route3m"),
    path("route3j/", route3j, name= "route3j"),
    path("route4/", route4, name= "route4"),
    path("route5/", route5, name= "route5"),
    path("route6/", route6, name= "route6"),
    path("route7/", route7, name= "route7"),
    path("route8/", route8, name= "route8"),
    path("route9/", route9, name= "route9"),
    path("route10/", route10, name= "route10"),
    path("route11/", route11, name= "route11"),
    path("route12/", route12, name= "route12"),
    path("route13/", route13, name= "route13"),
    path("route14/", route14, name= "route14"),
    path("route16/", route16, name= "route16")


]