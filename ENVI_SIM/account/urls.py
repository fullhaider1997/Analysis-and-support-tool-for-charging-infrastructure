from django.contrib import admin
from django.urls import path,include 


from account.views import login, haider


urlpatterns = [
   path('haider/', haider),
  
  

]
