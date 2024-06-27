import { Action } from "@ngrx/store";
import { Song } from "../song.model";


export const FETCH_SONGS = '[PlayerList] Fetch Songs';
export const SET_SONGS = '[PlayerList] Set Songs';
export const SET_PLAYLIST = '[PlayerList] Set Playlist';
export const ADD_TO_PLAYLIST = '[PlayerList] Add to playlist';
export const ADD_TO_FAVORITES = '[PlayerList] Add to favorites';
export const REMOVE_SONG = '[PlayerList] Remove song';
export const REMOVE_SONG_FAVORITE = '[PlayerList] Remove song favorite';


export type PlayerListActions = FetchSongs | SetSongs | SetPlaylist


export class FetchSongs implements Action{
    readonly type = FETCH_SONGS;

    constructor(public payload:{songs:number[]}){}
}

export class SetSongs implements Action{
    readonly type = SET_SONGS;
    
    constructor(public payload:Song[]){}
}

export class SetPlaylist implements Action{
    readonly type = SET_PLAYLIST;

    constructor(public payload:{id?:number,image:string,name:string}){}
}

export class AddToPlaylist implements Action{
    readonly type = ADD_TO_PLAYLIST;

    constructor(public payload:{playlist_id:number,song_id:number}){}
}

export class AddToFavorites implements Action{
    readonly type = ADD_TO_FAVORITES;

    constructor(public payload:number){}
}

export class RemoveSong implements Action{
    readonly type = REMOVE_SONG;

    constructor(public payload:{song_id:number}){}
}

export class RemoveSongFavorite implements Action{
    readonly type = REMOVE_SONG_FAVORITE;

    constructor(public payload:number){}
}
