from ast import Constant
from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from python_scripts.hungarian.optimizer import get_optimal_assignment
from python_scripts.data_generators.MacroMicroGenerators import *
from python_scripts.data_generators.TripSetGenerator import *
from python_scripts.classes.Station import *
from python_scripts.classes.Bus import *
from python_scripts.classes.EnergyEstimator import *
from python_scripts.classes.Assigner import *
import time

start = time.time()
def print_time_cost(start_time):
    print('[time_cost : {}]'.format(time.time() - start_time))
    return time.time()
    

@csrf_exempt
def sendUserSimulationParamters(request):

   if request.method == "POST":
        print("Incoming request: scheduling")
        print(json.loads(request.body.decode("utf-8")))
        post_data = json.loads(request.body.decode("utf-8"))
        print(post_data["off_peak"])
        print(post_data["on_peak"])
        print(post_data["mid_peak"])
        print(post_data["behavior_id"])
        print(post_data["road_condition_id"])
        print(post_data["season_id"])
        print(post_data["people_density_id"])
        print(post_data["soc_upper_limit"])
        print(post_data["soc_lower_limit"])
        print(post_data["Proterra_ZX5_input"])
        print(post_data["BYD_K9_input"])
        print(post_data["Volvo_7900_input"])
        print(post_data["disel_buses_output"])
        print(post_data["maintenace_id"])
        print(post_data["operational_id"])
        print(post_data["location_1"])
        print(post_data["location_2"])
        print(post_data["location_3"])
        print(post_data["location_4"])
        print(post_data["type_1"])
        print(post_data["type_2"])
        print(post_data["type_3"])
        print(post_data["type_4"])

        travel_condition_list = [post_data["behavior_id"], post_data["road_condition_id"], post_data["people_density_id"], post_data["season_id"]]
        bus_settings_list = [post_data["soc_upper_limit"], post_data["soc_lower_limit"], post_data["BYD_K9_input"], post_data["Proterra_ZX5_input"], post_data["Volvo_7900_input"], post_data["disel_buses_output"], 
        post_data["maintenace_id"], post_data["operational_id"]]
        cost_list = [post_data["off_peak"], post_data["mid_peak"], post_data["on_peak"], post_data["fuel_cost"]]
        terminal_list = [post_data["location_1"], post_data["type_1"], post_data["location_2"], post_data["type_2"], post_data["location_3"], post_data["type_3"], post_data["location_4"], post_data["type_4"]]
        terminal_list = list(filter(None, terminal_list))
        cost_list = [int(float(i)) if round(float(i)) == float(i) else float(i) for i in cost_list]
        bus_settings_list = [int(float(i)) if round(float(i)) == float(i) else float(i) for i in bus_settings_list]
        done = print_time_cost(start) # print time
        print('Initializing input...') # checkpoint
        input = {}
        input['stations'] = {}
        input['stations']['default'] = ['Fast', 20, 240, 15] # default_charger, charge_rate(Slow), charge_rate(Fast), op_time(Swap)
        input['stations']['terminals'] = terminal_list # charging_stations, type
        input['cost'] = cost_list # [0.08, 0.12, 0.17, 2] # off_peak, mid_peak, on_peak, fuel_cost
        input['travel_conditions'] = travel_condition_list # [2, 3, 3, 'Winter'] # driving_behaviour(normal), road_condition(slushy), people_density(regular), season('spring')
        input['bus'] = bus_settings_list # [90,100,2,2,1,30, 0.525, 85] # soc_upper_limit, starting_soc, BYD K9, Proterra ZX5, Volvo 7900, NOVA, maintenace_cost, operation_cost
        done = print_time_cost(done) # print time
        print('Initializing classes...') # checkpoint
        station_object = Station()
        bus_object = BUS()
        energy_estimator = EnergyEstimator()
        global_assigner = Assigner()
        done = print_time_cost(done) # print time
        print('Initialing input...') # checkpoint
        station_object.set_default_ctype(input['stations']['default'][0])
        station_object.set_slow_rate(input['stations']['default'][1])
        station_object.set_fast_rate(input['stations']['default'][2])
        station_object.set_swap_delay(input['stations']['default'][3])
        # for every type values in terminals
        for station, type in zip(input['stations']['terminals'][0::2], input['stations']['terminals'][1::2]):
            station_object.add_station(station, type)
        energy_estimator.set_aggressiveness(input['travel_conditions'][0])
        energy_estimator.set_road_condition(input['travel_conditions'][1])
        energy_estimator.set_passenger_density(input['travel_conditions'][2])
        energy_estimator.set_season(input['travel_conditions'][3])    
        energy_estimator.set_soc_upper_limit(input['bus'][0])
        energy_estimator.set_electricity_op_cost(input['cost'][0])
        energy_estimator.set_electricity_mp_cost(input['cost'][1])
        energy_estimator.set_electricity_onp_cost(input['cost'][2])
        energy_estimator.set_fuel_cost(input['cost'][3])
        bus_object.set_diesel_maintenance_constant(input['bus'][6])
        bus_object.set_diesel_operation_constant(input['bus'][7])
        bus_object.add_buses(input['bus'][2], input['bus'][3], input['bus'][4], input['bus'][5], input['bus'][1])
        done = print_time_cost(done) # print time
        print('generating macro trips...') # checkpoint
        list_of_stations = station_object.get_station_identifiers()
        generate_macro_trips(list_of_stations)
        done = print_time_cost(done) # print time
        print('generating trip sets...') # checkpoint
        list_of_trip_sets = generate_trip_set()
        done = print_time_cost(done) # print time
        print('generating diesel only trip sets...') # checkpoint
        generate_diesel_trip_sets(bus_object, energy_estimator)
        done = print_time_cost(done) # print time
        print('hungarian action time...') # checkpoint
        list_of_buses = bus_object.get_bus_identifiers()
        get_optimal_assignment(list_of_trip_sets, list_of_buses, bus_object, energy_estimator, station_object, global_assigner)
        done = print_time_cost(done) # print time
        print('exporting data...') # checkpoint
        global_assigner.export_data()
        done = print_time_cost(done)
        # DONE?
        print('Total Run Time:')
        print_time_cost(start)


       
        
       
        
        
        return HttpResponse(post_data["off_peak"])