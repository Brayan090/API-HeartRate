import { Song } from "../../content/player-list/song.model";
import * as PlayerActions from './player.actions';

export interface State {
    songs: Song[];
    currentSong: Song | null;
    indexCurrentSong:number|null;
    isPlaying: boolean | null;
}

const initialState: State = {
    songs: [],
    currentSong:null,
    indexCurrentSong:null,
    isPlaying:false
}


export function playerReducer(state=initialState,action:PlayerActions.PlayerActions){

    switch(action.type){
        case PlayerActions.LOAD_SONG:
            const IDsong = action.payload;
            return{
                ...state,
                currentSong: state.songs.find((song)=>{
                    return song.id === IDsong;
                }),
                indexCurrentSong:IDsong,
            };
        
        case PlayerActions.SET_SONGS:
            return{
                ...state,
                songs: [...action.payload]
            }
        
        case PlayerActions.PREVIOUS_SONG:
        case PlayerActions.NEXT_SONG:
            let nextSong = 0;

            const index = state.songs.findIndex((song) => song.id === state.indexCurrentSong);

            if (action.type === PlayerActions.NEXT_SONG) {
                if ((index+1) < state.songs.length) {
                    nextSong = index + 1;
                }else{
                    nextSong = 0;
                }
            }else{
                if ((index-1) >= 0) {
                    nextSong = index - 1;
                }else{
                    nextSong = state.songs.length-1;
                }
            }

            let idNextSong = state.songs.find((song,index)=>{
                return index === nextSong;
            })
            
            return{
                ...state,
                currentSong:state.songs.find((song)=>{
                    return song.id === idNextSong.id;
                }),
                indexCurrentSong:idNextSong.id
                
            }

        case PlayerActions.CLEAR_DATA:
            return{
                ...state,
                songs: [],
                currentSong:null,
                indexCurrentSong:null,
                isPlaying:null
            }

        default:
            return state;
    }

}