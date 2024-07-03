from django.contrib import admin
from .models import (Artist,Album,Song,Genre,Playlist,FavoriteList)

admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Song)
admin.site.register(Genre)
admin.site.register(Playlist)
admin.site.register(FavoriteList)
