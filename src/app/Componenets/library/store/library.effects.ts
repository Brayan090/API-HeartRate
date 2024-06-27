import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LibraryActions from './library.actions';
import * as PlayerListActions from '../../content/player-list/store/player-list.actions';
import { map, of, switchMap, withLatestFrom } from "rxjs";
import { Playlist } from "../playlist.model";
import { environment } from "src/environments/environment";
import { Song } from "../../content/player-list/song.model";
import { Router } from "@angular/router";
import { Favorite } from "../favorites.model";
import * as fromApp from '../../../store/app.reducer';
import { Store } from "@ngrx/store";


@Injectable()
export class LibraryEffects{

    fetchPlaylist = createEffect(
        ()=> this.action$.pipe(
            ofType<LibraryActions.FetchPlaylist>(LibraryActions.FETCH_PLAYLIST),
            switchMap((action)=>{
                return this.http.get<Playlist[]>(`${environment.apiUrl}/playlist/${action.payload}/`)
            }),map((playlists)=>{
                return playlists.map(playlist=>{
                    return {...playlist,coverImage:environment.apiUrl+playlist.coverImage}
                })
            }),map(playlists=>{
                return new LibraryActions.SetPlaylists(playlists);
            })
        )
    )

    fetchFavorites = createEffect(
        ()=>this.action$.pipe(
            ofType<LibraryActions.FetchFavorites>(LibraryActions.FETCH_FAVORITES),
            switchMap((action)=>{
                return this.http.get<Favorite>(`${environment.apiUrl}/favorite-list/${action.payload}/`)
            }),map(favorites=>{
                return new LibraryActions.SetFavorites(favorites)
            })
        )
    )

    createPlaylist = createEffect(
        ()=>this.action$.pipe(
            ofType<LibraryActions.CreatePlaylist>(LibraryActions.CREATE_PLAYLIST),
            withLatestFrom(this.store.select('auth')),
            switchMap(([action,authState])=>{
                const form = action.payload;
                form.append('user',(authState.user.user.id).toString())
                return this.http.post<Playlist>(`${environment.apiUrl}/create-playlist/`,form)
            }),map(playlist=>{
                return {...playlist,coverImage:environment.apiUrl + playlist.coverImage}
            }),map((playlist)=>{
                return new LibraryActions.SetPlaylist(playlist);
            })
        )
    )

    updatePlaylist = createEffect(
        ()=>this.action$.pipe(
            ofType<LibraryActions.UpdatePlaylist>(LibraryActions.UPDATE_PLAYLIST),
            switchMap((action)=>{
                return this.http.patch<Playlist>(`${environment.apiUrl}/update-playlist/${action.payload.id}/`,action.payload.data)
            }),map(playlist=>{
                return {...playlist,coverImage:environment.apiUrl + playlist.coverImage}
            }),map(playlist=>{
                return new LibraryActions.SetPlaylist(playlist)
            })
        )
    )

    deletePlaylist = createEffect(
        ()=>this.action$.pipe(
            ofType<LibraryActions.DeletePlaylist>(LibraryActions.DELETE_PLAYLIST),
            switchMap((action)=>{
                return this.http.delete(`${environment.apiUrl}/delete-playlist/${action.payload}/`)
            })
        ),{dispatch:false}
    )


    constructor(private action$:Actions,private http:HttpClient,private router:Router, private store:Store<fromApp.AppState>){}
}