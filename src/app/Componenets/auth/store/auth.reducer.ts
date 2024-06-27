import { User } from "../user.model";
import * as AuthActions from './auth.actions';


export interface State {
    user: User | null
    errorType:string | null
    errorMessage:string | null
}

export const initialState:State = {
    user:null,
    errorType:null,
    errorMessage:null
}


export function authReducer(state=initialState,action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.SET_USER:
            return{
                ...state,
                user:action.payload,
                errorType:null,
                errorMessage:null
            }
        case AuthActions.AUTH_ERROR:
            return{
                ...state,
                user:null,
                errorType:action.payload.type,
                errorMessage:action.payload.message
            }
        case AuthActions.LOG_OUT:
            return{
                ...state,
                user:null,
                errorType:null,
                errorMessage:null
            }
        case AuthActions.CLEAR_ERROR:
            return{
                ...state,
                errorType:null,
                errorMessage:null
            }
        default:
            return state;
    }
}