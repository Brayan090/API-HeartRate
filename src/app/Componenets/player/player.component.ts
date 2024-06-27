import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MediaControlService } from 'src/app/Shared/Services/media-control.service';
import * as fromApp from '../../store/app.reducer';
import * as PlayerActions from './store/player.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{
  @ViewChild('inputRangeVol') volume: ElementRef<HTMLInputElement>;
  rangeVolum:number = 100;
  isPlaying:boolean;
  duration:number;
  currentTime:number;
  rangeValue=0;
  isOnInput = false;
  isMuted = false;

  image='assets/defaultSong.png';
  name='----------';

  constructor(private mediaControl:MediaControlService,private store:Store<fromApp.AppState>) {

  }

  ngOnInit() {
    
    this.mediaControl.duration$.subscribe(duration => {
      this.duration=duration

      this.mediaControl.currentTime$.subscribe(time => {
        if (!this.isOnInput) {
          if (this.duration) {
            this.rangeValue = (time / this.duration) * 100;
          }
        }
        this.currentTime=time
      })

    })

    this.mediaControl.isPlaying$.subscribe(state=>{
      this.isPlaying=state.isPlaying;
    })

    this.store.select('player').pipe(map(playerState=>{
      return playerState.currentSong
    })).subscribe(song=>{
      if (!!song) {
        this.image = song.album.coverImage;
        this.name = song.name;
      }
    })
    
  }


  togglePlayPause(){
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.store.dispatch(new PlayerActions.PlaySong())
    }else{
      this.store.dispatch(new PlayerActions.PauseSong())
    }
  }

  onInput(){
    this.isOnInput = true;
  }

  advanceAudio(event:Event){
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.mediaControl.advanceAudio(((+value*1)/100) * this.duration);
    this.isOnInput = false;
  }

  updateVolum(event:Event){
    const input = event.target as HTMLInputElement;
    const value = (+input.value)/100;
    this.mediaControl.volumControl(value);
  }

  mute(){
    this.isMuted = !this.isMuted
    if (this.isMuted) {
      this.mediaControl.volumControl(0);
      this.volume.nativeElement.value = '0'
    }else{
      this.mediaControl.volumControl((this.rangeVolum/100));
      this.volume.nativeElement.value = this.rangeVolum.toString();
    }
  }

  next(){
    this.isPlaying=true;
    this.mediaControl.nextSong();
  }
  previous(){
    this.isPlaying=true;
    this.mediaControl.previousSong();
  }


}
