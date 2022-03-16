from django.shortcuts import render



def default_map(request):
    # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/default.html', 
                  { 'mapbox_access_token': mapbox_access_token })

                  
def route1(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/1.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route2(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/2.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route3c(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/3c.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route3m(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/3m.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route3j(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/3j.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route4(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/4.html', 
                  { 'mapbox_access_token': mapbox_access_token })
            
def route5(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/5.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route6(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/6.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route7(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/7.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route8(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/8.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route9(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/9.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route10(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/10.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route11(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/11.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route12(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/12.html', 
                  { 'mapbox_access_token': mapbox_access_token })

def route13(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/13.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route14(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/14.html', 
                  { 'mapbox_access_token': mapbox_access_token })
def route16(request):
   # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoibWFpa2VuYXB1YWRhIiwiYSI6ImNsMDMyZW5hZzE2dGYzcXBtbG1xaWF5ZXMifQ.P5oD18cMp2-SL7T5PZtvTw'
    return render(request, 'routes/timetables/16.html', 
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