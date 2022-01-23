from django.contrib import admin
from django.urls import path,include


from home_page.views import home_page_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path("home_page/",home_page_view ),
    
    
    
]