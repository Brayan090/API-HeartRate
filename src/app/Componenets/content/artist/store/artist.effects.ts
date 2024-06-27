import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { environment } from "src/environments/environment";
import * as ArtistActions from './artist.actions';
import { map, switchMap, withLatestFrom } from "rxjs";
import { Artist } from "../artist.model";
import { Injectable } from "@angular/core";
import { Album } from "../album/album.model";
import { Song } from "../../player-list/song.model";
import { Favorite } from "src/app/Componenets/library/favorites.model";
import * as LibraryActions from '../../../library/store/library.actions';
import { Store } from "@ngrx/store";
import * as fromApp from '../../../../store/app.reducer';
import { Playlist } from "src/app/Componenets/library/playlist.model";

@Injectable()
export class ArtistsEffects {

    fetchArtists = createEffect(
        () => this.actions$.pipe(
            ofType(ArtistActions.FETCH_ARTISTS),
            switchMap(()=>{
                return this.http.get<Artist[]>(`${environment.apiUrl}/artists/`)
            }),map(artists=>{
                return artists.map(artist=>{
                    return {...artist,coverImage:environment.apiUrl + artist.coverImage}
                })
            })
            ,map(artists=>{
                return new ArtistActions.SetArtists(artists);
            })
        )
    )

    fetchAlbumes = createEffect(
        () => this.actions$.pipe(
            ofType<ArtistActions.FetchAlbumes>(ArtistActions.FECTH_ALBUMES),
            switchMap((action)=>{
                return this.http.get<Album[]>(`${environment.apiUrl}/albumes/${action.payload}/`)
            }),map(albumes=>{
                return albumes.map(album=>{
                    return {...album,coverImage:environment.apiUrl + album.coverImage}
                })
            }),map(albumes=>{
                return new ArtistActions.SetAlbumes(albumes);
            })
        )
    )

    fetchSongs = createEffect(
        ()=> this.actions$.pipe(
            ofType<ArtistActions.FetchSongs>(ArtistActions.FETCH_SONGS),
            switchMap((action)=>{
                return this.http.get<Song[]>(`${environment.apiUrl}/songs/${action.payload}/`)
            }),map((songs)=>{
                return songs.map(song=>{
                    const modifSong = {
                        ...song,src:environment.apiUrl + song.src,
                        album:{...song.album,coverImage:environment.apiUrl + song.album.coverImage}
                    }
                    return modifSong;
                })
            }),map(songs=>{
                return new ArtistActions.SetSongs(songs);
            })
        )
    )

    setCurrentAlbum = createEffect(
        ()=>this.actions$.pipe(
            ofType<ArtistActions.FetchSongs>(ArtistActions.FETCH_SONGS),
            map(action=>{
                return new ArtistActions.SetCurrentAlbum(action.payload)
            })
        )
    )


    addToFavorite = createEffect(
        ()=>this.actions$.pipe(
            ofType<ArtistActions.AddFavorite>(ArtistActions.ADD_FAVORITE),
            withLatestFrom(this.store.select('library')),
            switchMap(([action,libraryState])=>{
                const data = {favoritelist_id:libraryState.favorites.id,song_id:action.payload}
                return this.http.post<Favorite>(`${environment.apiUrl}/add-favorite/`,data)
            }),map(favorite=>{
                return new LibraryActions.SetFavorites(favorite);
            })
        )
    )

    addToPlaylist = createEffect(
        ()=>this.actions$.pipe(
            ofType<ArtistActions.AddToPlaylist>(ArtistActions.ADD_TO_PLAYLIST),
            switchMap((action)=>{
                return this.http.post<Playlist>(`${environment.apiUrl}/add-song/`,action.payload)
            }),map(playlist=>{
                return {...playlist,coverImage:environment.apiUrl + playlist.coverImage}
            }),map(playlist=>{
                return new LibraryActions.SetPlaylist(playlist);
            })
        )
    )


    constructor(private actions$:Actions, private http:HttpClient,private store:Store<fromApp.AppState>){}

}