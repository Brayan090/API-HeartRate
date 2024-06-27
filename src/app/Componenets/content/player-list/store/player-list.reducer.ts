import { Song } from '../song.model';
import * as PlayerListActions from './player-list.actions';

export interface State {
    listOfSongs:Song[]
    playlist:{image:string,name:string,id?:number|null}
}

export const initialState:State = {
    listOfSongs:[],
    playlist:{id:null,image:'',name:''}
}


export function playerListReducer(state=initialState,action:PlayerListActions.PlayerListActions){
    switch(action.type){
        case PlayerListActions.SET_SONGS:
            return{
                ...state,
                listOfSongs:[...action.payload]
            }

        case PlayerListActions.SET_PLAYLIST:
            return{
                ...state,
                playlist:action.payload
            }

        default:
            return state;
    }
}