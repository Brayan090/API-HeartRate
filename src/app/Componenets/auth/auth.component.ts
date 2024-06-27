import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { NgForm } from '@angular/forms';
import { FormAuth } from './user.model';
import { map, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  @ViewChild('myForm') myForm:NgForm
  modeLogin = true;
  errorType:string | null
  errorMessage:string | null
  suscription:Subscription;

  constructor(private store:Store<fromApp.AppState>, private dialogRef:MatDialog) { }

  ngOnInit() {
    this.suscription=this.store.select('auth').subscribe(authState=>{
      this.errorType = authState.errorType;
      this.errorMessage = authState.errorMessage;
    })
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      return;
    }
    if (this.modeLogin) {
      const userData = new FormAuth(form.value.username,form.value.password)
      this.store.dispatch(new AuthActions.LogIn(userData))
      
      
    }else{
      const userData = new FormAuth(form.value.username,
        form.value.password,
        form.value.email)
        this.store.dispatch(new AuthActions.SignUp(userData))
    }
  }

  switchMode(){
    this.modeLogin = !this.modeLogin;
    this.store.dispatch(new AuthActions.ClearError())
  }

  onChangePassword(){
    this.dialogRef.open(ForgotPasswordComponent);
  }

}
