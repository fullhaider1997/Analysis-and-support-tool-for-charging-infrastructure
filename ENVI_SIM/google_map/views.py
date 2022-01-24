from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def google_map_view(request):
    return render(request, "google_map/landing_page.html")