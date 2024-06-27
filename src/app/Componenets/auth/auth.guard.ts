import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import { catchError, map, Observable, of, switchMap, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
    providedIn:'root'
})
class PermissionsService {

    constructor(private store:Store<fromApp.AppState>, private http:HttpClient, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree>{
        return this.store.select('auth').pipe(
            take(1),
            map(authState=>{
                return authState.user
            }),
            switchMap(user=>{
                if (!user) {
                    return of(this.router.createUrlTree(['/auth']));
                }
                return this.http.get<boolean>(`${environment.apiUrl}/validate-token/`).pipe(
                    map(()=>true),
                    catchError(()=>of(this.router.createUrlTree(['/auth'])))
                )
            })
        )
    }

}

export const canActivate: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
      return inject(PermissionsService).canActivate(route,state);
    };