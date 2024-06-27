import { Component, OnDestroy, OnInit } from '@angular/core';
import { Album } from './album.model';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as ArtistActions from '../store/artist.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit,OnDestroy {

  albumes:Album[];
  private artistId:number;
  artistName:string;
  private suscription:Subscription;

  constructor(private store:Store<fromApp.AppState>,private activeteRoute:ActivatedRoute) {
    this.artistId = activeteRoute.snapshot.params.id;
    store.dispatch(new ArtistActions.FetchAlbumes(this.artistId))
  }

  ngOnInit() {
    this.suscription=this.store.select('artist').pipe(map((artistState)=>{
      return ({artists:artistState.artists,albumes:artistState.albumes})
    })).subscribe(({artists,albumes})=>{
      if (!!artists) {
        const artist = artists.find(artist=> Number(artist.id) === Number(this.artistId))
        this.artistName = artist.name;
        this.albumes = albumes;
      }
      
    })
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
