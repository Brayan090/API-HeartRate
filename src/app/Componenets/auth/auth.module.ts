import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SharedModule } from "src/app/Shared/shared.module";

const routes:Routes = [
    {path:'',component:AuthComponent}
]

@NgModule({
    declarations:[
        AuthComponent,
        ForgotPasswordComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class AuthModule{}