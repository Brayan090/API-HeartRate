import { Action } from "@ngrx/store";
import { Artist } from "../artist.model";
import { Album } from "../album/album.model";
import { Song } from "../../player-list/song.model";

export const FETCH_ARTISTS = '[Artist] Fetch Artists';
export const SET_ARTISTS = '[Artist] Set Artists';

export const FECTH_ALBUMES = '[Artist] Fetch Albumes';
export const SET_ALBUMES = '[Artists] Set Albumes';
export const SET_CURRENT_ALBUM = '[Artist] Set Current Album';

export const FETCH_SONGS = '[Artist] Fetch Songs';
export const SET_SONGS = '[Artist] Set Songs';
export const ADD_FAVORITE = '[Artist] Add Favorite';
export const ADD_TO_PLAYLIST = '[Artist] Add to playlist';


export type ArtistActions = 
    | FetchArtists 
    | SetArtists
    | FetchAlbumes
    | SetAlbumes
    | SetCurrentAlbum
    | FetchSongs
    | SetSongs


export class FetchArtists implements Action{
    readonly type = FETCH_ARTISTS;
}

export class SetArtists implements Action{
    readonly type = SET_ARTISTS;

    constructor(public payload:Artist[]){}
}

export class FetchAlbumes implements Action {
    readonly type = FECTH_ALBUMES;

    constructor(public payload:number){}
}

export class SetAlbumes implements Action {
    readonly type = SET_ALBUMES;

    constructor(public payload:Album[]){}
}

export class SetCurrentAlbum implements Action{
    readonly type = SET_CURRENT_ALBUM;

    constructor(public payload:number){}
}

export class FetchSongs implements Action{
    readonly type = FETCH_SONGS;

    constructor(public payload:number){}
}

export class SetSongs implements Action{
    readonly type = SET_SONGS;

    constructor(public payload:Song[]){}
}

export class AddFavorite implements Action{
    readonly type=ADD_FAVORITE;

    constructor(public payload:number){}
}

export class AddToPlaylist implements Action{
    readonly type = ADD_TO_PLAYLIST;

    constructor(public payload:{playlist_id:number,song_id:number}){}
}