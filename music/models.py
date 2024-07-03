from django.db import models
from django.contrib.auth.models import User
from .directories import CreateDirectory

class Artist(models.Model):
    name = models.CharField(max_length=100)
    coverImage = models.ImageField(upload_to=CreateDirectory.artist_directory_path)

    def __str__(self):
        return self.name

class Album(models.Model):
    artist = models.ForeignKey(Artist,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    releaseDate = models.DateTimeField()
    coverImage = models.ImageField(upload_to=CreateDirectory.album_directory_path)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Song(models.Model):
    album = models.ForeignKey(Album,on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre,on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    src = models.FileField(upload_to=CreateDirectory.songs_directory_path)

    def __str__(self):
        return self.name





class Playlist(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    songs = models.ManyToManyField(Song,blank=True)
    coverImage = models.ImageField(upload_to=CreateDirectory.playlist_directory_path)

    def __str__(self):
        return self.name

class FavoriteList(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    songs = models.ManyToManyField(Song,blank=True)
    # podcasts = models.ManyToManyField(Podcast,blank=True)



