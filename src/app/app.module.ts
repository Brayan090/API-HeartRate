import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componenets/header/header.component';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/app.reducer';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ArtistsEffects } from './Componenets/content/artist/store/artist.effects';
import { PlayerEffects } from './Componenets/player/store/player.effects';
import { PlayerListEffects } from './Componenets/content/player-list/store/player-list.effects';
import { LibraryEffects } from './Componenets/library/store/library.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthEffects } from './Componenets/auth/store/auth.effects';
import { SharedModule } from './Shared/shared.module';
import { CoreModule } from './core.module';
import { LibraryModule } from './Componenets/library/library.module';
import { PlayerModule } from './Componenets/player/player.module';
import { ContentModule } from './Componenets/content/content.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    LibraryModule,
    PlayerModule,
    ContentModule,
    StoreModule.forRoot(appReducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([ArtistsEffects,PlayerEffects,PlayerListEffects,LibraryEffects,AuthEffects]),
    BrowserAnimationsModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
