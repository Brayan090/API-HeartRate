from rest_framework import serializers

from .models import (Artist,
                    Album,
                    Song,
                    Playlist,
                    FavoriteList
                )


class ArtistSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Artist
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Album
        fields = '__all__'

class AlbumSongSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Album
        fields = ['name','releaseDate','coverImage']

class SongSerializer(serializers.ModelSerializer):
    album = AlbumSongSerializer()
    class Meta(object):
        model = Song
        fields = '__all__'

class PlayListSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Playlist
        fields = '__all__'

class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta(object):
        model=FavoriteList
        fields='__all__'
