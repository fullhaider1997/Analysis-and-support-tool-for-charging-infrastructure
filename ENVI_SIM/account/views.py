from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
import logging
from account.forms import FleetManagmentOperatorForm
# Create your views here.


def logout_user(request):
    logout(request)
    messages.success(request, ("You were logged out"))
    return redirect("home")
  

def login_user(request):

    if request.method == "POST":
         
         username = request.POST.get('username')
         password = request.POST.get('password')
         user = authenticate(request, username=username,password=password)

         if user is not None:
            if user.is_active:
                login(request, user)
                messages.success(request, ("You sucessfully logged in"))
                return redirect("google_map_view")

         else:
            messages.success(request, ("There was an Error login in, Try again"))
            return redirect("login")

    else:
        return render(request,"account/login.html" )

      
    


def register_user(request):
    form = UserCreationForm()

    if request.method =="POST":
        form = FleetManagmentOperatorForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            user = authenticate(username=username,password=password)
            login(request,user)
            messages.success(request, ("Registration is sucessful"))
            return redirect("/envi-sim/google_map")
    else:
         form = FleetManagmentOperatorForm()

        

    return render (request,"registration/registration.html", {"form":form})


def haider(request):
    return render (request, "account/haider.html")