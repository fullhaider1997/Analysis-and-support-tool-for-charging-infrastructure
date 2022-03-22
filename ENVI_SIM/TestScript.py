import time
import warnings
warnings.filterwarnings('ignore')

start = time.time()
def print_time_cost(start_time):
    print('[time_cost : {}]'.format(time.time() - start_time))
    return time.time()
print('Importing classes...')
from python_scripts.hungarian.optimizer import get_optimal_assignment
from python_scripts.data_generators.MacroMicroGenerators import *
from python_scripts.data_generators.TripSetGenerator import *
from python_scripts.classes.Station import *
from python_scripts.classes.Bus import *
from python_scripts.classes.EnergyEstimator import *
from python_scripts.classes.Assigner import *
done = print_time_cost(start) # print time
print('Initializing input...') # checkpoint
input = {}
input['stations'] = {}
input['stations']['default'] = ['Fast', 20, 240, 15] # default_charger, charge_rate(Slow), charge_rate(Fast), op_time(Swap)
input['stations']['terminals'] = ['Waterfront Terminal','Swap','City Hall Terminal', 'Fast'] # charging_stations, type
input['cost'] = [0.08, 0.12, 0.17, 2] # off_peak, mid_peak, on_peak, fuel_cost
input['travel_conditions'] = [2, 3, 3, 'winter'] # driving_behaviour(normal), road_condition(slushy), people_density(regular), season('spring')
input['bus'] = [90,100,2,2,1,30, 0.525, 85] # soc_upper_limit, starting_soc, BYD K9, Proterra ZX5, Volvo 7900, NOVA, maintenace_cost, operation_cost
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