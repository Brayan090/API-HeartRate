import { Action } from "@ngrx/store";
import { Playlist } from "../playlist.model";
import { Favorite } from "../favorites.model";


export const FETCH_PLAYLIST = '[Library] Fetch Playlist';
export const SET_PLAYLISTS = '[Library] Set Playlists';
export const SET_PLAYLIST = '[Library] Set Playlist';
export const LOAD_SONGS = '[Library] Load songs';

export const CREATE_PLAYLIST = '[Library] Create Playlist';
export const UPDATE_PLAYLIST = '[Library] Update Playlist';
export const DELETE_PLAYLIST = '[Library] Delete Playlist';

export const FETCH_FAVORITES = '[Library] Fetch Favorites';
export const SET_FAVORITES = '[Library] Load Favorites';

export const SET_MODE = '[Library] Set Mode';
export const CLEAR_DATA = '[Library] Clear data';


export type LibraryActions = 
    | FetchPlaylist
    | SetPlaylists
    | LoadSongs
    | CreatePlaylist
    | SetPlaylist
    | DeletePlaylist
    | FetchFavorites
    | SetFavorites
    | SetMode
    | ClearData

export class SetMode implements Action{
    readonly type = SET_MODE;

    constructor(public payload:boolean){}
}

export class FetchPlaylist implements Action{
    readonly type = FETCH_PLAYLIST;

    constructor(public payload:number){}
}

export class SetPlaylists implements Action{
    readonly type = SET_PLAYLISTS;

    constructor(public payload:Playlist[]){}
}

export class SetPlaylist implements Action{
    readonly type = SET_PLAYLIST;

    constructor(public payload:Playlist){}
}

export class LoadSongs implements Action{
    readonly type = LOAD_SONGS;

    constructor(public payload:{"songs":number[]}){}
}


export class CreatePlaylist implements Action{
    readonly type = CREATE_PLAYLIST;

    constructor(public payload:FormData){}
}

export class UpdatePlaylist implements Action{
    readonly type = UPDATE_PLAYLIST;

    constructor(public payload:{id:number,data:FormData}){}
}

export class DeletePlaylist implements Action{
    readonly type = DELETE_PLAYLIST;

    constructor(public payload:number){}
}


export class FetchFavorites implements Action {
    readonly type = FETCH_FAVORITES;

    constructor(public payload:number){}
}

export class SetFavorites implements Action{
    readonly type = SET_FAVORITES;

    constructor(public payload:Favorite){}
}

export class ClearData implements Action{
    readonly type = CLEAR_DATA;
}