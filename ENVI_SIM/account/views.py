from django.shortcuts import redirect, render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
# Create your views here.


def logout_user(request):
    pass
  

def login_user(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, 
                            username=username,
                            password=password)

        if user is not None:
            login(request, user)
            return redirect("home")
            # Redirect to a success page.
       
        else:

            messages.success(request,("There was  an error logging, try again !"))
            return redirect("login")
            # Return an 'invalid login' error message.
        


    return render (request,"account/login.html")


def sign_up(request):
     if request.method == "POST":
        form = UserCreationForm(request.POST)

     if form.is_valid():
         form.save()
         username = form.clean_data["username"]
         password = form.clean_data["password"]

         user = authenticate( username=username, password=password)




     return render (request,"account/registration.html", {'form': form})