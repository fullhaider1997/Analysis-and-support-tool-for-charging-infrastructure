from django.shortcuts import render

# Create your views here.

def menu(request):
    return render(request, "menu/menu_page.html")

    
def test(request):
    return render(request, "menu/test.html")