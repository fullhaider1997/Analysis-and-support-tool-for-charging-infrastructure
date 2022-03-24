from ast import Constant
from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def retrieveCostData(request):
   if request.method == "POST":
        print("Incoming request: cost")
        print(json.loads(request.body.decode("utf-8")))
        post_data = json.loads(request.body.decode("utf-8"))
        print(post_data["path"])
        url = post_data["path"]
        print(url)
        
        df = pd.read_csv(url,encoding= 'unicode_escape', on_bad_lines='skip', header=None, skiprows=[0])
        df = df.to_json()
       
        
        
        return HttpResponse(df)