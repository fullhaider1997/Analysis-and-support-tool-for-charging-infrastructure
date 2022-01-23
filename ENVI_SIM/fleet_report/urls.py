from django.contrib import admin
from django.urls import path,include

from .views import main_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", main_page),
   
    
    
    
]
