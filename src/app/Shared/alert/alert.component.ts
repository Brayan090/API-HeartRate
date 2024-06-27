import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  title:string;
  message:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title:string,message:string}) { }

  ngOnInit() {
    this.title=this.data.title;
    this.message=this.data.message;
  }

}
