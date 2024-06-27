import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { SendRecoveryEmail } from '../store/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ForgotPasswordComponent>,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      return;
    }
    this.store.dispatch(new SendRecoveryEmail({email:form.value.email}))
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}
