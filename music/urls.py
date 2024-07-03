from django.urls import re_path
from .views import (artist_list,album_list,
                    album_songs,playlist,
                    create_playlist,get_songs,
                    delete_playlist,update_playlist,
                    add_song_to_playlist,remove_song_to_playlist,
                    add_song_to_favorite,get_favorite_songs,
                    remove_song_to_favoritelist
                    )

urlpatterns = [
    re_path('artists/',artist_list,name='Artists'),
    re_path(r'albumes/(?P<artistID>\d+)/$',album_list,name='Albumes'),
    re_path(r'songs/(?P<albumID>\d+)/$',album_songs,name='Songs'),

    #Library Actions
    re_path(r'playlist/(?P<UserId>\d+)/$',playlist,name='playlist'),
    re_path(r'favorite-list/(?P<userId>\d+)/$',get_favorite_songs,name='favorite-list'),
    re_path('create-playlist/',create_playlist,name='create-playlist'),
    re_path(r'update-playlist/(?P<playlistId>\d+)/$',update_playlist,name='update-playlist'),
    re_path(r'delete-playlist/(?P<playlistId>\d+)/$',delete_playlist,name='delete-playlist'),
    re_path('get-song-list/',get_songs,name='get-song-list'),

    #PlayerList Actions
    re_path('add-song/',add_song_to_playlist,name='add-song'),
    re_path('add-favorite/',add_song_to_favorite,name='add-favorite'),
    re_path(r'remove-song/(?P<playlistId>\d+)/(?P<songId>\d+)/$',remove_song_to_playlist,name='remove-song'),
    re_path(r'remove-song-favorite/(?P<favoritelist_id>\d+)/(?P<song_id>\d+)/$',remove_song_to_favoritelist,name='remove-song-favorite'),
]

