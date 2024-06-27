import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, take } from "rxjs";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{
    constructor(private store:Store<fromApp.AppState>){}

    private urlsToInclude = [
        '/log-out/',
        '/albumes/',
        '/songs/',
        '/playlist/',
        '/favorite-list/',
        '/create-playlist/',
        'update-playlist/',
        '/delete-playlist/',
        '/get-song-list/',
        '/remove-song/',
        '/add-song/',
        '/remove-song-favorite/',
        '/validate-token/'
      ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldAddAuthHeader = this.urlsToInclude.some(url => req.url.includes(url));
        if (!shouldAddAuthHeader) {
            return next.handle(req);
        }

        return this.store.select('auth').pipe(
            take(1),
            map(authState=>{
                return authState.user;
            }),exhaustMap(user=>{
                if (!user) {
                    const modifiedReq = req.clone({headers:new HttpHeaders({'Authorization':`Token ${'.'}`})})
                    return next.handle(modifiedReq)
                }
                const modifiedReq = req.clone({headers:new HttpHeaders({'Authorization':`Token ${user.token}`})})
                return next.handle(modifiedReq);
            })
        )
    }
}