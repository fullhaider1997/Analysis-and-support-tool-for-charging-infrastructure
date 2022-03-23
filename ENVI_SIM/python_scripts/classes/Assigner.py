import pandas as pd
import os
from python_scripts.common.common import *

cwd = os.getcwd()
micro_trips_path = cwd + '\\data\\micro_trips\\'
output_path = cwd + '\\data\\output\\'
mixed_fleet_assignments_path = output_path + 'mixed_fleet_assignments\\'
schedule_path = mixed_fleet_assignments_path + 'schedules\\'
emission_profiles_path = mixed_fleet_assignments_path + 'emission_profiles\\'
energy_consumption_profiles_path = mixed_fleet_assignments_path + 'energy_consumption_profiles\\'
soc_profiles_path = mixed_fleet_assignments_path + 'soc_profiles\\'
speed_profiles_path = mixed_fleet_assignments_path + 'speed_profiles\\'

# create a dictionary of bus and trip sets with their repective scheduling scheme
class Assigner:
    def __init__(self):
        self.bus_trip = {}
    
    def export_data(self, directory = None):
        if directory == None:
            delete_all_files([schedule_path, speed_profiles_path, soc_profiles_path, energy_consumption_profiles_path, emission_profiles_path])
        else:
            delete_all_files([directory + 'schedules\\', directory + 'speed_profiles\\', directory + 'emission_profiles\\'])
        total_data = {}
        total_data['total_maintenance_cost'] = self.get_total_maintenance_cost()
        total_data['total_operation_cost'] = self.get_total_operation_cost()
        total_data['total_cost'] = self.get_total_cost()
        total_data['total_emision'] = self.get_total_emission()
        total_data['total_fuel_consumed'] = self.get_total_fuel_consumption()
        total_data['total_energy_consumed'] = self.get_total_energy_consumed()
        total_data['total_procurement_cost'] = self.get_total_procurement_cost()
        total_data = pd.DataFrame.from_dict(total_data, orient = 'index').transpose()
        micro_trips = get_dataframe('trip_data', micro_trips_path)
        for bus_trip in list(self.bus_trip.keys()):
            schedule = pd.DataFrame.from_dict(self.bus_trip[bus_trip]['schedule'], orient = 'index').transpose()
            speed_profile = get_speed_profile_data(schedule, micro_trips)
            soc_profile = get_soc_plot_data(schedule)
            energy_consumption = get_energy_consumption_plot_data(schedule)
            emission_profile = get_emission_plot_data(schedule)
            if directory == None:
                save_df_to_directory(schedule, bus_trip, schedule_path)
                save_df_to_directory(speed_profile, bus_trip,speed_profiles_path)
                save_df_to_directory(soc_profile, bus_trip, soc_profiles_path)
                save_df_to_directory(energy_consumption, bus_trip, energy_consumption_profiles_path)
                save_df_to_directory(emission_profile, bus_trip, emission_profiles_path)
                save_df_to_directory(total_data, 'cost_related_data', mixed_fleet_assignments_path)
            else:
                save_df_to_directory(schedule, bus_trip, directory + 'schedules\\')
                save_df_to_directory(speed_profile, bus_trip, directory + 'speed_profiles\\')
                save_df_to_directory(emission_profile, bus_trip, directory + 'emission_profiles\\')
                save_df_to_directory(total_data, 'cost_related_data', directory)

    def add_bus_trip_set(self, BUS_IDENTIFIER, TRIP_SET_IDENTIFIER, schedule_series):
        bus_type = BUS_IDENTIFIER.split('_')[0]
        SET_IDENTIFIER = '{}_{}'.format(BUS_IDENTIFIER, TRIP_SET_IDENTIFIER)
        self.bus_trip[SET_IDENTIFIER] = {}
        self.bus_trip[SET_IDENTIFIER]['bus_id'] = BUS_IDENTIFIER
        self.bus_trip[SET_IDENTIFIER]['trip_set_id'] = TRIP_SET_IDENTIFIER
        self.bus_trip[SET_IDENTIFIER]['schedule'] = schedule_series[0] # dictionary
        self.bus_trip[SET_IDENTIFIER]['total_emission'] = schedule_series[4]
        self.bus_trip[SET_IDENTIFIER]['total_cost'] = schedule_series[3]
        self.bus_trip[SET_IDENTIFIER]['actual_cost'] = schedule_series[2]
        self.bus_trip[SET_IDENTIFIER]['total_operation_cost'] = schedule_series[5]
        self.bus_trip[SET_IDENTIFIER]['total_maintenance_cost'] = schedule_series[6]
        self.bus_trip[SET_IDENTIFIER]['procurement_cost'] = schedule_series[7]
        if bus_type == 'NOVA':
            self.bus_trip[SET_IDENTIFIER]['total_energy_consumed'] = 0
            self.bus_trip[SET_IDENTIFIER]['total_fuel_consumed'] = schedule_series[1]
        else:
            self.bus_trip[SET_IDENTIFIER]['total_energy_consumed'] = schedule_series[1]
            self.bus_trip[SET_IDENTIFIER]['total_fuel_consumed'] = 0

    def get_total_actual_cost(self):
        total_actual_cost = 0
        for bt_set in list(self.bus_trip.keys()):
            total_actual_cost += self.bus_trip[bt_set]['actual_cost']
        return total_actual_cost
    
    def get_total_fuel_consumption(self):
        total_fuel_consumed = 0
        for bt_set in list(self.bus_trip.keys()):
            total_fuel_consumed += self.bus_trip[bt_set]['total_fuel_consumed']
        return total_fuel_consumed
    
    def get_total_energy_consumed(self):
        total_energy_consumed = 0
        for bt_set in list(self.bus_trip.keys()):
          total_energy_consumed += self.bus_trip[bt_set]['total_energy_consumed']
        return total_energy_consumed

    def get_total_emission(self):
        total_emission = 0
        for bt_set in list(self.bus_trip.keys()):
            total_emission += self.bus_trip[bt_set]['total_emission']
        return total_emission

    def get_total_cost(self):
        total_cost = 0
        for bt_set in list(self.bus_trip.keys()):
            total_cost += self.bus_trip[bt_set]['total_cost']
        return total_cost

    def get_total_operation_cost(self):
        total_cost = 0
        for bt_set in list(self.bus_trip.keys()):
            total_cost += self.bus_trip[bt_set]['total_operation_cost']
        return total_cost

    def get_total_maintenance_cost(self):
        total_cost = 0
        for bt_set in list(self.bus_trip.keys()):
            total_cost += self.bus_trip[bt_set]['total_maintenance_cost']
        return total_cost

    def get_total_procurement_cost(self):
        total_cost = 0
        for bt_set in list(self.bus_trip.keys()):
            total_cost += self.bus_trip[bt_set]['procurement_cost']
        return total_cost

    # eventually use this to get bus specific data
    def get_buses_on_route(self, route_id):
        bus_trip = []
        for key in list(self.bus_trip.keys()):
            route = key.split('_')[3] # get route id
            if route == route_id:
                bus_trip.append(key)
        return bus_trip 

    def get_bus_trip_assignments(self):
        return self.bus_trip