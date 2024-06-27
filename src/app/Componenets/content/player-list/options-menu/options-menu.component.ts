import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Playlist } from 'src/app/Componenets/library/playlist.model';
import * as fromApp from '../../../../store/app.reducer';
import * as PlayerListActions from '../../player-list/store/player-list.actions';
import { map, Subscription } from 'rxjs';
@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.css']
})
export class OptionsMenuComponent implements OnInit,OnDestroy {

  @Input('data') data:{id:number,favMode:boolean};
  suscription:Subscription;
  playlists:Playlist[];

  constructor(private store:Store<fromApp.AppState>) {}

  ngOnInit() {
    this.suscription=this.store.select('library').pipe(
      map((libraryState)=>{
        return libraryState.Playlist
      })
    ).subscribe(playlists=>{
      this.playlists=playlists
    })
    
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  addToPlaylist(playlistId:number){
    this.store.dispatch(new PlayerListActions.AddToPlaylist({playlist_id:playlistId,song_id:this.data.id}))
  }

  addToFavorites(){
    this.store.dispatch(new PlayerListActions.AddToFavorites(this.data.id))
  }

  removeSong(){
    if (this.data.favMode) {
      this.store.dispatch(new PlayerListActions.RemoveSongFavorite(this.data.id))
    }else{
      this.store.dispatch(new PlayerListActions.RemoveSong({song_id:this.data.id}))
    }
    
  }

}

