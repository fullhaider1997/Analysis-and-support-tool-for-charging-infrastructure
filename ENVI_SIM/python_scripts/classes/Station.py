class Station:
    def __init__(self):
        self.default_ctype = 'Fast'
        self.slow_charge_rate = 20 # kW
        self.fast_charge_rate = 240 # kW
        self.swap_delay = 15 # mins
        self.default_stations = ['Waterfront Terminal', 'City Hall Terminal']
        self.stations = {}
        self.priority_count = {}

    def set_default_ctype(self, default_ctype):
        self.default_ctype = default_ctype

    def set_swap_delay(self, swap_delay):
        self.swap_delay = swap_delay
    
    def set_slow_rate(self, charge_rate):
        self.slow_charge_rate = charge_rate

    def set_fast_rate(self, charge_rate):
        self.fast_charge_rate = charge_rate

    def get_default_stations(self):
        return self.default_stations
    
    def add_station(self, name, ctype = None):
        if ctype == None:
            c_type = self.default_ctype
        else:
            c_type = ctype
        if name in list(self.stations.keys()):
            self.priority_count[name] += 1
        else:
            self.stations[name] = {}
            self.stations[name]['Type'] = c_type
            self.priority_count[name] = 1
            if c_type == 'Slow':
                self.stations[name]['Rate'] = self.slow_charge_rate
                self.stations[name]['Delay'] = 0
            elif c_type == 'Fast':
                self.stations[name]['Rate'] = self.fast_charge_rate
                self.stations[name]['Delay'] = 0
            elif c_type == 'Swap':
                self.stations[name]['Rate'] = 0
                self.stations[name]['Delay'] = self.swap_delay
    
    def set_station_type(self, name, c_type):
        self.stations[name]['Type'] = c_type
        if c_type == 'Slow':
            self.stations[name]['Rate'] = self.slow_charge_rate
            self.stations[name]['Delay'] = 0
        elif c_type == 'Fast':
            self.stations[name]['Rate'] = self.fast_charge_rate
            self.stations[name]['Delay'] = 0
        elif c_type == 'Swap':
            self.stations[name]['Rate'] = 0
            self.stations[name]['Delay'] = self.swap_delay
    
    def get_charge_parameters(self, name):
        return self.stations[name]['Rate'], self.stations[name]['Delay']

    def get_station_identifiers(self):
        return list(self.stations.keys())

    def get_required_stations(self):
        all_stations = self.get_station_identifiers()
        default_stations = self.get_default_stations()
        return list(filter(lambda station: station not in default_stations, all_stations))

    def get_stations(self):
        return self.stations