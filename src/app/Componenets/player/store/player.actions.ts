import { Action } from "@ngrx/store";
import { Song } from "../../content/player-list/song.model";


//List of Actions
export const PLAY_SONG = '[Player] Play Song';
export const PAUSE_SONG = '[Player] Pause Song';
export const NEXT_SONG = '[Player] Next Song';
export const PREVIOUS_SONG = '[Player] Previous Song';
export const LOAD_SONG = '[Player] Load Song';

export const LOAD_SONGS = '[Player] Load Songs';
export const SET_SONGS = '[Player] Set Songs';

export const CLEAR_DATA = '[Player] Clear data';

//Types of Actions
export type PlayerActions = 
    | LoadSong | LoadSongs
    | SetSongs | NextSong 
    | PreviousSong | PlaySong 
    | PauseSong | ClearData

export class LoadSong implements Action{
    readonly type = LOAD_SONG;

    constructor(public payload:number){}
}

export class LoadSongs implements Action {
    readonly type = LOAD_SONGS;

    constructor(public payload:number){}
}

export class SetSongs implements Action {
    readonly type = SET_SONGS;

    constructor(public payload:Song[]){}
}

export class NextSong implements Action{
    readonly type = NEXT_SONG;
}

export class PreviousSong implements Action{
    readonly type = PREVIOUS_SONG;
}

export class PlaySong implements Action{
    readonly type = PLAY_SONG;
}

export class PauseSong implements Action{
    readonly type = PAUSE_SONG;
}

export class ClearData implements Action{
    readonly type = CLEAR_DATA;
}