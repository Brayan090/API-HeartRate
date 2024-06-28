import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './artist/album/album.component';
import { PlayerlistComponent } from './player-list/player-list.component';
import { OptionsMenuComponent } from './player-list/options-menu/options-menu.component';
import { OptionsAlbumSongsComponent } from './artist/album/album-songs/options-album-songs/options-album-songs.component';
import { AlbumSongsComponent } from './artist/album/album-songs/album-songs.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from '../auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormResetPasswordComponent } from '../auth/form-reset-password/form-reset-password.component';

const routes:Routes = [
    {path:'',component:ArtistComponent},
    {path:':id/album',component:AlbumComponent,canActivate:[canActivate]},
    {path:':id/player-list',component:AlbumSongsComponent,canActivate:[canActivate]},
    {path:'player-list',component:PlayerlistComponent,canActivate:[canActivate]},
    {path:'password-recovery',component:FormResetPasswordComponent}
    
]

@NgModule({
    declarations:[
        ContentComponent,
        ArtistComponent,
        PlayerlistComponent,
        AlbumComponent,
        OptionsMenuComponent,
        OptionsAlbumSongsComponent,
        AlbumSongsComponent,
        FormResetPasswordComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        ContentComponent,
        OptionsMenuComponent,
    ]
})

export class ContentModule {}