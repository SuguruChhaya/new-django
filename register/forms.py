from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegistrationForm(UserCreationForm):
    #!Meta is necessary to save information in database correctly and successfully associate the logged in user
    #!with the player
    class Meta:
        model = User
        fields = ["username", "password1", "password2"]