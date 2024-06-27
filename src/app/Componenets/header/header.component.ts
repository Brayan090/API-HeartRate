import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authState=false;
  private username:string
  open=false;
  get isAuth(){
    return this.authState;
  }

  get user(){
    return this.username;
  }

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('auth').subscribe(authState=>{
      if (!!authState.user) {
        this.username = authState.user.user.username
        this.authState=true;
      }else{
        this.authState = false;
        this.username=''
      }
    })
  }

  toggleMenu(){
    this.open=!this.open;
  }

  logout(){
    this.store.dispatch(new AuthActions.LogOutStart())
  }

}
