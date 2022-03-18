from ast import Constant
from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from utilities.constants import DISTANCE_TRAVELLED,AVG_SPEED

@csrf_exempt
def retrieveEnergyData(request):

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

@csrf_exempt
def retrieveSpeedData(request):
    same = 1
    if request.method == "POST":
        print("Incoming request: from speed api")
        print(json.loads(request.body.decode("utf-8")))
        post_data = json.loads(request.body.decode("utf-8"))
        print(post_data["name"])
        url = post_data["name"]
        print(url)
        df = pd.read_csv(url,encoding= 'unicode_escape', on_bad_lines='skip')
        df = df[(df.route_id == "1")]
        df = df[["arrival_time","speed","trip_id"]]
        old_id = df["trip_id"][291]
        print(old_id)
        speed = []
        time = []
        trip = []


        df = df.to_json()
       
        return HttpResponse(df)

@csrf_exempt
def retrieveTripID(request):

      if request.method == "POST":
        print("Incoming request")
        print(json.loads(request.body.decode("utf-8")))
        post_data = json.loads(request.body.decode("utf-8"))
        print(post_data["name"])
        url = post_data["name"]
        print(url)
        df = pd.read_csv(url,encoding= 'unicode_escape', on_bad_lines='skip')

        df = df["trip_id"].to_json()
        print(df)
        return HttpResponse(df)