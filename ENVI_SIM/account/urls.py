from django.contrib import admin
from django.urls import path,include 


from account.views import register_user,haider, logout_user,login_user


urlpatterns = [
   path('login_user/', login_user, name="login"),
   path('register_user/', register_user, name="register_user"),
   path("logout/", logout_user, name="logout")
  
  

]
