from django.http import response
from django.shortcuts import render, redirect
from .models import Player, Media
# Create your views here.
def home(request):
    #!TODO I need to make this so that it can receive information from the AJAX call and update database.
    #!I already have a post for this URL so I might as well post from a different URL.  
    if request.method == 'POST' and "start" not in request.POST:
        score = int(request.POST['score'])
        #*Need to get data from the highscore table. 
        
        u = Player.objects.filter(name=request.user.get_username())[0]
        if score > u.highscore:
            u.highscore = score
            u.save()


        
    if request.user.is_authenticated:
        #?I think I can filter out players based on their username because all usernames are unique
        #*I need to get the information from request first. 
        #!I have to add the [0] because I will not directly get an object but I will get a query set. 
        u = Player.objects.filter(name=request.user.get_username())[0]
        if request.method == "POST" and "start" in request.POST:
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
    highscore = u.highscore
    media = Media.objects.get(id=1)
    return render (request, "game/play.html", {"user":u, "logged_in": True, "media": media, "highscore": highscore})

def highscores(request):
    users = Player.objects.all()
    scoreList = []
    originalDict = {}
    #Adding the name:score pairs in the dictionary.

    for user in users:
        originalDict[user.name] = user.highscore

    sortedList = sorted(originalDict.items(), key=lambda kv:(kv[1], kv[0]))
    sortedList.reverse()

    if request.user.is_authenticated:   
        u = Player.objects.filter(name=request.user.get_username())[0]
        return render(request, "game/highscores.html", {"sortedDict": sortedList, "user": u, "logged_in": True})

    else:
        return render(request, "game/highscores.html", {"sortedDict": sortedList, "logged_in": False})






        
