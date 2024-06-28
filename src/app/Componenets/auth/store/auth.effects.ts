import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from '../../../store/app.reducer';
import * as LibraryActions from '../../library/store/library.actions';
import * as PlayerActions from '../../player/store/player.actions';
import { MatDialog } from "@angular/material/dialog";
import { AlertComponent } from "src/app/Shared/alert/alert.component";

export const handleError = (errorRes:any)=>{
    let errorMessage = 'An unknown error ocurred!';
    let errorType = 'UK';
    if (!errorRes.error) {
        return of(new AuthActions.AuthError({type:errorType,message:errorMessage}))
    }
    switch(errorRes.error.detail){
        
        case 'Incorrect credentials!':
        case 'No User matches the given query.':
            errorMessage = 'Incorrect Credentials!'
            errorType = 'IC';
            break;
        case 'EMAIL_EXISTS':
            errorMessage = 'This email is already registered!';
            errorType = 'ER';
            break;
        case 'USER_EXISTS':
            errorMessage = 'This user already exists!';
            errorType = 'UE';
            break;
            
    }
    
    return of(new AuthActions.AuthError({type:errorType,message:errorMessage}))
}




@Injectable()
export class AuthEffects {

    signUp = createEffect(
        ()=> this.action$.pipe(
            ofType<AuthActions.SignUp>(AuthActions.SIGN_UP),
            switchMap((action)=>{
                return this.http.post<User>(`${environment.apiUrl}/sign-up/`,action.payload).pipe(
                    map(user=>{
                        localStorage.setItem('userData',JSON.stringify(user))
                        return new AuthActions.SetUser(user);
                    }),catchError(errorRes=>{
                        return handleError(errorRes);
                    })
                )
            })
        )
    )


    logIn = createEffect(
        ()=>this.action$.pipe(
            ofType<AuthActions.LogIn>(AuthActions.LOG_IN),
            switchMap((action)=>{
                return this.http.post<User>(`${environment.apiUrl}/log-in/`,action.payload).pipe(
                    map(user=>{
                        localStorage.setItem('userData',JSON.stringify(user))
                        return new AuthActions.SetUser(user);
                    }),catchError(errorRes=>{
                        return handleError(errorRes);
                    })
                )
            })
        )
    )

    logOut = createEffect(
        ()=>this.action$.pipe(
            ofType(AuthActions.LOG_OUT_START),
            switchMap(action=>{
                return this.http.get(`${environment.apiUrl}/log-out/`)
            }),switchMap(()=>{
                return of(new AuthActions.LogOut(), new LibraryActions.ClearData(), new PlayerActions.ClearData())
            })
            ,tap(()=>{
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
            })
        )
    )

    redirect = createEffect(() =>
        this.action$.pipe(
          ofType<AuthActions.SetUser>(AuthActions.SET_USER),
          switchMap((action) => {
            const id = action.payload.user.id;
            return of(
              new LibraryActions.FetchPlaylist(id),
              new LibraryActions.FetchFavorites(id)
            );
          }),
          tap(() => {
            this.router.navigate(['/artist']);
          })
        )
      );


      autoLogin = createEffect(
        ()=>this.action$.pipe(
            ofType(AuthActions.AUTO_LOG_IN),
            map(()=>{
                const userData:User = JSON.parse(localStorage.getItem('userData'))

                if (!userData) {
                    return {type:'DUMMY'};
                }
                if (userData.token) {
                    return new AuthActions.SetUser(userData);
                }

                return {type:'DUMMY'};
                
            })
        )
      )

      sendRecoveryEmail = createEffect(
        ()=>this.action$.pipe(
            ofType<AuthActions.SendRecoveryEmail>(AuthActions.SEND_RECOVERY_EMAIL),
            switchMap((action)=>{
                return this.http.post<{detail:string}>(`${environment.apiUrl}/recovery-email/`,action.payload).pipe(
                    map(resp=>{
                        return this.dialogRef.open(AlertComponent,{data:{title:'Recovery Email:',message:'Email sent successfully!'}})
                    }),
                    catchError(errorResp=>{
                        this.dialogRef.open(AlertComponent,{data:{title:'Recovery Email:',message:'The email could not be sent, make sure you have entered your email account correctly.'}})
                        return errorResp.error
                    })
                )
            })
        ),{dispatch:false}
      )

      resetPassword = createEffect(
        ()=> this.action$.pipe(
            ofType<AuthActions.ResetPassword>(AuthActions.RESET_PASSWORD),
            switchMap((action)=>{
                return this.http.post(`${environment.apiUrl}/reset-password/`,action.payload,{headers: new HttpHeaders(
                    {'Authorization':`Token ${action.payload.token}`,
                    'Content-Type': 'application/json'}
                )}).pipe(
                    map(resp=>{
                        return this.dialogRef.open(AlertComponent,{data:{title:'Password reset',message:'Password has been changed successfully.'}})
                    }),
                    catchError(errorResp=>{
                        this.dialogRef.open(AlertComponent,{data:{title:'Password reset',message:'An error occurred, the password could not be changed.'}})
                        return errorResp.error
                    })
                )
            }),tap(() => {
                this.router.navigate(['/auth']);
              })
        ),{dispatch:false}
      )


    constructor(private action$:Actions,private http:HttpClient, private router:Router,private store:Store<fromApp.AppState>,private dialogRef:MatDialog){}
}