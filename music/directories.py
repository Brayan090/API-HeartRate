import os
from django.conf import settings

class CreateDirectory():

    @staticmethod
    def artist_directory_path(instance, filename):
        artist = instance.name
        # Creamos las rutas
        storage_path = os.path.join('artist',artist)
        full_path = os.path.join(settings.MEDIA_ROOT, storage_path)

        # Creamos la ruta si esta no existe
        os.makedirs(full_path, exist_ok=True)

        return os.path.join(storage_path, filename)
    

    @staticmethod
    def album_directory_path(instance, filename):
        artist = instance.artist.name
        album = instance.name

        # Creamos las rutas
        storage_path = os.path.join('artist',artist,album)
        full_path = os.path.join(settings.MEDIA_ROOT, storage_path)

        # Creamos la ruta si esta no existe
        os.makedirs(full_path, exist_ok=True)

        return os.path.join(storage_path, filename)
    

    @staticmethod
    def songs_directory_path(instance, filename):
        artist = instance.album.artist.name
        album = instance.album.name

        # Creamos la ruta de almacenamiento
        storage_path = os.path.join('artist',artist,album,'songs')
        full_path = os.path.join(settings.MEDIA_ROOT, storage_path)

        # Creamos la ruta si no existe
        os.makedirs(full_path, exist_ok=True)
        
        return os.path.join(storage_path, filename)
    
    @staticmethod
    def playlist_directory_path(instance, filename):
        username = instance.user.id

        storage_path = os.path.join('users','user'+ str(username))
        full_path = os.path.join(settings.MEDIA_ROOT, storage_path)

        # Creamos la ruta si no existe
        os.makedirs(full_path, exist_ok=True)
        
        return os.path.join(storage_path, filename)