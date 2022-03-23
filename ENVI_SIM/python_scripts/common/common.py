import datetime
import time as t
import os
import math
from typing import List
import pandas as pd
from requests import get
from pandas import json_normalize

FMT = r'%H:%M:%S' # time formmat for the gtfs time string
date_format = r'%Y%m%d' # date format for calendar dates
cwd = os.getcwd()
data_path = cwd + '\\data\\'
output_path = data_path + 'output\\'
input_path = data_path + 'input\\'
trip_set_path = data_path + 'trip_sets\\'
diesel_only_path = output_path + 'diesel_only_assignments\\'
gtfs_path = input_path + 'gtfs\\'
road_grade_path = input_path + 'elevation_profiles\\'
micro_trips_path = data_path + 'micro_trips\\'
macro_trips_path = data_path + 'macro_trips\\'

# 'weird_division' courtesy of stackoverflow
def weird_division(n, d): 
  return n/d if d else 0

# helper function to convert time string to total minutes for number comparison
def tomins(time):
  x = t.strptime(time, FMT)
  return (datetime.timedelta(hours=x.tm_hour,\
                            minutes=x.tm_min,\
                            seconds=x.tm_sec).total_seconds())/60

# get time difference between two time strings
def get_time_diff(start_time, end_time):
  return tomins(end_time) - tomins(start_time)

# add minutes to time string
def add_to_time(time_string, mins):
  x = datetime.datetime.strptime(time_string, FMT)
  final_time = x + datetime.timedelta(minutes = mins)
  return final_time.strftime(FMT)

# return dataframe for provided trip_set_id
def get_trip_set_df(trip_set_id):
  return pd.read_csv(trip_set_path + '{}.csv'.format(trip_set_id))

# get GTFS data
def get_gtfs(name):
    return pd.read_csv(gtfs_path + '{}.csv'.format(name))

# get data from specified directory
def get_dataframe(filename, directory):
    return pd.read_csv(directory + '{}.csv'.format(filename))

# insert a dataframe and directory and function saves dataframe as csv to directory
def save_df_to_directory(df, name, directory):
    df.to_csv(directory + '{}.csv'.format(name), index = False)

def get_elevation(lat, lon):
    '''
        script for returning elevation in m from lat, long

    '''
    if lat is None or lon is None: return None
    query = ('https://api.airmap.com/elevation/v1/ele/?points={},{}'.format(lat, lon))
    
    # Request with a timeout for slow responses
    r = get(query, timeout = 20)

    # Only get the json response in case of 200 or 201
    if r.status_code == 200 or r.status_code == 201:
        elevation = json_normalize(r.json())['data'].values[0]
    else:
        elevation = None
    try:
        return elevation[0] # m
    except:
        return elevation

#HAVERSINE FUNCTION
def haversine(lat1,lon1,lat2,lon2):
    lat1_rad=math.radians(lat1)
    lat2_rad=math.radians(lat2)
    lon1_rad=math.radians(lon1)
    lon2_rad=math.radians(lon2)
    delta_lat=lat2_rad-lat1_rad
    delta_lon=lon2_rad-lon1_rad
    a=math.sqrt((math.sin(delta_lat/2))**2+math.cos(lat1_rad)*math.cos(lat2_rad)*(math.sin(delta_lon/2))**2)
    d=2*6371000*math.asin(a)
    return d

def delete_all_files(list_of_directories):
    if type(list_of_directories) != list:
        for f in os.listdir(list_of_directories):
            os.remove(os.path.join(list_of_directories,f))
    else:
        for dir in list_of_directories:
            for f in os.listdir(dir):
                os.remove(os.path.join(dir, f))

# return a dataframe with speed and time columns for a trip_set
def get_speed_profile_data(trip_set, all_trips):
    trip_ids = list(trip_set['trip_id'])
    speed_data = all_trips.loc[all_trips['trip_id'].isin(trip_ids), ['arrival_time', 'speed']]
    speed_data = speed_data.sort_values(['arrival_time'], ascending=True)
    speed_data = speed_data.iloc[::4, :]
    return speed_data

# return dataframe containing trip_id and energy_consumed from trip_set
def get_energy_consumption_plot_data(trip_set):
    return trip_set[['trip_id', 'energy_consumed']]

# return dataframe with co2 emission and trip
def get_emission_plot_data(trip_set):
    return trip_set[['trip_id', 'co2_emission']]

# return dataframe containing time and soc
def get_soc_plot_data(trip_set):
    current_time = []
    current_soc = []
    dict  = {}
    for start_time, end_time, initial_soc, final_soc \
        in zip(trip_set['start_time'], trip_set['end_time'], trip_set['initial_soc'], trip_set['final_soc']):
        current_time.append(start_time)
        current_soc.append(initial_soc)
        current_time.append(end_time)
        current_soc.append(final_soc)
    dict['time'] = current_time
    dict['soc'] = current_soc
    return pd.DataFrame.from_dict(dict, orient = 'index').transpose()