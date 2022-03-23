import os
import pandas as pd
from python_scripts.classes.TripSet import trip_set
from python_scripts.classes.Assigner import Assigner
from python_scripts.classes.Scheduler import Scheduler
from python_scripts.common.common import tomins, get_time_diff

FMT = r'%H:%M:%S' # time formmat for the gtfs time string
date_format = r'%Y%m%d' # date format for calendar dates
cwd = os.getcwd()
data_path = cwd + '\\data\\'
output_path = data_path + 'output\\'
input_path = data_path + 'input\\'
trip_set_path = data_path + 'trip_sets\\'
diesel_only_path = output_path + 'diesel_only_assignments\\'
macro_trips_path = data_path + 'macro_trips\\'


# trip set generator
# using queuing algorithm to generate trip sets
def generate_trip_set():
    # directory is path is path to routes data included in the study
    directory = macro_trips_path + 'Jan\\20220124_route_data\\' # data used for all simulation
    tripsets = trip_set()
    for filename in os.listdir(directory):
        current_file = os.path.join(directory, filename)
        route = filename.split('.')[0] # getting the route_id
        temp_df = pd.read_csv(current_file) # reading the current route data file into a df
        unassigned = []
        assigned = []
        index = 0
        for trip_id in temp_df['trip_id']:
            unassigned.append(trip_id)
        while unassigned:
            current_trip = unassigned.pop(0)
            tripsets.create_trip_set(route, index)
            ctd = temp_df.loc[temp_df['trip_id'] == current_trip] # current trip data
            tripsets.populate_trip_set(route, index, ctd, 0)
            curr_dest = ctd['destination'].iloc[0]
            curr_end = ctd['end_time'].iloc[0]
            for trip in unassigned:
                curr_trip = temp_df.loc[temp_df['trip_id'] == trip]
                next_origin = curr_trip['origin'].iloc[0]
                next_start = curr_trip['start_time'].iloc[0]
                # if current trip meets given criteria, add to trip set and make it the leading trip
                if next_origin == curr_dest and tomins(next_start) >= tomins(curr_end):
                    tripsets.populate_trip_set(route, index, curr_trip, get_time_diff(curr_end, next_start))
                    assigned.append(curr_trip['trip_id'].iloc[0]) # add to assigned list
                    curr_dest = curr_trip['destination'].iloc[0]
                    curr_end = curr_trip['end_time'].iloc[0]
            index += 1
            unassigned = list(filter(lambda trip: trip not in assigned, unassigned))
    tripsets.export_trip_sets() # modify export function to read to working directory
    return tripsets.get_trip_set_identifiers()


# return schedules for diesel buses on given trip_sets
def generate_diesel_trip_sets(bus_object, energy_estimator):
    # directory is path to normal trip_sets.csv files
    assigner = Assigner()
    for filename in os.listdir(trip_set_path):
        current_file = os.path.join(trip_set_path, filename)
        bus_trip_identifier = filename.split('.')[0]
        trip_set = pd.read_csv(current_file) # reading the current route data file into a df
        scheduler = Scheduler()
        scheduler.create_diesel_schedule(trip_set, bus_object, energy_estimator)
        assigner.add_bus_trip_set('NOVA', bus_trip_identifier, scheduler.get_schedule_series())
    assigner.export_data(diesel_only_path)