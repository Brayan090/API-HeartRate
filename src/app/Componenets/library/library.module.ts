import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LibraryComponent } from "./library.component";
import { CreatePlaylistComponent } from "./create-playlist/create-playlist.component";
import { MenuComponent } from "./menu/menu.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/Shared/shared.module";

const routes:Routes = [
    {path:'',component:LibraryComponent},
]

@NgModule({
    declarations:[
        LibraryComponent,
        CreatePlaylistComponent,
        MenuComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        LibraryComponent,
        MenuComponent
    ]
})

export class LibraryModule{}