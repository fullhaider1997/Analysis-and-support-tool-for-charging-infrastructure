from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
import logging
# Create your views here.


def logout_user(request):
    pass
  

def login_user(request):

    if request.method == "POST":
         logger = logging.getLogger("mylogger")
         logger.info("Whatever to log")
         username = request.POST.get('username')
         password = request.POST.get('password')
         user = authenticate(request, username=username,password=password)

         if user is not None:
            login(request, user)
            return render (request,"fleet_report/fleet_report.html")

         else:
            messages.success(request, ("There was an Error login in, Try again"))
            return redirect("login")

    else:
        return render(request,"account/login.html" )

      
    


def sign_up(request):
    form = UserCreationForm()
    
   
 
    return render (request,"account/registration.html", {"form":form})


def haider(request):
    return render (request, "account/haider.html")