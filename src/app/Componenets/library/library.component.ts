import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as LibraryActions from './store/library.actions';
import * as PlayerListActions from '../content/player-list/store/player-list.actions';
import { Subscription } from 'rxjs';
import { Playlist } from './playlist.model';
import { Router } from '@angular/router';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';
import { Favorite } from './favorites.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  suscription:Subscription;
  Playlists:Playlist[];
  favorite:Favorite;

  constructor(private store:Store<fromApp.AppState>, private router:Router,private dialog: MatDialog) {}

  ngOnInit() {
   this.suscription = this.store.select('library').subscribe((libraryState)=>{
      this.Playlists = libraryState.Playlist;
      this.favorite = libraryState.favorites;
    })

  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  loadSongs(list:[],id:number,image:string,name:string){
    if (list.length > 0 ) {
      this.store.dispatch( new LibraryActions.SetMode(false))
      this.store.dispatch( new PlayerListActions.SetPlaylist({id:id,image:image,name:name}))
      this.store.dispatch(new PlayerListActions.FetchSongs({songs:[...list]}))
    }
  }

  loadFavorites(){
    if (this.favorite.songs.length > 0) {
      this.store.dispatch( new LibraryActions.SetMode(true))
      this.store.dispatch( new PlayerListActions.SetPlaylist({image:'assets/ico.png',name:'Favorite List'}))
      this.store.dispatch(new PlayerListActions.FetchSongs({songs:this.favorite.songs}))
    }
    
  }

  search(event:Event){
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    const result = this.Playlists.filter(playlist=>playlist.name.toLowerCase().startsWith(searchValue.toLowerCase()))

    if (result.length > 0 ) {

    }
    
  }


  openModal(){
    this.dialog.open(CreatePlaylistComponent);
  }

  handleRightClick(data:{event:MouseEvent,id:number}){
      this.dialog.open(MenuComponent, {
      position: {
        top: `${data.event.clientY}px`,
        left: `${data.event.clientX}px`
      },
      data:{
        id:data.id
      }
    });
  
  }

  

}
