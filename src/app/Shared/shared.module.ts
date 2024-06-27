import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AlertComponent } from './alert/alert.component';
import { GetDuration } from './Directives/getDuration.directive';
import { onRightClickDirective } from './Directives/onRightClick.directive';
import { ResetDirective } from './Directives/reset.directive';
import { TogglePlayPauseDirective } from './Directives/togglePlayPause.directive';
import { SecondsToMinutesPipe } from './pipes/secondsToMinutes.pipe';

@NgModule({
    declarations:[
        AlertComponent,
        GetDuration,
        onRightClickDirective,
        ResetDirective,
        TogglePlayPauseDirective,
        SecondsToMinutesPipe
    ],
    imports:[
        MatDialogModule,
        MatButtonModule, 
        MatMenuModule, 
        MatIconModule
    ],
    exports:[
        AlertComponent,
        GetDuration,
        onRightClickDirective,
        ResetDirective,
        TogglePlayPauseDirective,
        SecondsToMinutesPipe,
        MatDialogModule,
        MatButtonModule, 
        MatMenuModule, 
        MatIconModule
    ]
})

export class SharedModule {}