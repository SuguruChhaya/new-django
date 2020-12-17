from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    #?I wonder if I have to use models.charfield even if I am not actaully displaying the form
    name = models.CharField(max_length=300, null=True)
    #*We want the records to be stored as none if there are no records so I can then change to 0
    previous_record = models.IntegerField(null=True)
    highscore = models.IntegerField(null=True)