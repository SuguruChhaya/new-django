from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Player(models.Model):
    #!Even though I didn't need to add the related_name field, it is soooooooo important!!
    #*When I log in, I have to associate the User object with the Player object. 
    #*I do this by Player.objects.player. and filter things out. 
    #!I have to understand that Player belongs to the logged in user
    #user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name="player")
    #?I wonder if I have to use models.charfield even if I am not actaully displaying the form

    #?Since the usernames are all unique, the question is do I even need to add a OneToOneField or a ForeignKey?
    #*Cuz I can just filter out by name
    name = models.CharField(max_length=300, null=True)
    #*We want the records to be stored as none if there are no records so I can then change to 0
    #!Deleted previous_record because don't need to store in database. 
    highscore = models.IntegerField(null=True, default=0)

class Media(models.Model):
    #*When I change orders, I have to redo it. 
    #*Also Im not doing white cuz no way I can see it. 
    yellow = models.FileField(blank=True, null=True)
    greenyellow = models.FileField(blank=True, null=True)
    green = models.FileField(blank=True, null=True)
    skyblue = models.FileField(blank=True, null=True)
    gray = models.FileField(blank=True, null=True)
    orange = models.FileField(blank=True, null=True)
    pink = models.FileField(blank=True, null=True)
    magenta = models.FileField(blank=True, null=True)
    red = models.FileField(blank=True, null=True)
    purple = models.FileField(blank=True, null=True)
    blue = models.FileField(blank=True, null=True)
    black = models.FileField(blank=True, null=True)
    