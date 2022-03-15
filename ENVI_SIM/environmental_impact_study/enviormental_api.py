from ast import Constant
from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from utilities.constants import ELECTIC_BUS_CO2_EMISSION, DISEL_BUS_CO2_EMISSION

@csrf_exempt
def retrieveCO2EmissionData(request):

   if request.method == "POST":
        print("Incoming request: enviormental")
        print(json.loads(request.body.decode("utf-8")))
        post_data = json.loads(request.body.decode("utf-8"))
        print(post_data["name"])
        url = post_data["name"]
        print(url)
        
        df = pd.read_csv(url,encoding= 'unicode_escape', on_bad_lines='skip', header=None, skiprows=[0])
        #print(df[9]*EV_CO2_EMISSION)
        #num = EV_CO2_EMISSION
 
        #df[9]=df[9].astype(float)
        #print(df[13])
        
        #df = df.assign(factor = lambda df:(df[13] /60))
        df = df.assign(co2_disel_emission = lambda df:(df[12] *DISEL_BUS_CO2_EMISSION))
        #df[9] = df[9].astype(float)
        df = df.assign(co2_eletrical_emission = lambda df:( df[9] *ELECTIC_BUS_CO2_EMISSION))
        print(df)
        df = df.to_json()
       
        
        
        return HttpResponse(df)
        