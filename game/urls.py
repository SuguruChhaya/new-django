from django.urls import path 
from . import views

urlpatterns = [
    #I deleted name because I thought I didn't need it. 
    path("", views.home),
    path("play/", views.play),
    path("highscores/", views.highscores)
]