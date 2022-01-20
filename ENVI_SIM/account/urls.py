from django.contrib import admin
from django.urls import path


from account.views import login


urlpatterns = [

   path("/account", view=login)

]
