import datetime
import time as t
import os
import pandas as pd
import numpy as np
from python_scripts.common.common import get_gtfs
from python_scripts.common.common import get_dataframe
from python_scripts.common.common import weird_division
from python_scripts.common.common import save_df_to_directory

FMT = r'%H:%M:%S' # time formmat for the gtfs time string
date_format = r'%Y%m%d' # date format for calendar dates
cwd = os.getcwd()
data_path = cwd + '\\data\\'
output_path = data_path + 'output\\'
input_path = data_path + 'input\\'
trip_set_path = data_path + 'trip_sets\\'
road_grade_path = input_path + 'elevation_profiles\\'
micro_trips_path = data_path + 'micro_trips\\'
macro_trips_path = data_path + 'macro_trips\\'

trip_df = get_gtfs('trips')
stops_df = get_gtfs('stops')
stoptimes_df = get_gtfs('stop_times')
shapes_df = get_gtfs('shapes')
calendar_df = get_gtfs('calendar_dates')
rg_data = get_dataframe('road_grades', road_grade_path)
trips = list(stoptimes_df.trip_id.unique())

# generate trip_data and route_data
# insert list of stations
def generate_micro_trips():
    time_buffer = 30/3600.0 # adding a buffer ish value so that speed cannot be zero, given distance changed 
    global_speed, global_acceleration  = [], [] 
    avg_speed, avg_acceleration, number_of_stops = {}, {}, []
    for trip in trips:
        dist_diff, times, time_diff, speed, speed_diff, acceleration = [], [], [], [], [], []
        temp_df = stoptimes_df.loc[stoptimes_df['trip_id'] == trip]
        temp_df['shape_dist_traveled'] = temp_df['shape_dist_traveled']*0.001 # convert to km
        dist_diff = list(temp_df['shape_dist_traveled'].diff()) # km
        nos = len(temp_df['stop_sequence'].tolist()) # number of stops for a trip
        for time in temp_df['arrival_time']:
            x = t.strptime(time, FMT)
            times.append((datetime.timedelta(hours=x.tm_hour,minutes=x.tm_min,seconds=x.tm_sec).total_seconds())/3600.0) # convert to hours
            number_of_stops.append(nos) # using the loop to append number of stops to df for calculating stop density later on
        time_diff = list(np.diff(times)) # hr
        time_diff.insert(0,0)
        time_diff[1:] = [time + time_buffer for time in time_diff[1:]]
        if len(dist_diff) == len(time_diff):
            for dist, time in zip(dist_diff, time_diff):
                speed.append(weird_division(dist,time)) #km/h
                global_speed.append(weird_division(dist,time)) # expected length = length of stoptimes_df
            speed_diff = list(np.diff(speed))
            speed_diff.insert(0,0)
            for spd, time in zip(speed_diff, time_diff):
                acceleration.append(weird_division(spd, time)) #km/hr^2
                global_acceleration.append(weird_division(spd, time)) # expected length = length of stoptimes_df
        avg_speed[trip] = (sum(speed)/len(speed))
        avg_acceleration[trip] = (sum(acceleration)/len(acceleration))
    stoptimes_df['speed'] = pd.Series(global_speed).values
    stoptimes_df['acceleration'] = pd.Series(global_acceleration).values
    stoptimes_df['number_of_stops'] = pd.Series(number_of_stops).values
    stops, service_id, shape_id, route_id = [], [], [], []
    for id in stoptimes_df['stop_id']:
        stops.append(stops_df.loc[stops_df['stop_id'] == id, 'stop_name'].iloc[0])
    stoptimes_df['stop_headsign'] = pd.Series(stops).values
    for trip in stoptimes_df['trip_id']:
        service_id.append(trip_df.loc[trip_df['trip_id'] == trip, 'service_id'].iloc[0])
        shape_id.append(trip_df.loc[trip_df['trip_id'] == trip, 'shape_id'].iloc[0])
        route_id.append(trip_df.loc[trip_df['trip_id'] == trip, 'route_id'].iloc[0])
    stoptimes_df['service_id'] = pd.Series(service_id).values
    stoptimes_df['shape_id'] = pd.Series(shape_id).values
    stoptimes_df['route_id'] = pd.Series(route_id).values
    save_df_to_directory(stoptimes_df, 'trip_data', micro_trips_path)
    avg_speed = pd.DataFrame.from_dict(avg_speed, orient='index').transpose()
    avg_acceleration = pd.DataFrame.from_dict(avg_acceleration, orient='index').transpose()
    save_df_to_directory(avg_speed, 'avg_speed', micro_trips_path)
    save_df_to_directory(avg_acceleration, 'avg_acceleration', micro_trips_path)
    
def generate_macro_trips(station_list):
    micro_trips_df = get_dataframe('trip_data', micro_trips_path)
    avg_speed = get_dataframe('avg_speed', micro_trips_path)
    avg_acceleration = get_dataframe('avg_acceleration', micro_trips_path)
    station_in_path, dist_from_station, time_at_station = {}, {}, {}
    for trip in trips:
        temp_df = micro_trips_df.loc[micro_trips_df['trip_id'] == trip]
        has_station = '-'
        d_ts = 0
        time_stamp = '-'
        for stop in temp_df['stop_headsign'][1:]:
            if stop in station_list:
                has_station = stop
                d_ts = temp_df.loc[temp_df['stop_headsign'] == stop, 'shape_dist_traveled'].iloc[0]
                time_stamp = temp_df.loc[temp_df['stop_headsign'] == stop, 'arrival_time'].iloc[0]
                break
            else:
                has_station = '-'
                d_ts = 0
                time_stamp = '-'
        station_in_path[trip] = has_station # track if this trip has a station in it's path
        dist_from_station[trip] = d_ts # track the distance to station
        time_at_station[trip] = time_stamp # track time arrived at station
    trip_data = micro_trips_df.groupby(['trip_id'])
    trip_data = trip_data.first().append(trip_data.last()).sort_index().reset_index().drop_duplicates()
    trip_data = trip_data.sort_values(['trip_id', 'arrival_time'], ascending=True)
    trip_data = trip_data.drop(['pickup_type', 'drop_off_type', 'timepoint'], axis=1) # drop 'redundant'? columns
    # parse trip_data to retrieve route specific data for each trip
    route_data = {}
    route_data['trip_id'] = trip_data['trip_id'][::2].tolist()
    route_data['service_id'] = trip_data['service_id'][::2].tolist()
    route_id, trip_headsign = [],[]
    for trip in route_data['trip_id']:
        route_id.append(trip_df.loc[trip_df['trip_id'] == trip, 'route_id'].iloc[0])
        trip_headsign.append(trip_df.loc[trip_df['trip_id'] == trip, 'trip_headsign'].iloc[0])
    route_data['trip_headsign'] = trip_headsign
    route_data['route_id'] = route_id
    route_data['shape_id'] = trip_data['shape_id'][::2].tolist()
    route_data['origin'] = trip_data['stop_headsign'][::2].tolist()
    route_data['destination'] = trip_data['stop_headsign'][1::2].tolist()
    route_data['start_time'] = trip_data['arrival_time'][::2].tolist()
    route_data['end_time'] = trip_data['departure_time'][1::2].tolist()
    start_time, end_time, road_grade = [], [], []
    for shape_id in route_data['shape_id']:
        road_grade.append(rg_data.loc[rg_data['shape_id'] == shape_id, 'road_grade(%)'].iloc[0])
    route_data['road_grade'] = road_grade
    for time in route_data['start_time']:
        x = t.strptime(time, FMT)
        minutes = (datetime.timedelta(hours=x.tm_hour,minutes=x.tm_min,seconds=x.tm_sec).total_seconds())/60
        start_time.append(minutes)
    for time in route_data['end_time']:
        x = t.strptime(time, FMT)
        minutes = (datetime.timedelta(hours=x.tm_hour,minutes=x.tm_min,seconds=x.tm_sec).total_seconds())/60
        end_time.append(minutes)
    total_time = [None] * len(start_time)
    for i in range(len(start_time)):
        total_time[i] = (end_time[i] - start_time[i])
    route_data['total_time'] = total_time
    route_data['total_distance'] = trip_data['shape_dist_traveled'][1::2].tolist()
    avg_speed_list, avg_acceleration_list, stop_density, has_station, distance_fs, time_as = [], [], [], [], [], []
    for trip in route_data['trip_id']:
        avg_speed_list.append(avg_speed[trip].iloc[0])
        avg_acceleration_list.append(avg_acceleration[trip].iloc[0])
        has_station.append(station_in_path[trip])
        distance_fs.append(dist_from_station[trip])
        time_as.append(time_at_station[trip])
        stop_density.append((trip_data.loc[trip_data['trip_id'] == trip, 'number_of_stops'].iloc[1])\
                            /(trip_data.loc[trip_data['trip_id'] == trip, 'shape_dist_traveled'].iloc[1] * 0.001 )) # stop density = stops / km
    route_data['avg_speed'] = avg_speed_list
    route_data['avg_acceleration'] = avg_acceleration_list
    route_data['stop_density'] = stop_density
    route_data['has_station'] = has_station
    route_data['dist_to_station'] = distance_fs
    route_data['time_at_station'] = time_as
    route_data = pd.DataFrame.from_dict(route_data, orient='index').transpose()
    route_data['total_distance'] = route_data['total_distance']/1000 # converting to km
    route_data['dist_to_station'] = route_data['dist_to_station']/1000 # converting to km
    route_data = route_data.sort_values(['start_time', 'end_time'], ascending=True).reset_index(drop=True)
    save_df_to_directory(route_data, 'route_data', macro_trips_path)
    # join dates to service ids
    routes = list(trip_df.route_id.unique()) # all routes
    calendar_df['month'] = pd.to_datetime(calendar_df['date'], format = date_format).dt.month_name().str.slice(stop = 3)
    months, dates = [], []
    months = list(calendar_df.month.unique())
    for month in months:
        month_path = macro_trips_path + '{}'.format(month)
        dates = list((calendar_df.loc[calendar_df['month'] == month]).date.unique())
        if not os.path.exists(month_path):
            os.mkdir(month_path)
        for date in dates:
            date_path = month_path + '\\' + '{}_route_data'.format(date)
            if not os.path.exists(date_path):
                os.mkdir(date_path)
            for route in routes:
                service_ids = list(calendar_df.loc[calendar_df['date'] == date, 'service_id'])
                temp_df = route_data.loc[(route_data['route_id'] == route) & (route_data['service_id'].isin(service_ids))]
                save_df_to_directory(temp_df, route, date_path + '\\')
