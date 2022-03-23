class EnergyEstimator:
    def __init__(self):
        self.fuel_consumption_rate = 5.6 # ltr/hr
        self.ebus_emission_rate = 0.707 # kg/kWh
        self.diesel_emission_rate = 2.348 # kg/litre
        self.electricity_op_cost = 0.082 # $/kWh off peak
        self.electricity_mp_cost = 0.113 # $/kWh mid peak
        self.electricity_onp_cost =  0.17 # $/kWh on peak
        self.fuel_cost = 1.6 # $/litre
        self.d_agg = 1 # driver aggressiveness in levels (3 levels) Editable
        self.rc = 1 # road condition in levels (3 levels) Editable
        self.p_den = 8 # people density in bus in levels (4 levels) Editable
        self.hvac = 3.7 # energy consumed due to aux in kW
        self.season = 'Winter' # editable
        self.temp_spring = 2.3
        self.temp_summer = 16.7
        self.temp_fall = 5
        self.temp_winter = -11.7
        self.soc_upper_limit = 90 # editable
        self.soc_lower_limit = 20 # editable? I don't think sooo
        self.const = -0.782 # bias
        self.w_rg = 0.380 # weight for road grade
        self.w_soc = 0.0124 # weight for soc
        self.w_rc = 0.260 # weight for road condition
        self.w_hvac = 0.036 # weight for hvac
        self.w_pl = 0.005 # weight for passenger loader
        self.w_dagg = 0.065 # weight for driver agressiveness
        self.w_sd = 0.128 # weight for stop density
        self.w_spd = 0.007 # weight for average speed
    
    def set_aggressiveness(self, d_agg):
        self.d_agg = d_agg

    def set_road_condition(self, rc):
        self.rc = rc

    def set_passenger_density(self, p_den):
        self.p_den = p_den

    def set_season(self, season):
        self.season = season

    def set_soc_lower_limit(self, lower_limit):
        self.soc_lower_limit = lower_limit
    
    def set_soc_upper_limit(self, upper_limit):
        self.soc_upper_limit = upper_limit

    def set_electricity_op_cost(self, cost):
        self.electricity_op_cost = cost

    def set_electricity_mp_cost(self, cost):
        self.electricity_mp_cost = cost

    def set_electricity_onp_cost(self, cost):
        self.electricity_onp_cost = cost

    def set_fuel_cost(self, cost):
        self.fuel_cost = cost

    def get_soc_lower_limit(self):
        return self.soc_lower_limit
    
    def get_soc_upper_limit(self):
        return self.soc_upper_limit

    def calculate_energy_rate(self, road_grade, total_time, SOC, passenger_capacity,\
                                stop_density, avg_speed, total_distance,
                                battery_capacity):
        # we assume that the auxillary is on for 60% of the trip (scaling factor of 0.6)
        # we assume driver aggressiveness is slow (level 1)
        # we assume road condition is dry (level 1)
        # we also assume a busy(ness) of level 2 (scaling factor of 1/2 of total passenger capacity)
        t = 0
        season = self.season
        if season == 'Winter':
            t = self.temp_winter
        elif season == 'Summer':
            t = self.temp_summer
        elif season == 'Fall':
            t = self.temp_fall
        elif season == 'Spring':
            t = self.temp_spring
        duration = total_time/60 # convert from min to hr
        HVAC = (abs(20 - t) * 0.6 * duration) + self.hvac # kW
        passenger_loading = passenger_capacity * (1/self.p_den)
        energy_rate = self.const + (self.w_rg * road_grade) + (self.w_soc * SOC) +\
                    (self.w_rc * self.rc) + (self.w_hvac * HVAC) +\
                    (self.w_pl * passenger_loading) + (self.w_dagg * self.d_agg) +\
                    (self.w_sd * stop_density) + (self.w_spd * avg_speed) # kWh/km
        energy_consumed = energy_rate * total_distance # kWh
        # co2 emission is calculated using the emission rate of 0.707 kg/kWh for electric vehicles
        co2_emission = self.ebus_emission_rate * energy_consumed # kg
        final_soc = SOC - ((energy_consumed/battery_capacity)*100) # %
        if final_soc < 0: # chances are that estimated energy consumed would be more than is available
            final_soc = 0 
        return energy_rate, energy_consumed, final_soc, co2_emission
    
    def calculate_energy_charged(charge_rate, time_taken, soc, battery_capacity):
        energy_charged = charge_rate * (time_taken/60) # kWh - charge_rate in kW
        final_soc = soc + ((energy_charged/battery_capacity)*100) # %
        return energy_charged, final_soc

    def get_electricity_bill(self, energy_charged, time_at_station):
        hour = int(time_at_station.split(':')[0])
        if self.season == 'winter':
            if hour >= 11 and hour <= 17:
                return self.electricity_mp_cost * energy_charged # $
            elif (hour >= 7 and hour <= 11) or (hour >= 17 and hour <= 19):
                return self.electricity_onp_cost * energy_charged # $
            return self.electricity_op_cost * energy_charged # $
        elif hour >= 11 and hour <= 17:
            return self.electricity_onp_cost * energy_charged # $
        elif (hour >= 7 and hour <= 11) or (hour >= 17 and hour <= 19):
            return self.electricity_mp_cost * energy_charged # $
        return self.electricity_op_cost * energy_charged # $
    
    def get_required_recharge_time(self, battery_capacity, from_soc, charge_rate, operation_delay):
        if charge_rate == 0:
            return operation_delay # mins
        #print('battery capacity: {}'.format(type(battery_capacity)))
        #print('from_soc: {}'.format(type(from_soc)))
        #print('charge_rate: {}'.format(type(charge_rate)))
        #print('soc_upper_limit: {}'.format(type(self.soc_upper_limit)))
        return (60*battery_capacity*((self.soc_upper_limit - from_soc)*0.01))/(charge_rate) # mins

    def get_fuel_bill(self, fuel_consumed):
        return self.fuel_cost * fuel_consumed # $

    def get_diesel_emission(self, fuel_consumed):
        return self.diesel_emission_rate * fuel_consumed # kg

    def get_fuel_consumed(self, total_time):
        return self.fuel_consumption_rate * (total_time/60) # litres