import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PlayerActions from './player.actions';
import * as fromApp from '../../../store/app.reducer';
import { map, tap, withLatestFrom } from "rxjs";
import { MediaControlService } from "src/app/Shared/Services/media-control.service";
import { Store } from "@ngrx/store";


@Injectable()
export class PlayerEffects{

    loadAudio = createEffect(
        ()=> this.action$.pipe(
            ofType(PlayerActions.LOAD_SONG,PlayerActions.NEXT_SONG,PlayerActions.PREVIOUS_SONG),
            withLatestFrom(this.store.select('player')),
            map(([action,playerState])=>{
                const currentSong = playerState.currentSong
                if (currentSong) {
                    this.mediaControl.loadAudio(currentSong.src)
                    this.mediaControl.isPlaying.next({isPlaying:true,idSong:currentSong.id});
                }
            })
        ),{dispatch:false}
    )

    playAudio = createEffect(
        ()=> this.action$.pipe(
            ofType(PlayerActions.PLAY_SONG),
            withLatestFrom(this.store.select('player')),
            map(([action,playerState])=>{
                this.mediaControl.play();
                this.mediaControl.isPlaying.next({isPlaying:true,idSong:playerState.indexCurrentSong})
            })
        ),{dispatch:false}
    )

    pauseAudio = createEffect(
        ()=> this.action$.pipe(
            ofType(PlayerActions.PAUSE_SONG),
            withLatestFrom(this.store.select('player')),
            map(([action,playerState])=>{
                this.mediaControl.pause();
                this.mediaControl.isPlaying.next({isPlaying:false,idSong:playerState.indexCurrentSong})
            })
        ),{dispatch:false}
    )

    removeSong = createEffect(
        ()=>this.action$.pipe(
            ofType(PlayerActions.CLEAR_DATA),
            tap(()=>{
                this.mediaControl.isPlaying.next({isPlaying:false,idSong:null})
                this.mediaControl.removeSong();
            })
        ),{dispatch:false}
    )


    constructor(private action$:Actions,
        private mediaControl:MediaControlService,
        private store:Store<fromApp.AppState>
    ){}
}