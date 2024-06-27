import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Playlist } from 'src/app/Componenets/library/playlist.model';
import * as fromApp from '../../../../../../store/app.reducer';
import * as ArtistActions from '../../../store/artist.actions';
@Component({
  selector: 'app-options-album-songs',
  templateUrl: './options-album-songs.component.html',
  styleUrls: ['./options-album-songs.component.css']
})
export class OptionsAlbumSongsComponent implements OnInit {

  @Input('data') data:{id:number};
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
    this.store.dispatch(new ArtistActions.AddToPlaylist({playlist_id:playlistId,song_id:this.data.id}))
  }

  addToFavorites(){
    this.store.dispatch(new ArtistActions.AddFavorite(this.data.id))
  }

}
