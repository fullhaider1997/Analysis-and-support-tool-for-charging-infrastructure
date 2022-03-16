
  
from django.urls import path


from . import views


urlpatterns = [   
   
    path("", views.routesDashBoard, name="routesbase"),
    path("", views.route1, name= "route1"),
    path("", views.route2, name= "route2"),
    path("", views.route3c, name= "route3c"),
    path("", views.route3j, name= "route3j"),
    path("", views.route3m, name= "route3m"),
    path("", views.route4, name= "route4"),
    path("", views.route5, name= "route5"),
    path("", views.route6, name= "route6"),
    path("", views.route7, name= "route7"),
    path("", views.route8, name= "route8"),
    path("", views.route9, name= "route9"),
    path("", views.route10, name= "route10"),
    path("", views.route11, name= "route12"),
    path("", views.route12, name= "route12"),
    path("", views.route13, name= "route13"),
    path("", views.route14, name= "route14"),
    path("", views.route16, name= "route16")
    #path("",views.default_map,name="default"),
]

