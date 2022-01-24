from django.contrib import admin
from django.urls import path,include 


from account.views import register_user,haider, logout_user,login_user
from google_map.views import google_map_view


urlpatterns = [
   path('login_user/', login_user, name="login"),
   path('register_user/', register_user, name="register_user"),
   path("logout/", logout_user, name="logout"),
   path("logout/", logout_user, name="logout"),
   path("login/envi-sim/google_map",google_map_view),
   path("account/register_user/",google_map_view)
  
  

]
