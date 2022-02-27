
from django.contrib import admin
from django.urls import path,include


from export.views import exportDashBoard


urlpatterns = [   
    path("", exportDashBoard, name="export"),
    
    
]

