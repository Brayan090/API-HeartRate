import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/artist',pathMatch:'full'},
  {path:'artist',loadChildren:()=>import('./Componenets/content/content.module').then(m=>m.ContentModule)},
  {path:'auth',loadChildren:()=>import('./Componenets/auth/auth.module').then(m=>m.AuthModule)},
  {path:'library',loadChildren:()=>import('./Componenets/library/library.module').then(m=>m.LibraryModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
