from python_scripts.common.common import get_time_diff, add_to_time

# run the create_{}_schedule function before getting any value
class Scheduler:
    def __init__(self):
        self.set_data = {}
        self.total_consumption = 0
        self.actual_cost = 0
        self.total_energy_cost = 0
        self.total_co2_emission = 0
        self.total_maintenance_cost = 0
        self.total_operation_cost = 0
        self.procurement_cost = 0
    
    def create_electric_schedule(self, trip_set, bus_object, BUS_IDENTIFIER, energy_estimator, station_object):
        # initialize storage structure
        self.set_data['route_id'] = []
        self.set_data['trip_id'] = []
        self.set_data['trip_headsign'] = []
        self.set_data['origin'] = []
        self.set_data['destination'] = []
        self.set_data['start_time'] = []
        self.set_data['end_time'] = []
        self.set_data['energy_rate'] = []
        self.set_data['energy_consumed'] = []
        self.set_data['co2_emission'] = []
        self.set_data['initial_soc'] = []
        self.set_data['soc_before_charge'] = []
        self.set_data['final_soc'] = []
        self.set_data['charge_time'] = []
        self.set_data['energy_charged'] = []
        self.set_data['energy_cost'] = []
        self.set_data['total_time'] = []
        self.set_data['total_distance'] = []
        self.set_data['trip_type'] = []
        self.set_data['fuel_consumed'] = []
        self.set_data['fuel_cost'] = []
        self.set_data['maintenance_cost'] = [] # per km
        self.set_data['operation_cost'] = [] # per hour
        # initialize energy estimation specific variables
        soc_lower_limit = energy_estimator.get_soc_lower_limit()
        soc_upper_limit = energy_estimator.get_soc_upper_limit()
        default_stations = station_object.get_default_stations() # get a list of default stations
        unassigned = [] # keep track of unassigned bus-trip sets
        total_co2_emission = 0 # kg
        total_energy_cost = 0 # $
        last_trip = False
        for trip_id in trip_set['trip_id']:
            unassigned.append(trip_id)
        while unassigned:
            current_trip = unassigned.pop(0)
            try:
                next_trip = unassigned[0]
            except IndexError:
                last_trip = True
                pass
            row_data = trip_set.loc[trip_set['trip_id'] == current_trip]
            starting_soc = bus_object.get_soc(BUS_IDENTIFIER)
            passenger_capacity = bus_object.get_seatings(BUS_IDENTIFIER)
            battery_capacity = bus_object.get_battery_capacity(BUS_IDENTIFIER)
            headsign_start = row_data['trip_headsign'].iloc[0].split(' to ')[0]
            has_station = row_data['has_station'].iloc[0]
            destination = row_data['destination'].iloc[0]
            initial_energy_data = energy_estimator.calculate_energy_rate(row_data['road_grade'].iloc[0], row_data['total_time'].iloc[0], starting_soc, passenger_capacity,\
                                                                row_data['stop_density'].iloc[0], row_data['avg_speed'].iloc[0], row_data['total_distance'].iloc[0], battery_capacity)
            initial_energy_rate = initial_energy_data[0]
            initial_energy_consumed = initial_energy_data[1]
            initial_final_soc = initial_energy_data[2]
            initial_co2_emission = initial_energy_data[3]
            if initial_final_soc < soc_lower_limit: # soc out of bounds
                if has_station in default_stations: # trip has station
                    headsign_stop = has_station.split(' ')[0]
                    new_headsign = '{} to {}'.format(headsign_start, headsign_stop)
                    start_time = row_data['start_time'].iloc[0]
                    time_at_station = row_data['time_at_station'].iloc[0]
                    end_time = time_at_station
                    dist_to_station = row_data['dist_to_station'].iloc[0]
                    remaining_distance = row_data['total_distance'].iloc[0] - dist_to_station
                    remaining_time = get_time_diff(time_at_station, row_data['end_time'].iloc[0])
                    self.set_data['route_id'].append(row_data['route_id'].iloc[0])
                    self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
                    self.set_data['trip_headsign'].append(new_headsign)
                    self.set_data['origin'].append(row_data['origin'].iloc[0])
                    self.set_data['destination'].append(has_station)
                    self.set_data['start_time'].append(start_time)
                    # estimating the energy requirements for getting to the station
                    to_station_energy_data = energy_estimator.calculate_energy_rate(row_data['road_grade'].iloc[0], get_time_diff(start_time, end_time),\
                                                                        starting_soc, passenger_capacity, row_data['stop_density'].iloc[0],\
                                                                        row_data['avg_speed'].iloc[0], dist_to_station, battery_capacity)
                    this_energy_rate = to_station_energy_data[0]
                    this_energy_consumed = to_station_energy_data[1]
                    this_final_soc = to_station_energy_data[2]
                    this_co2_emission = to_station_energy_data[3]
                    self.total_consumption += this_energy_consumed # update total energy consumed
                    total_co2_emission += this_co2_emission # update co2 emission
                    self.set_data['energy_rate'].append(this_energy_rate)
                    self.set_data['energy_consumed'].append(this_energy_consumed)
                    self.set_data['co2_emission'].append(this_co2_emission)
                    self.set_data['initial_soc'].append(starting_soc)
                    self.set_data['soc_before_charge'].append(this_final_soc)
                    charge_parameters = station_object.get_charge_parameters(has_station)
                    charge_rate = charge_parameters[0]
                    op_delay = charge_parameters[1]
                    charge_time = energy_estimator.get_required_recharge_time(battery_capacity, this_final_soc, charge_rate, op_delay)
                    end_time = add_to_time(end_time, charge_time)
                    bus_object.update_soc(BUS_IDENTIFIER, soc_upper_limit) # update SOC
                    energy_charged = soc_upper_limit - this_final_soc
                    energy_cost = energy_estimator.get_electricity_bill(energy_charged, time_at_station) # bill in $
                    total_energy_cost += energy_cost # update total electricity bill
                    self.set_data['energy_charged'].append(energy_charged)
                    self.set_data['energy_cost'].append(energy_cost)
                    self.set_data['end_time'].append(end_time)
                    self.set_data['charge_time'].append(charge_time)
                    self.set_data['final_soc'].append(soc_upper_limit)
                    self.set_data['total_time'].append(get_time_diff(start_time, end_time))
                    self.set_data['total_distance'].append(dist_to_station)
                    self.set_data['trip_type'].append('charging')
                    # update charging event for ebus
                    bus_object.update_charging_event(BUS_IDENTIFIER)
                    # update start time and end time for next trip
                    if last_trip == False: # soc out of bounds, charged: last trip?
                        next_total_time = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_time'].iloc[0] 
                        next_has_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'has_station'].iloc[0] 
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'start_time'] = end_time 
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'end_time'] = add_to_time(end_time, next_total_time) 
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'origin'] = has_station
                        next_total_distance = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_distance'].iloc[0]
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'total_distance'] = remaining_distance + next_total_distance
                        if next_has_station in default_stations:
                            next_dist_to_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'dist_to_station'].iloc[0]
                            next_time_at_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'].iloc[0]
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'dist_to_station'] = remaining_distance + next_dist_to_station
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'] = add_to_time(next_time_at_station, remaining_time)
                # soc out of bounds, does not have station
                else: 
                    if destination not in default_stations: # add stop as station
                        station_object.add_station(destination)
                    start_time = row_data['start_time'].iloc[0]
                    time_at_station = row_data['end_time'].iloc[0]
                    end_time = time_at_station
                    self.set_data['route_id'].append(row_data['route_id'].iloc[0])
                    self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
                    self.set_data['trip_headsign'].append(row_data['trip_headsign'].iloc[0])
                    self.set_data['origin'].append(row_data['origin'].iloc[0])
                    self.set_data['destination'].append(row_data['destination'].iloc[0])
                    self.set_data['start_time'].append(start_time)
                    self.total_consumption += initial_energy_consumed # update total energy consumed
                    total_co2_emission += initial_co2_emission # update co2 emission
                    self.set_data['energy_rate'].append(initial_energy_rate)
                    self.set_data['energy_consumed'].append(initial_energy_consumed)
                    self.set_data['co2_emission'].append(initial_co2_emission)
                    self.set_data['initial_soc'].append(starting_soc)
                    self.set_data['soc_before_charge'].append(initial_final_soc)
                    charge_parameters = station_object.get_charge_parameters(destination)
                    charge_rate = charge_parameters[0]
                    op_delay = charge_parameters[1]
                    charge_time = energy_estimator.get_required_recharge_time(battery_capacity, initial_final_soc, charge_rate, op_delay)
                    end_time = add_to_time(end_time, charge_time)
                    bus_object.update_soc(BUS_IDENTIFIER, soc_upper_limit) # update SOC
                    energy_charged = soc_upper_limit - initial_final_soc
                    energy_cost = energy_estimator.get_electricity_bill(energy_charged, time_at_station) # bill in $
                    total_energy_cost += energy_cost # update total electricity bill
                    self.set_data['energy_charged'].append(energy_charged)
                    self.set_data['energy_cost'].append(energy_cost)
                    self.set_data['end_time'].append(end_time)
                    self.set_data['charge_time'].append(charge_time)
                    self.set_data['final_soc'].append(soc_upper_limit)
                    self.set_data['total_time'].append(get_time_diff(start_time, end_time))
                    self.set_data['total_distance'].append(row_data['total_distance'].iloc[0])
                    self.set_data['trip_type'].append('charging')
                    # update charging event for ebus
                    bus_object.update_charging_event(BUS_IDENTIFIER)
                    # update start time, end time, and time_at_station (if next trip has station) for next trip
                    # soc out of bounds, charged: last trip?
                    if last_trip == False:
                        next_total_time = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_time'].iloc[0] 
                        next_has_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'has_station'].iloc[0]
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'start_time'] = end_time 
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'end_time'] = add_to_time(end_time, next_total_time)
                        if next_has_station in default_stations:
                            time_at_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'].iloc[0]
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'] = add_to_time(time_at_station, charge_time)
            # if final_soc is still within bounds, check for next trip
            # soc within bounds
            else:
                if last_trip == False: # within bounds but has a trip scheduled after
                    next_row_data = trip_set.loc[trip_set['trip_id'] == next_trip]
                    next_energy_data = energy_estimator.calculate_energy_rate(next_row_data['road_grade'].iloc[0], next_row_data['total_time'].iloc[0], initial_final_soc, passenger_capacity,\
                                                                    next_row_data['stop_density'].iloc[0], next_row_data['avg_speed'].iloc[0], next_row_data['total_distance'].iloc[0], battery_capacity)
                    next_final_soc = next_energy_data[2]
                    if next_final_soc < soc_lower_limit:
                        if has_station in default_stations: # trip meets charging requirements
                            headsign_stop = has_station.split(' ')[0]
                            new_headsign = '{} to {}'.format(headsign_start, headsign_stop)
                            start_time = row_data['start_time'].iloc[0]
                            time_at_station = row_data['time_at_station'].iloc[0]
                            end_time = time_at_station
                            dist_to_station = row_data['dist_to_station'].iloc[0]
                            remaining_distance = row_data['total_distance'].iloc[0] - dist_to_station
                            remaining_time = get_time_diff(time_at_station, row_data['end_time'].iloc[0])
                            self.set_data['route_id'].append(row_data['route_id'].iloc[0])
                            self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
                            self.set_data['trip_headsign'].append(new_headsign)
                            self.set_data['origin'].append(row_data['origin'].iloc[0])
                            self.set_data['destination'].append(has_station)
                            self.set_data['start_time'].append(start_time)
                            to_station_energy_data = energy_estimator.calculate_energy_rate(row_data['road_grade'].iloc[0], get_time_diff(start_time, end_time),\
                                                                                starting_soc, passenger_capacity, row_data['stop_density'].iloc[0],\
                                                                                row_data['avg_speed'].iloc[0], dist_to_station, battery_capacity)
                            this_energy_rate = to_station_energy_data[0]
                            this_energy_consumed = to_station_energy_data[1]
                            this_final_soc = to_station_energy_data[2]
                            this_co2_emission = to_station_energy_data[3]
                            self.total_consumption += this_energy_consumed # update total energy consumed
                            total_co2_emission += this_co2_emission # update co2 emission
                            self.set_data['energy_rate'].append(this_energy_rate)
                            self.set_data['energy_consumed'].append(this_energy_consumed)
                            self.set_data['co2_emission'].append(this_co2_emission)
                            self.set_data['initial_soc'].append(starting_soc)
                            self.set_data['soc_before_charge'].append(this_final_soc)
                            charge_parameters = station_object.get_charge_parameters(has_station)
                            charge_rate = charge_parameters[0]
                            op_delay = charge_parameters[1]
                            charge_time = energy_estimator.get_required_recharge_time(battery_capacity, this_final_soc, charge_rate, op_delay)
                            end_time = add_to_time(end_time, charge_time)
                            bus_object.update_soc(BUS_IDENTIFIER, soc_upper_limit) # update SOC
                            energy_charged = soc_upper_limit - this_final_soc
                            energy_cost = energy_estimator.get_electricity_bill(energy_charged, time_at_station) # bill in $
                            total_energy_cost += energy_cost # update total electricity bill
                            self.set_data['energy_charged'].append(energy_charged)
                            self.set_data['energy_cost'].append(energy_cost)
                            self.set_data['end_time'].append(end_time)
                            self.set_data['charge_time'].append(charge_time)
                            self.set_data['final_soc'].append(soc_upper_limit)
                            self.set_data['total_time'].append(get_time_diff(start_time, end_time))
                            self.set_data['total_distance'].append(dist_to_station)
                            self.set_data['trip_type'].append('charging')
                            # update charging event for ebus
                            bus_object.update_charging_event(BUS_IDENTIFIER)
                            # update start time and end time for next trip
                            next_total_time = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_time'].iloc[0]
                            next_total_time = next_total_time + remaining_time
                            next_has_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'has_station'].iloc[0] 
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'start_time'] = end_time 
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'end_time'] = add_to_time(end_time, next_total_time) 
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'origin'] = has_station
                            total_distance = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_distance'].iloc[0]
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'total_distance'] = remaining_distance + total_distance
                            # update time_at_station and dist_to_station for next trip
                            if next_has_station in default_stations: 
                                dist_to_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'dist_to_station'].iloc[0]
                                time_at_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'].iloc[0]
                                trip_set.loc[trip_set['trip_id'] == next_trip, 'dist_to_station'] = remaining_distance + dist_to_station    
                                trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'] = add_to_time(time_at_station, remaining_time)
                        # has no station
                        else:
                            # add stop as station
                            if destination not in default_stations: 
                                station_object.add_station(destination)
                            start_time = row_data['start_time'].iloc[0]
                            time_at_station = row_data['end_time'].iloc[0]
                            end_time = time_at_station
                            self.set_data['route_id'].append(row_data['route_id'].iloc[0])
                            self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
                            self.set_data['trip_headsign'].append(row_data['trip_headsign'].iloc[0])
                            self.set_data['origin'].append(row_data['origin'].iloc[0])
                            self.set_data['destination'].append(row_data['destination'].iloc[0])
                            self.set_data['start_time'].append(start_time)
                            self.total_consumption += initial_energy_consumed # update total energy consumed
                            total_co2_emission += initial_co2_emission # update co2 emission
                            self.set_data['energy_rate'].append(initial_energy_rate)
                            self.set_data['energy_consumed'].append(initial_energy_consumed)
                            self.set_data['co2_emission'].append(initial_co2_emission)
                            self.set_data['initial_soc'].append(starting_soc)
                            self.set_data['soc_before_charge'].append(initial_final_soc)
                            charge_parameters = station_object.get_charge_parameters(destination)
                            charge_rate = charge_parameters[0]
                            op_delay = charge_parameters[1]
                            charge_time = energy_estimator.get_required_recharge_time(battery_capacity, initial_final_soc, charge_rate, op_delay)
                            end_time = add_to_time(end_time, charge_time)
                            bus_object.update_soc(BUS_IDENTIFIER, soc_upper_limit) # update SOC
                            energy_charged = soc_upper_limit - initial_final_soc
                            energy_cost = energy_estimator.get_electricity_bill(energy_charged, time_at_station) # bill in $
                            total_energy_cost += energy_cost # update total electricity bill
                            self.set_data['energy_charged'].append(energy_charged)
                            self.set_data['energy_cost'].append(energy_cost)
                            self.set_data['end_time'].append(end_time)
                            self.set_data['charge_time'].append(charge_time)
                            self.set_data['final_soc'].append(soc_upper_limit)
                            self.set_data['total_time'].append(get_time_diff(start_time, end_time))
                            self.set_data['total_distance'].append(row_data['total_distance'].iloc[0])
                            self.set_data['trip_type'].append('charging')
                            # update charging event for ebus
                            bus_object.update_charging_event(BUS_IDENTIFIER)
                            # update start time, end time, and time_at_station (if next trip has station) for next trip
                            next_total_time = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_time'].iloc[0] 
                            next_has_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'has_station'].iloc[0]
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'start_time'] = end_time 
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'end_time'] = add_to_time(end_time, next_total_time)
                            if next_has_station in default_stations:
                                time_at_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'].iloc[0]
                                trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'] = add_to_time(time_at_station, charge_time)
                    # soc within bounds even after next trip: normal service trip
                    else:
                        end_time = row_data['end_time'].iloc[0]
                        self.set_data['route_id'].append(row_data['route_id'].iloc[0])
                        self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
                        self.set_data['trip_headsign'].append(row_data['trip_headsign'].iloc[0])
                        self.set_data['origin'].append(row_data['origin'].iloc[0])
                        self.set_data['destination'].append(row_data['destination'].iloc[0])
                        self.set_data['start_time'].append(row_data['start_time'].iloc[0])
                        self.set_data['end_time'].append(end_time)
                        self.total_consumption += initial_energy_consumed # update total energy consumed
                        total_co2_emission += initial_co2_emission # update co2 emission
                        self.set_data['energy_rate'].append(initial_energy_rate)
                        self.set_data['energy_consumed'].append(initial_energy_consumed)
                        self.set_data['co2_emission'].append(initial_co2_emission)
                        self.set_data['initial_soc'].append(starting_soc)
                        self.set_data['soc_before_charge'].append('-')
                        self.set_data['final_soc'].append(initial_final_soc)
                        bus_object.update_soc(BUS_IDENTIFIER, initial_final_soc) # update SOC
                        self.set_data['charge_time'].append('-')
                        self.set_data['energy_charged'].append('-')
                        self.set_data['energy_cost'].append('-')
                        self.set_data['total_time'].append(row_data['total_time'].iloc[0])
                        self.set_data['total_distance'].append(row_data['total_distance'].iloc[0])
                        self.set_data['trip_type'].append('service')
                        # update start time, end time, and time_at_station (if next trip has station) for next trip
                        next_total_time = trip_set.loc[trip_set['trip_id'] == next_trip, 'total_time'].iloc[0] 
                        next_has_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'has_station'].iloc[0]
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'start_time'] = end_time 
                        trip_set.loc[trip_set['trip_id'] == next_trip, 'end_time'] = add_to_time(end_time, next_total_time)
                        if next_has_station in default_stations:
                            time_at_station = trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'].iloc[0]
                            trip_set.loc[trip_set['trip_id'] == next_trip, 'time_at_station'] = add_to_time(time_at_station, next_total_time)
                # within bounds and the last trip : normal service trip  
                else:
                    end_time = row_data['end_time'].iloc[0]
                    self.set_data['route_id'].append(row_data['route_id'].iloc[0])
                    self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
                    self.set_data['trip_headsign'].append(row_data['trip_headsign'].iloc[0])
                    self.set_data['origin'].append(row_data['origin'].iloc[0])
                    self.set_data['destination'].append(row_data['destination'].iloc[0])
                    self.set_data['start_time'].append(row_data['start_time'].iloc[0])
                    self.set_data['end_time'].append(end_time)
                    self.total_consumption += initial_energy_consumed # update total energy consumed
                    total_co2_emission += initial_co2_emission # update co2 emission
                    self.set_data['energy_rate'].append(initial_energy_rate)
                    self.set_data['energy_consumed'].append(initial_energy_consumed)
                    self.set_data['co2_emission'].append(initial_co2_emission)
                    self.set_data['initial_soc'].append(starting_soc)
                    self.set_data['soc_before_charge'].append('-')
                    self.set_data['final_soc'].append(initial_final_soc)
                    bus_object.update_soc(BUS_IDENTIFIER, initial_final_soc) # update SOC
                    self.set_data['charge_time'].append('-')
                    self.set_data['energy_charged'].append('-')
                    self.set_data['energy_cost'].append('-')
                    self.set_data['total_time'].append(row_data['total_time'].iloc[0])
                    self.set_data['total_distance'].append(row_data['total_distance'].iloc[0])
                    self.set_data['trip_type'].append('service')
            self.set_data['fuel_consumed'].append(0)
            self.set_data['fuel_cost'].append(0)
            self.set_data['maintenance_cost'].append(0)
            self.set_data['operation_cost'].append(0)
        # calculate actual cost
        self.procurement_cost = bus_object.get_procurement_cost(BUS_IDENTIFIER)
        self.total_cost = total_energy_cost
        self.total_emission = total_co2_emission
        self.actual_cost = total_energy_cost + total_co2_emission

    def create_diesel_schedule(self, trip_set, bus_object, energy_estimator):
        # initialize storage structure
        self.set_data['route_id'] = []
        self.set_data['trip_id'] = []
        self.set_data['trip_headsign'] = []
        self.set_data['origin'] = []
        self.set_data['destination'] = []
        self.set_data['start_time'] = []
        self.set_data['end_time'] = []
        self.set_data['fuel_consumed'] = []
        self.set_data['co2_emission'] = []
        self.set_data['fuel_cost'] = []
        self.set_data['total_time'] = []
        self.set_data['total_distance'] = []
        self.set_data['maintenance_cost'] = [] # per km
        self.set_data['operation_cost'] = [] # per hour
        self.set_data['trip_type'] = []
        self.set_data['energy_rate'] = []
        self.set_data['energy_consumed'] = []
        self.set_data['initial_soc'] = []
        self.set_data['soc_before_charge'] = []
        self.set_data['final_soc'] = []
        self.set_data['charge_time'] = []
        self.set_data['energy_charged'] = []
        self.set_data['energy_cost'] = []
        unassigned = [] # keep track of unassessed trips
        total_fuel_cost = 0
        total_co2_emission = 0
        total_maintenace_cost = 0
        total_operation_cost = 0
        for trip_id in trip_set['trip_id']:
            unassigned.append(trip_id)
        while unassigned:
            current_trip = unassigned.pop(0)
            row_data = trip_set.loc[trip_set['trip_id'] == current_trip]
            total_time = row_data['total_time'].iloc[0] # min
            self.set_data['route_id'].append(row_data['route_id'].iloc[0])
            self.set_data['trip_id'].append(row_data['trip_id'].iloc[0])
            self.set_data['trip_headsign'].append(row_data['trip_headsign'].iloc[0])
            self.set_data['origin'].append(row_data['origin'].iloc[0])
            self.set_data['destination'].append(row_data['destination'].iloc[0])
            self.set_data['start_time'].append(row_data['start_time'].iloc[0])
            self.set_data['end_time'].append(row_data['end_time'].iloc[0])
            self.set_data['energy_rate'].append(0)
            fuel_consumed = energy_estimator.get_fuel_consumed(total_time) # litre
            self.total_consumption += fuel_consumed # update total_fuel_consumed
            self.set_data['fuel_consumed'].append(fuel_consumed)
            self.set_data['energy_consumed'].append(0)
            co2_emission = energy_estimator.get_diesel_emission(fuel_consumed) # kg
            total_co2_emission += co2_emission # update total_co2_emission
            self.set_data['co2_emission'].append(co2_emission)
            fuel_cost = energy_estimator.get_fuel_bill(fuel_consumed)
            total_fuel_cost += fuel_cost # update total fuel cost
            self.set_data['fuel_cost'].append(fuel_cost)
            self.set_data['initial_soc'].append(0)
            self.set_data['soc_before_charge'].append(0)
            self.set_data['final_soc'].append(0)
            self.set_data['charge_time'].append(0)
            self.set_data['energy_charged'].append(0)
            self.set_data['energy_cost'].append(0)
            self.set_data['total_time'].append(total_time)
            total_distance = row_data['total_distance'].iloc[0]
            self.set_data['total_distance'].append(total_distance)
            maintenace_cost = bus_object.get_diesel_maintenance_cost(total_distance)
            operation_cost = bus_object.get_diesel_operation_cost(total_time)
            total_maintenace_cost += maintenace_cost
            total_operation_cost += operation_cost
            self.set_data['maintenance_cost'].append(maintenace_cost) # per km
            self.set_data['operation_cost'].append(operation_cost) # per hour
            self.set_data['trip_type'].append('service')
        self.total_emission = total_co2_emission
        self.total_cost = total_fuel_cost
        self.total_operation_cost = total_operation_cost
        self.total_maintenance_cost = total_maintenace_cost
        self.actual_cost = total_fuel_cost + total_co2_emission

    def get_schedule_series(self):
        return self.set_data, self.total_consumption, self.actual_cost, self.total_cost, \
            self.total_emission, self.total_operation_cost, self.total_maintenance_cost, self.procurement_cost

    def get_schedule(self):
        return self.set_data
    
    def get_total_consumption(self):
        return self.total_consumption

    def get_actual_cost(self):
        return self.actual_cost