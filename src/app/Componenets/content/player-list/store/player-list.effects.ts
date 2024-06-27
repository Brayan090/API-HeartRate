import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import * as PlayerListActions from './player-list.actions';
import { Playlist } from "src/app/Componenets/library/playlist.model";
import * as LibraryActions from '../../../library/store/library.actions';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from "@ngrx/store";
import { Favorite } from "src/app/Componenets/library/favorites.model";
import { Router } from "@angular/router";
import { Song } from "../song.model";

@Injectable()
export class PlayerListEffects{

    fetchSongs = createEffect(
        ()=>this.action$.pipe(
            ofType<PlayerListActions.FetchSongs>(PlayerListActions.FETCH_SONGS),
            switchMap((action)=>{
                return this.http.post<Song[]>(`${environment.apiUrl}/get-song-list/`,action.payload)
            })
            ,map((songs)=>{
                return songs.map(song=>{
                    const modifSong = {
                        ...song,src:environment.apiUrl + song.src,
                        album:{...song.album,coverImage:environment.apiUrl + song.album.coverImage}
                    }
                    return modifSong;
                })
            }),map((songs)=>{
                this.router.navigate(['/player-list'])
                return new PlayerListActions.SetSongs(songs)
            })
        )
    )

    addToPlaylist = createEffect(
        ()=>this.action$.pipe(
            ofType<PlayerListActions.AddToPlaylist>(PlayerListActions.ADD_TO_PLAYLIST),
            switchMap((action)=>{
                return this.http.post<Playlist>(`${environment.apiUrl}/add-song/`,action.payload)
            }),map(playlist=>{
                return {...playlist,coverImage:environment.apiUrl + playlist.coverImage}
            }),map(playlist=>{
                return new LibraryActions.SetPlaylist(playlist);
            })
        )
    )

    addToFavorite = createEffect(
        ()=>this.action$.pipe(
            ofType<PlayerListActions.AddToFavorites>(PlayerListActions.ADD_TO_FAVORITES),
            withLatestFrom(this.store.select('library')),
            switchMap(([action,libraryState])=>{
                const data = {favoritelist_id:libraryState.favorites.id,song_id:action.payload}
                return this.http.post<Favorite>(`${environment.apiUrl}/add-favorite/`,data)
            }),map(favorite=>{
                return new LibraryActions.SetFavorites(favorite);
            })
        )
    )

    removeSong = createEffect(
        ()=>this.action$.pipe(
            ofType<PlayerListActions.RemoveSong>(PlayerListActions.REMOVE_SONG),
            withLatestFrom(this.store.select('playerList')),
            switchMap(([action,playerListState])=>{
                return this.http.delete<Playlist>(`${environment.apiUrl}/remove-song/${playerListState.playlist.id}/${action.payload.song_id}/`)
            }),map(playlist=>{
                return {...playlist,coverImage:environment.apiUrl + playlist.coverImage}
            }),map(playlist=>{
                this.store.dispatch(new LibraryActions.LoadSongs({songs:playlist.songs}))
                return new LibraryActions.SetPlaylist(playlist);
            })
        )
    )

    removeSongFavorite = createEffect(
        ()=>this.action$.pipe(
            ofType<PlayerListActions.RemoveSongFavorite>(PlayerListActions.REMOVE_SONG_FAVORITE),
            withLatestFrom(this.store.select('library')),
            switchMap(([action,libraryState])=>{
                const favorite_id = libraryState.favorites.id;
                return this.http.delete<Favorite>(`${environment.apiUrl}/remove-song-favorite/${favorite_id}/${action.payload}/`)
            }),map(favorite=>{
                this.store.dispatch(new LibraryActions.LoadSongs({songs:favorite.songs}))
                return new LibraryActions.SetFavorites(favorite);
            })
        )
    )


    constructor(private action$:Actions,
                private http:HttpClient,
                private store:Store<fromApp.AppState>,
                private router:Router
    ){}
}