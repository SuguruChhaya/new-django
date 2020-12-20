"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#!Main URL Manager.

from os import stat
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', include("register.urls")),
    path('', include("game.urls")),
    path('', include("django.contrib.auth.urls"))
    #!This is essentially just playing the media root at that specific url
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#?Now I am kind of confused because I no longer need the static thingy. 
#!I need it!! For proof, when I restart the server, I will get an error. 
#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#http://127.0.0.1:8000/static/game/img/rio.png
