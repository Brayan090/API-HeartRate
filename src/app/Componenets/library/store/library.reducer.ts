import { Song } from "../../content/player-list/song.model";
import { Favorite } from "../favorites.model";
import { Playlist } from "../playlist.model";
import * as LibraryActions from './library.actions';


export interface State{
    Playlist:Playlist[],
    favorites:Favorite|null,
    modeFavorite:boolean | null
}

export const initialState:State = {
    Playlist:[],
    favorites:null,
    modeFavorite:false
}


export function libraryReducer(state=initialState,action:LibraryActions.LibraryActions){
    switch(action.type){
        case LibraryActions.SET_PLAYLISTS:
            return{
                ...state,
                Playlist:[...action.payload]
            }
        case LibraryActions.SET_PLAYLIST:
            const index = state.Playlist.findIndex(playlist=>playlist.id === action.payload.id)
            let playlistUpdated:Playlist[];

            if (index !== -1) {
                playlistUpdated=[...state.Playlist]
                playlistUpdated[index] = action.payload 
            }else{
                playlistUpdated=[...state.Playlist,action.payload]
            }

            return{
                ...state,
                Playlist:[...playlistUpdated]
            }
        
        case LibraryActions.DELETE_PLAYLIST:
            return{
                ...state,
                Playlist:state.Playlist.filter((playlist)=>{
                    return playlist.id !== action.payload;
                })
            }

        case LibraryActions.SET_FAVORITES:
            return{
                ...state,
                favorites:action.payload
            }

        case LibraryActions.SET_MODE:
            return{
                ...state,
                modeFavorite:action.payload
            }

        case LibraryActions.CLEAR_DATA:
            return{
                ...state,
                Playlist:[],
                favorites:null,
                modeFavorite:null
            }
        
        default:
            return state;
    }
}