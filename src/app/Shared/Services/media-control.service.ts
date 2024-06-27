import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";
import * as PlayerActions from '../../Componenets/player/store/player.actions';

@Injectable({
    providedIn: 'root'
})

export class MediaControlService implements OnInit{
    private audioElement:HTMLAudioElement;

    currentTime = new BehaviorSubject<number>(0);
    duration = new BehaviorSubject<number>(0);
    levelVolume = new BehaviorSubject<number>(1);
    isPlaying = new BehaviorSubject<{isPlaying:boolean,idSong:number|null}>({isPlaying:false,idSong:null});

    currentTime$ = this.currentTime.asObservable();
    duration$ = this.duration.asObservable();
    volume$ = this.levelVolume.asObservable();
    isPlaying$ = this.isPlaying.asObservable();

    constructor( private store:Store<fromApp.AppState>){
        this.audioElement = new Audio();
        
        this.audioElement.onloadedmetadata = ()=>{
            this.duration.next(this.audioElement.duration);
        }

        this.audioElement.ontimeupdate = ()=>{
            this.currentTime.next(this.audioElement.currentTime);
        }


        this.audioElement.onvolumechange = ()=>{
            this.levelVolume.next(this.audioElement.volume);
        }
        this.audioElement.onloadstart = ()=>{
            this.levelVolume.next(this.audioElement.volume);
        }

        this.audioElement.onended = ()=>{
            this.nextSong()
        }

        
    }

    ngOnInit(){
       
    }

    advanceAudio(seconds:number){
        this.audioElement.currentTime = seconds;
    }

    loadAudio(src:string){
        this.audioElement.src = src
        this.audioElement.load()
        this.audioElement.onloadeddata = () => {
            this.audioElement.play() 
        };
        
    }


    play(){
        this.audioElement.play();
    }

    pause(){
        this.audioElement.pause();
    }

    nextSong(){
        this.store.dispatch(new PlayerActions.NextSong());
    }

    previousSong(){
        this.store.dispatch(new PlayerActions.PreviousSong());
    }


    volumControl(value:number){
        this.audioElement.volume = value;
    }

    removeSong(){
        if (this.audioElement) {
            this.audioElement.pause();
            this.currentTime.next(0);
            this.duration.next(0);
            this.audioElement.src = '';
            this.audioElement.load();
        }
    }


}