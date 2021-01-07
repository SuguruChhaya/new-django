from django.shortcuts import render, redirect
from .models import Player, Media
# Create your views here.
def home(request):
    if request.user.is_authenticated:
        #?I think I can filter out players based on their username because all usernames are unique
        #*I need to get the information from request first. 
        #!I have to add the [0] because I will not directly get an object but I will get a query set. 
        u = Player.objects.filter(name=request.user.get_username())[0]
        if request.method == "POST":
            #Redirect to HTML
            return redirect("/play")
            
        else:
            
            return render(request, "game/home.html", {"user": u, "logged_in": True})
        #!This includes any superuser that it created but I kind of wanna forget about the superuser case.
        #a = request.user.username

    else:
        return render(request, "game/home.html", {"logged_in": False})

def play(request):
    u = Player.objects.filter(name=request.user.get_username())[0]
    media = Media.objects.get(id=1)
    return render (request, "game/play.html", {"user":u, "logged_in": True, "media": media})

def submit(request):
    pass

def getPrevious(request):
    #*This somehow gets something. 
    
    username = request.GET.get()




        
