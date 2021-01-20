from django.http import response
from django.shortcuts import redirect, render
from .forms import RegistrationForm
from game.models import Player


# Create your views here.
def register(request):
    
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        #?All of them seem to be connected with suguruchhaya@gmail.com why????
        #*Maybe it's because no one was logged in at this point???
        #!NOW I KNOW WHY. IT WAS BECAUSE I WAS LOGGED IN WITH SUGURUCHHAYA@GMAIL.COM AND THE USER NEVER CHANGED. 
        #*As proof, when I register when I am logged out, I runn into an attribute error at request.user.player.add
        #!SINCE THIS IS THE CASE I NEED TO CREATE THE PLAYER IN HOME PAGE
        if form.is_valid():
            #*I think I can just redirect to login
            #!I have to differentiate between what is done at registration vs login
            n = form.cleaned_data['username']
            p = Player(name=n, highscore=0)
            p.save()
            form.save()
            return redirect("/login")

    #*What I need to pass in the correct variables for register
    form = RegistrationForm()
    if request.user.is_authenticated:
        u = Player.objects.filter(name=request.user.get_username())[0]
        return render(request, "register/register.html", {"user": u, "logged_in": True, "form": form})
    else:
        return render(request, "register/register.html", {"logged_in":False, "form": form, })