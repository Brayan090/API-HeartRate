import { Action } from "@ngrx/store";
import { FormAuth, User } from "../user.model";


export const AUTO_LOG_IN = '[Auth] Auto log-in';
export const SIGN_UP = '[Auth] Sign-up';
export const LOG_IN = '[Auth] Log-in';
export const SET_USER = '[Auth] Set user';

export const AUTH_ERROR = '[Auth] Auth error';
export const CLEAR_ERROR = '[Auth] Clear error';

export const LOG_OUT_START = '[Auth] Log-out start';
export const LOG_OUT = '[Auth] Log-out';

export const SEND_RECOVERY_EMAIL = '[Auth] Send recovery email';
export const RESET_PASSWORD = '[Auth] Reset Password';

export type AuthActions = 
    | AutoLogIn
    | SignUp
    | LogIn
    | LogOutStart
    | LogOut
    | SetUser
    | AuthError
    | ClearError


export class AutoLogIn implements Action {
    readonly type = AUTO_LOG_IN;
}

export class SignUp implements Action{
    readonly type = SIGN_UP;

    constructor(public payload:FormAuth){}
}

export class LogIn implements Action{
    readonly type = LOG_IN;

    constructor(public payload:FormAuth){}
}

export class LogOutStart implements Action{
    readonly type = LOG_OUT_START;
}

export class LogOut implements Action{
    readonly type = LOG_OUT;
}

export class SetUser implements Action {
    readonly type = SET_USER;

    constructor(public payload:User){}
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;

    constructor(public payload:{type:string,message:string}){}
}

export class SendRecoveryEmail implements Action{
    readonly type=SEND_RECOVERY_EMAIL;

    constructor(public payload:{email:string}){}
}

export class ResetPassword implements Action {
    readonly type = RESET_PASSWORD;

    constructor(public payload:{token:string,password:string}){}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}