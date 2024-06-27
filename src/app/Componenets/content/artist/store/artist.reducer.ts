import { Song } from "../../player-list/song.model";
import { Album } from "../album/album.model";
import { Artist } from "../artist.model";
import * as ArtistActions from './artist.actions';

export interface State{
    artists: Artist[];
    albumes: Album[];
    albumSongs:Song[]
    currentAlbum:Album | null
}

export const initialState:State={
    artists:[],
    albumes:[],
    albumSongs:[],
    currentAlbum:null
}


export function artistReducer(state=initialState,action:ArtistActions.ArtistActions){
    switch(action.type){
        case ArtistActions.SET_ARTISTS:
            return{
                ...state,
                artists: [...action.payload]
            }

        case ArtistActions.SET_ALBUMES:
            return{
                ...state,
                albumes:[...action.payload]
            }
        case ArtistActions.SET_CURRENT_ALBUM:
            return{
                ...state,
                currentAlbum: {...state.albumes.find(album=>album.id === Number(action.payload))}
            }
        case ArtistActions.SET_SONGS:
            return{
                ...state,
                albumSongs: [...action.payload]
            }

        default:
            return state;
    }
} 