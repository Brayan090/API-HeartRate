import { Component, OnDestroy, OnInit } from '@angular/core';
import { Song } from './song.model';
import { map, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { MediaControlService } from 'src/app/Shared/Services/media-control.service';
import * as PlayerActions from '../../player/store/player.actions';
import { Album } from '../artist/album/album.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerlistComponent implements OnInit, OnDestroy {

  songs:Song[];
  playlist:{image:string,name:string}
  subscription:Subscription;
  subsLib:Subscription;
  isPlaying:boolean;
  idSong:number;
  album:Album;
  favoriteMode=false;
  aux=false;

  constructor(private store:Store<fromApp.AppState>,
              private mediaControl:MediaControlService){}

  ngOnInit() {
    this.subscription=this.store.select('playerList').pipe(map((playerListState)=>{
      return ({songs:playerListState.listOfSongs,playlist:playerListState.playlist})
    }))
    .subscribe(({songs,playlist})=>{
      this.songs = songs;
      this.playlist=playlist;
    })

    this.subsLib = this.store.select('library').pipe(
      map(libraryState=>{
        return libraryState.modeFavorite
      })
    ).subscribe((favoriteMode=>this.favoriteMode=favoriteMode))

    this.mediaControl.isPlaying$.subscribe(state=>{
      this.isPlaying=state.isPlaying
      this.idSong=state.idSong;
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  togglePlayPause(idSong:number,image:string,name:string){
    if (idSong !== this.idSong) {
      this.aux=false;
    }

    if (this.isPlaying == false) {
      if (this.aux == false) {
        this.store.dispatch(new PlayerActions.SetSongs(this.songs))
        this.store.dispatch(new PlayerActions.LoadSong(idSong))
        this.aux=true;
      }else{
        this.store.dispatch(new PlayerActions.PlaySong())
      }
      
    }else{
      if (this.aux == false) {
        this.store.dispatch(new PlayerActions.SetSongs(this.songs))
        this.store.dispatch(new PlayerActions.LoadSong(idSong))
        this.aux=true;
      }else{
        this.store.dispatch(new PlayerActions.PauseSong())
      }
      
    }
    
  }

  

}
