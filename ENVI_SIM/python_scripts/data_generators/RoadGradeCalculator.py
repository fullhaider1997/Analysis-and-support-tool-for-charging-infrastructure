import os
import pandas as pd
import matplotlib.pyplot as plt
from python_scripts.common.common import get_elevation, haversine, save_df_to_directory, get_gtfs

cwd = os.getcwd()
input_path = cwd + '\\data\\input\\'
shape_df = get_gtfs('shapes')
elevation_path = input_path + 'elevation_profiles'

shape_data = shape_df.groupby(['shape_id'])
shape_data = shape_data.first().append(shape_data.last()).sort_index().reset_index().drop_duplicates()
shape_data = shape_data.sort_values(['shape_id', 'shape_pt_sequence'], ascending = True)
shape_data = shape_data.drop(shape_data[shape_data.shape_id == 3027].index).reset_index(drop=True) # dropping redundant shapes
shape_ids = list(shape_data.shape_id.unique())

P1 = shape_data[['shape_pt_lat', 'shape_pt_lon']][::2].to_numpy().tolist()
P2 = shape_data[['shape_pt_lat', 'shape_pt_lon']][1::2].to_numpy().tolist()
h_dist = (shape_data['shape_dist_traveled'][1::2] * 0.001).tolist()

rg_data = {}
rg_data['shape_id'] = []
rg_data['road_grade(%)'] = []
for p1, p2, dist, shape_id in zip(P1, P2, h_dist, shape_ids):
  rg_data['shape_id'].append(shape_id)
  s = 100 # number of points between points
  interval_lat = (p2[0] - p1[0])/s # interval for latitude
  interval_lon = (p2[1] - p1[1])/s # interval for longitude
  # set new variables for start point
  lat0 = p1[0]
  lon0 = p1[0]
  # list of latitude and longitude
  lat_list = [lat0]
  lon_list = [lon0]
  # generate points
  for i in range(s):
      lat_step=lat0+interval_lat
      lon_step=lon0+interval_lon
      lon0=lon_step
      lat0=lat_step
      lat_list.append(lat_step)
      lon_list.append(lon_step)
  # distance, elevation, and road grade CALCULATION
  d_list, elev_list, rg_list =[], [], [] # distance, elevation, and road grade list
  for j in range(len(lat_list)):
      lat_p=lat_list[j]
      lon_p=lon_list[j]
      dp=haversine(lat0,lon0,lat_p,lon_p)/1000 #km
      elev = get_elevation(lat_p, lon_p) # m
      d_list.append(dp)
      elev_list.append(elev)
  d_list_rev=d_list[::-1] #reverse list
  mean_elev = round((sum(elev_list)/len(elev_list)), 3)
  min_elev = min(elev_list)
  max_elev = max(elev_list)
  distance = d_list_rev[-1]
  for i in range(len(d_list_rev)):
    try:
      rg = (((elev_list[i] + min_elev)*0.001)/d_list_rev[i]) * 100 # road grade %
    except:
      rg = 0
    rg_list.append(rg)
  rg_data['road_grade(%)'].append(round((sum(rg_list)/len(rg_list)), 3))
  if not os.path.exists(elevation_path): # delete existing file to create new pictures
    os.mkdir(elevation_path)
    # plot and save elevation profile
    image_format = '{}_elevation_profile.png'.format(shape_id)
    base_reg=0
    plt.figure(figsize=(10,4))
    plt.plot(d_list_rev,elev_list)
    plt.plot([0,distance],[min_elev,min_elev],'--g',label='min: '+str(min_elev)+' m')
    plt.plot([0,distance],[max_elev,max_elev],'--r',label='max: '+str(max_elev)+' m')
    plt.plot([0,distance],[mean_elev,mean_elev],'--y',label='ave: '+str(mean_elev)+' m')
    plt.fill_between(d_list_rev,elev_list,base_reg,alpha=0.1)
    plt.text(d_list_rev[0],elev_list[0],"P1")
    plt.text(d_list_rev[-1],elev_list[-1],"P2")
    plt.xlabel("Distance(km)")
    plt.ylabel("Elevation(m)")
    plt.grid()
    plt.legend(fontsize='small')
    plt.savefig(elevation_path + '\\' + image_format)
rg_data = pd.DataFrame.from_dict(rg_data, orient='index').transpose()
save_df_to_directory(rg_data, 'road_grade', elevation_path + '\\')