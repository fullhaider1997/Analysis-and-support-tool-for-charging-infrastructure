from django.shortcuts import render



def default_map(request):
    # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/default.html', 
                  { 'mapbox_access_token': mapbox_access_token })

                  
def routeOne(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/1.html', 
                  { 'mapbox_access_token': mapbox_access_token })

# Create your views here.
def routesDashBoard(request):
    #return render (request, "routes/index.html")
    # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/index.html', 
                  { 'mapbox_access_token': mapbox_access_token })