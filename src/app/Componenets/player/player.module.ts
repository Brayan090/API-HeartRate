import { NgModule } from "@angular/core";
import { PlayerComponent } from "./player.component";
import { ProgressDirective } from "./Directives/progress.directive";
import { VolumAudioDirective } from "./Directives/volum-audio.directive";
import { SharedModule } from "src/app/Shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations:[
        PlayerComponent,
        ProgressDirective,
        VolumAudioDirective,

    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports:[
        PlayerComponent,
    ]
})

export class PlayerModule{}