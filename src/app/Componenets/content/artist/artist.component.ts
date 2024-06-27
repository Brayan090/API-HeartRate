import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as ArtistActions from './store/artist.actions';
import { Artist } from './artist.model';
import { map, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit,OnDestroy {

  artists:Artist[];
  suscription:Subscription;

  constructor(private store:Store<fromApp.AppState>,private http:HttpClient) {
      store.dispatch(new ArtistActions.FetchArtists())
  }

  ngOnInit() {
    this.suscription=this.store.select('artist').pipe(map((artistState)=>{
      return artistState.artists
    })).subscribe((artists:Artist[])=>{
      this.artists = artists;
    })
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
