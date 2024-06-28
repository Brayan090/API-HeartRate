import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.css']
})
export class FormResetPasswordComponent implements OnInit {

  private token:string;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      if (params['token']) {
        this.token = params['token'];
      }else{
        this.router.navigate([''])
      }
      
    })
  }

  onSubmit(form:NgForm){
    if (!form.valid) {
      return;
    }

    const data = {
      token:this.token,
      password:form.value.newPassword
    }

    this.store.dispatch(new AuthActions.ResetPassword(data));

  }

}
