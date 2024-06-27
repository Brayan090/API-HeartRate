import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as LibraryActions from '../store/library.actions';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private store:Store<fromApp.AppState>,
              private dialogRef: MatDialogRef<MenuComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog
            ) { }

  ngOnInit() {
  }

  edit(){
    this.dialogRef.close();
    this.dialog.open(CreatePlaylistComponent,{data:{id:this.data.id}})
  }

  delete(){
    this.store.dispatch(new LibraryActions.DeletePlaylist(this.data.id))
    this.dialogRef.close();
  }

}


