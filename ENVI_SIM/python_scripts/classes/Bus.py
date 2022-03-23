import os
import pandas as pd
from python_scripts.common.common import save_df_to_directory

cwd = os.getcwd()
output_path = cwd + '\\data\\output\\'
mixed_fleet_assignments_path = output_path + 'mixed_fleet_assignments\\'


class BUS:
    def __init__(self):
        self.buses = {}
        self.all_buses = {}
        self.all_buses['Name'] = []
        self.all_buses['Seatings'] = []
        self.all_buses['Battery_capacity'] = []
        self.all_buses['Type'] = []
        self.all_buses['Procurement_cost'] = []
        self.diesel_maintenance_constant = 0.37 # $/km
        self.diesel_operation_constant = 82 # $/km
        self.no_ebus = 0
        self.no_dbus = 0
        self.starting_soc = 100

    def export_buses(self):
        buses = pd.DataFrame.from_dict(self.all_buses, orient='index').transpose()
        save_df_to_directory(buses, 'buses', mixed_fleet_assignments_path)

    def get_procurement_cost(self, BUS_IDENTIFIER):
        return self.buses[BUS_IDENTIFIER]['Procurement_cost']

    def set_diesel_operation_constant(self, operation_cost):
        self.diesel_operation_constant = operation_cost

    def set_diesel_maintenance_constant(self, maintenance_cost):
        self.diesel_maintenance_constant = maintenance_cost
    
    def get_diesel_maintenance_cost(self, distance):
        return self.diesel_maintenance_constant * distance
    
    def get_diesel_operation_cost(self, total_time):
        return self.diesel_operation_constant * (total_time/60)

    def add_ev_bus(self, name, passenger_loading, batt_capacity, starting_soc, procurement_cost):
        BUS_IDENTIFIER = '{}_{}'.format(name, self.no_ebus) 
        self.buses[BUS_IDENTIFIER] = {}
        self.buses[BUS_IDENTIFIER]['Name'] = '{}'.format(name) # to make sure all names are in string format
        self.buses[BUS_IDENTIFIER]['Seatings'] = passenger_loading
        self.buses[BUS_IDENTIFIER]['Battery_capacity'] = batt_capacity
        self.buses[BUS_IDENTIFIER]['SOC'] = starting_soc
        self.buses[BUS_IDENTIFIER]['Charging_event'] = 0
        self.buses[BUS_IDENTIFIER]['Type'] = 'electric'
        self.buses[BUS_IDENTIFIER]['Procurement_cost'] = procurement_cost
        self.all_buses['Name'].append(name)
        self.all_buses['Seatings'].append(passenger_loading)
        self.all_buses['Battery_capacity'].append(batt_capacity)
        self.all_buses['Type'].append('electric')
        self.all_buses['Procurement_cost'].append(procurement_cost)
        self.no_ebus += 1

    def add_diesel_bus(self, name, passenger_loading, procurement_cost):
        BUS_IDENTIFIER = 'NOVA_{}'.format(self.no_dbus) 
        self.buses[BUS_IDENTIFIER] = {}
        self.buses[BUS_IDENTIFIER]['Name'] = '{}'.format(name) # to make sure all names are in string format
        self.buses[BUS_IDENTIFIER]['Seatings'] = passenger_loading
        self.buses[BUS_IDENTIFIER]['Battery_capacity'] = '-'
        self.buses[BUS_IDENTIFIER]['SOC'] = '-'
        self.buses[BUS_IDENTIFIER]['Charging_event'] = '-'
        self.buses[BUS_IDENTIFIER]['Type'] = 'diesel'
        self.buses[BUS_IDENTIFIER]['Procurement_cost'] = procurement_cost
        self.all_buses['Name'].append(name)
        self.all_buses['Seatings'].append(passenger_loading)
        self.all_buses['Battery_capacity'].append(0)
        self.all_buses['Type'].append('diesel')
        self.all_buses['Procurement_cost'].append(procurement_cost)
        self.no_dbus += 1

    def add_buses(self, no_ebus_x, no_ebus_y, no_ebus_z, no_diesel_bus, starting_soc):
        self.starting_soc = starting_soc
        dict = {}
        dict['BYD K9'], dict['Proterra ZX5'], dict['Volvo 7900'], dict['NOVA'] = \
            no_ebus_x, no_ebus_y, no_ebus_z, no_diesel_bus
        for key, value in dict.items():
            if key == 'BYD K9':
                for i in range(value):
                    self.add_ev_bus(key, 80, 310, starting_soc, 750000)
            elif key == 'Proterra ZX5':
                for i in range(value):
                    self.add_ev_bus(key, 29, 220, starting_soc, 775000)
            elif key == 'Volvo 7900':
                for i in range(value):
                    self.add_ev_bus(key, 95, 396, starting_soc, 1270000)
            else:
                for i in range(no_diesel_bus):
                    self.add_diesel_bus(key, 41, 0) # not considering the procurement of diesel buses

    def is_ebus(self, BUS_IDENTIFIER):
        if self.buses[BUS_IDENTIFIER]['Type'] == 'diesel':
            return False
        else:
            return True

    def reset_soc(self, BUS_IDENTIFIER):
        self.buses[BUS_IDENTIFIER]['SOC'] = self.starting_soc

    def get_bus_identifiers(self):
        bus_list = list(self.buses.keys())
        return bus_list

    def update_soc(self, BUS_IDENTIFIER, new_soc):
        self.buses[BUS_IDENTIFIER]['SOC'] = new_soc

    def get_soc(self, BUS_IDENTIFIER):
        return self.buses[BUS_IDENTIFIER]['SOC']
    
    def get_seatings(self, BUS_IDENTIFIER):
        return self.buses[BUS_IDENTIFIER]['Seatings']

    def get_battery_capacity(self, BUS_IDENTIFIER):
        return self.buses[BUS_IDENTIFIER]['Battery_capacity']
    
    def update_charging_event(self, BUS_IDENTIFIER):
        self.buses[BUS_IDENTIFIER]['Charging_event'] += 1

    def get_buses(self):
        return self.buses