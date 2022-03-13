
from django.contrib import admin
from django.conf.urls import url   
from django.urls import path,include


from . import views


urlpatterns = [   
   
    path("", views.routesDashBoard),
    path("",views.default_map,name="default"),
    path("/routeOne", views.routeOne, name= "routeOne"), 
]

