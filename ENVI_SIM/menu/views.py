from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def menu(request):
    return render(request, "menu/menu_page.html")

@csrf_exempt
def hello(request):

   if request.method == "POST":
        print("Incoming request")
        print(json.loads(request.body.decode("utf-8")))
        post_data = json.loads(request.body.decode("utf-8"))
        print(post_data["name"])
        url = post_data["name"]
        print(url)
        df = pd.read_csv(url,encoding= 'unicode_escape', on_bad_lines='skip', header=None)
        df = df.to_json()
        print(df)
        return HttpResponse(df)
        

