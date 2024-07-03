from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


#Models
from .models import (Artist,
                     Album,
                     Song,
                     Playlist,
                     FavoriteList
                     )

#Serializers
from .serializers import (ArtistSerializer,
                          AlbumSerializer,
                          SongSerializer,
                          PlayListSerializer,
                          FavoriteListSerializer
                          )




@api_view(['GET'])
def artist_list(response):
    if response.method == 'GET':
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists,many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def album_list(response,artistID):
    if response.method == 'GET':
        albums = Album.objects.filter(artist=artistID)
        serializer = AlbumSerializer(albums,many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def album_songs(response,albumID):
    if response.method == 'GET':
        songs = Song.objects.filter(album=albumID)
        serializer = SongSerializer(songs,many=True)
        return Response(serializer.data)
    


@api_view(['GET'])
def playlist(response,UserId):
    if response.method == 'GET':
        playlist = Playlist.objects.filter(user=UserId)
        serializer = PlayListSerializer(playlist,many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
def create_playlist(request):
    if request.method == 'POST':
        serializer = PlayListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH'])
def update_playlist(request,playlistId):
    try:
        playlist=Playlist.objects.get(pk=playlistId)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PlayListSerializer(playlist,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_playlist(request,playlistId):
    try:
        playlist = Playlist.objects.get(pk=playlistId)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
@api_view(['POST'])
def get_songs(request):
    if request.method == 'POST':
        try:
            IdList = request.data['songs']
            if not IdList:
                return Response({'message': 'Song IDs will not be provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            songs = Song.objects.filter(id__in=IdList)
            serializer = SongSerializer(songs,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        except Song.DoesNotExist:
            return Response({'message': 'No songs found'}, status=status.HTTP_404_NOT_FOUND)
        


@api_view(['POST'])
def add_song_to_playlist(request):
    try:
        playlist = Playlist.objects.get(pk=request.data['playlist_id'])
        song = Song.objects.get(pk=request.data['song_id'])
    except (Playlist.DoesNotExist, Song.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    playlist.songs.add(song)

    playlist.save()

    serializer = PlayListSerializer(playlist)
    return Response(serializer.data)

@api_view(['DELETE'])
def remove_song_to_playlist(request,playlistId,songId):
    try:
        playlist = Playlist.objects.get(pk=playlistId)
        song = Song.objects.get(pk=songId)
    except (Playlist.DoesNotExist, Song.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    playlist.songs.remove(song)

    playlist.save()

    serializer = PlayListSerializer(playlist)
    return Response(serializer.data)


@api_view(['GET'])
def get_favorite_songs(request,userId):
    try:
        favoriteList = FavoriteList.objects.get(user=userId)
        serializer = FavoriteListSerializer(favoriteList)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except FavoriteList.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_song_to_favorite(request):
    try:
        favoritelist = FavoriteList.objects.get(pk=request.data['favoritelist_id'])
        song = Song.objects.get(pk=request.data['song_id'])
    except (FavoriteList.DoesNotExist, Song.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    favoritelist.songs.add(song)

    favoritelist.save()

    serializer = FavoriteListSerializer(favoritelist)
    return Response(serializer.data)

@api_view(['DELETE'])
def remove_song_to_favoritelist(request,favoritelist_id,song_id):
    try:
        favoritelist = FavoriteList.objects.get(pk=favoritelist_id)
        song = Song.objects.get(pk=song_id)
    except (FavoriteList.DoesNotExist, Song.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    favoritelist.songs.remove(song)

    favoritelist.save()

    serializer = FavoriteListSerializer(favoritelist)
    return Response(serializer.data)