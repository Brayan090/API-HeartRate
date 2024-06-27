import { Component, OnInit } from '@angular/core';
import { Song } from '../../../player-list/song.model';
import { map , Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store/app.reducer';
import { MediaControlService } from 'src/app/Shared/Services/media-control.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ArtistActions from '../../store/artist.actions';
import * as PlayerActions from '../../../../player/store/player.actions';
import { Album } from '../album.model';

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.css']
})

export class AlbumSongsComponent implements OnInit {

  songs:Song[];
  album:Album;
  subscription:Subscription;
  isPlaying:boolean;
  idSong:number;
  aux=false;

  constructor(private store:Store<fromApp.AppState>,
    private mediaControl:MediaControlService,
    private activatedRoute:ActivatedRoute, private router:Router) 
    {
      if (activatedRoute.snapshot.params.id) {
        const albumID = activatedRoute.snapshot.params.id;
        store.dispatch( new ArtistActions.FetchSongs(albumID))
      }
      
    }

  ngOnInit() {
    this.subscription=this.store.select('artist').pipe(
    map(artistState=>({songs:artistState.albumSongs,currentAlbum:artistState.currentAlbum})))
    .subscribe(({songs,currentAlbum})=>{
      this.songs = songs;
      this.album = currentAlbum;
    })

    this.mediaControl.isPlaying$.subscribe(state=>{
      this.isPlaying=state.isPlaying
      this.idSong=state.idSong;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  togglePlayPause(idSong:number){
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
