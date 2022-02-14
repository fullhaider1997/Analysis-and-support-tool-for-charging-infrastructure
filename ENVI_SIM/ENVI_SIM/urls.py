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


from account.views import login_user,register_user
from home_page.views import home_page_view
from google_map.views import google_map_view
from menu.views import menu,test
urlpatterns = [
    path('admin/', admin.site.urls),
    path("", home_page_view ,name="home"),
    path("",include("home_page.urls") ),
    path("account/", include("account.urls")),
    path("account/",include("django.contrib.auth.urls")),
  
    path("account/login/envi-sim/menu",menu),
    
    path("fleet_report/", include("fleet_report.urls"))
]


