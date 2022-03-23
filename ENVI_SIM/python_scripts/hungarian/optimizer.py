import numpy as np
from scipy.optimize import linear_sum_assignment # hungarian algorithm
from python_scripts.classes.Scheduler import Scheduler
from python_scripts.common.common import get_trip_set_df

# return cost matrix for bus_list against trip_list
def get_cost_matrix(trip_sets_list, buses, bus_object, energy_estimator, station_object):
    print('generating cost matrix...')
    trip_len = len(trip_sets_list)
    bus_len = len(buses)
    if trip_len != bus_len:
        print('{} > {}'.format(max([trip_len, bus_len]), min([trip_len, bus_len])))
        return
    cost_mat = []
    for bus in buses:
        e_bus = bus_object.is_ebus(bus)
        edge_weights = []
        for trip_set in trip_sets_list:
            scheduler = Scheduler() # initialize new Scheduler object
            bus_object.reset_soc(bus)
            trip_set_df =  get_trip_set_df(trip_set) # get trip set dataframe
            if e_bus == True:
                scheduler.create_electric_schedule(trip_set_df, bus_object, bus, energy_estimator, station_object)
                edge_weights.append(scheduler.get_actual_cost())
            else:
                scheduler.create_diesel_schedule(trip_set_df, bus_object, energy_estimator)
                edge_weights.append(scheduler.get_actual_cost())
        cost_mat.append(edge_weights)
    return np.array(cost_mat)

# pass an assigner object to store the bus_trip_assignments, final bus trip assignment is stored in assigner object
def get_optimal_assignment(trip_sets_list, buses_list, bus_object, energy_estimator, station_object, assigner):
    print('generating optimal assignment...')
    cost_matrix = get_cost_matrix(trip_sets_list, buses_list,bus_object, energy_estimator, station_object)
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    for bus, trip_set in zip(row_ind, col_ind):
        current_bus = buses_list[bus]
        bus_object.reset_soc(current_bus)
        current_trip_set = trip_sets_list[trip_set]
        e_bus = bus_object.is_ebus(current_bus)
        trip_set_df =  get_trip_set_df(current_trip_set) # get trip set dataframe
        scheduler = Scheduler() # initialize new Scheduler object
        if e_bus:
            scheduler.create_electric_schedule(trip_set_df, bus_object, current_bus, energy_estimator, station_object)
            schedule_series = scheduler.get_schedule_series()
            assigner.add_bus_trip_set(current_bus, current_trip_set, schedule_series)
        else:
            scheduler.create_diesel_schedule(trip_set_df, bus_object, energy_estimator)
            schedule_series = scheduler.get_schedule_series()
            assigner.add_bus_trip_set(current_bus, current_trip_set, schedule_series)
    total_actual_cost = assigner.get_total_actual_cost()
    min_cost = cost_matrix[row_ind, col_ind].sum()
    print('{}, supposed to be {}'.format(total_actual_cost, min_cost))