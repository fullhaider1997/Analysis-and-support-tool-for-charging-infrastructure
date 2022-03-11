
from django.contrib import admin
from django.conf.urls import url   
from django.urls import path,include


from . import views


urlpatterns = [   
   
    path("", views.routesDashBoard, name="routes"),
    path("",views.default_map,name="default"),
    path("", views.routeOne, name= "routeOne"), 
]

