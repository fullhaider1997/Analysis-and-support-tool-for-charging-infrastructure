
  
from django.urls import path


from . import views


urlpatterns = [   
   
    path("", views.routesDashBoard, name="routesbase"),
    
    #path("",views.default_map,name="default"),
]

