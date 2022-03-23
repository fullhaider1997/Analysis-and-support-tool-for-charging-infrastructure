"""ENVI_SIM URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from routes.routes_api import routeTable


from account.views import login_user,register_user
from home_page.views import home_page_view
from google_map.views import google_map_view
from menu.views import menu
from energy_consumption_study.energy_api import retrieveEnergyData,retrieveSpeedData,retrieveTripID
from environmental_impact_study.enviormental_api import retrieveCO2EmissionData
from scheduling.scheduling_api import sendUserSimulationParamters
urlpatterns = [
    path('admin/', admin.site.urls),
    path("", home_page_view ,name="home"),
    path("main/" ,include("menu.urls")),
    path("",include("home_page.urls") ),
    path("account/",include("account.urls")),
    path("routes/",include("routes.urls")),

    path("retrieveCO2EmissionData/",retrieveCO2EmissionData, name="retrieveCO2EmissionData"),
    path("retrieveEnergyData/",retrieveEnergyData,name="retrieveEnergyData"),
    path("retrieveSpeedData/",retrieveSpeedData,name="retrieveSpeedData"),
    path("retrieveTripID/",retrieveTripID, name="retrieveTripID"),
    path("routeTable/",routeTable, name="routeTable"),
    path("sendUserSimulationParamters/",sendUserSimulationParamters, name="sendUserSimulationParamters")
    
]


