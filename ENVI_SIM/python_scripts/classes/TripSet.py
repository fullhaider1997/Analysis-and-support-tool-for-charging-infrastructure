import os
import pandas as pd
from python_scripts.common.common import save_df_to_directory

cwd = os.getcwd()
trip_set_path = cwd + '\\data\\trip_sets\\'

class trip_set:
    def __init__(self):
        self.trip_sets = {}
        self.no_of_trip_sets = 0

    def export_trip_sets(self):
        for key in list(self.trip_sets.keys()):
            route_trips = pd.DataFrame.from_dict(self.trip_sets[key], orient='index').transpose()
            save_df_to_directory(route_trips, key, trip_set_path)

    def create_trip_set(self, route, index):
        TS_route_index = 'TS_{}_{}'.format(route, index)
        self.trip_sets[TS_route_index] = {}
        self.trip_sets[TS_route_index]['route_id'] = []
        self.trip_sets[TS_route_index]['trip_id'] = []
        self.trip_sets[TS_route_index]['trip_headsign'] = []
        self.trip_sets[TS_route_index]['origin'] = []
        self.trip_sets[TS_route_index]['destination'] = []
        self.trip_sets[TS_route_index]['start_time'] = []
        self.trip_sets[TS_route_index]['end_time'] = []
        self.trip_sets[TS_route_index]['delay'] = []
        self.trip_sets[TS_route_index]['total_distance'] = []
        self.trip_sets[TS_route_index]['total_time'] = []
        self.trip_sets[TS_route_index]['avg_speed'] = []
        self.trip_sets[TS_route_index]['avg_acceleration'] = []
        self.trip_sets[TS_route_index]['shape_id'] = []
        self.trip_sets[TS_route_index]['road_grade'] = []
        self.trip_sets[TS_route_index]['stop_density'] = []
        self.trip_sets[TS_route_index]['has_station'] = []
        self.trip_sets[TS_route_index]['dist_to_station'] = []
        self.trip_sets[TS_route_index]['time_at_station'] = []
        self.no_of_trip_sets += 1

    def get_trip_sets(self):
        return self.trip_sets

    def get_no_of_trip_sets(self):
        return self.no_of_trip_sets

    def get_trip_set_identifiers(self):
        return list(self.trip_sets.keys())

    def populate_trip_set(self, route, index, trip_data, delay):
        TS_route_index = 'TS_{}_{}'.format(route, index)
        if not self.trip_sets[TS_route_index]:
            raise Exception('Trip set does not exist')
        else:
            self.trip_sets[TS_route_index]['route_id'].append(trip_data['route_id'].iloc[0])
            self.trip_sets[TS_route_index]['trip_id'].append(trip_data['trip_id'].iloc[0])
            self.trip_sets[TS_route_index]['trip_headsign'].append(trip_data['trip_headsign'].iloc[0])
            self.trip_sets[TS_route_index]['origin'].append(trip_data['origin'].iloc[0])
            self.trip_sets[TS_route_index]['destination'].append(trip_data['destination'].iloc[0])
            self.trip_sets[TS_route_index]['start_time'].append(trip_data['start_time'].iloc[0])
            self.trip_sets[TS_route_index]['end_time'].append(trip_data['end_time'].iloc[0])
            self.trip_sets[TS_route_index]['delay'].append('{} min'.format(delay))
            self.trip_sets[TS_route_index]['total_distance'].append(trip_data['total_distance'].iloc[0])
            self.trip_sets[TS_route_index]['total_time'].append(trip_data['total_time'].iloc[0])
            self.trip_sets[TS_route_index]['avg_speed'].append(trip_data['avg_speed'].iloc[0])
            self.trip_sets[TS_route_index]['avg_acceleration'].append(trip_data['avg_acceleration'].iloc[0])
            self.trip_sets[TS_route_index]['shape_id'].append(trip_data['shape_id'].iloc[0]) # shape id for retreiving road profile
            self.trip_sets[TS_route_index]['road_grade'].append(trip_data['road_grade'].iloc[0])
            self.trip_sets[TS_route_index]['stop_density'].append(trip_data['stop_density'].iloc[0])
            self.trip_sets[TS_route_index]['has_station'].append(trip_data['has_station'].iloc[0])
            self.trip_sets[TS_route_index]['dist_to_station'].append(trip_data['dist_to_station'].iloc[0])
            self.trip_sets[TS_route_index]['time_at_station'].append(trip_data['time_at_station'].iloc[0])
    
    def update_delay(self, route, index, new_delay):
        TS_route_index = 'TS_{}_{}'.format(route, index)
        self.trip_sets[TS_route_index]['delay'] = '{} min'.format(new_delay)