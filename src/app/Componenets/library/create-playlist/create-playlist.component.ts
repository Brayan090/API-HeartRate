import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as LibraryActions from '../store/library.actions';
import { map, Subscription } from 'rxjs';
import { Playlist } from '../playlist.model';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit,OnDestroy {

  @ViewChild('myform') myForm:NgForm;
  selectedFile:File;
  suscription:Subscription;

  editMode = false;
  playlistName=''

  constructor(private dialogRef: MatDialogRef<CreatePlaylistComponent>,
              private store:Store<fromApp.AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
                  if (data) {
                    this.editMode=true;
                  }
              }  

  ngOnInit() {
    if (this.editMode) {
      this.suscription=this.store.select('library').pipe(
        map(libraryState=>{
          return libraryState.Playlist
        }),map(libraryList=>{
          return {...libraryList.find(library=>{
            return library.id === this.data.id;
          })}
        })
      ).subscribe(library=>{
        this.playlistName = library.name
      })
    }
  }

  ngOnDestroy(): void {
    if (this.editMode) {
      this.suscription.unsubscribe();
    }
    
  }

  close(){
    this.dialogRef.close()
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){
    const formData = new FormData();
    if (!this.editMode) {
      formData.append('name',this.myForm.value.name);
      formData.append('coverImage',this.selectedFile);
      this.store.dispatch(new LibraryActions.CreatePlaylist(formData))
      this.dialogRef.close()
    }else{
      if (this.selectedFile) {
        formData.append('coverImage',this.selectedFile);
      }
      formData.append('name',this.myForm.value.name);
      this.store.dispatch(new LibraryActions.UpdatePlaylist({id:this.data.id,data:formData}))
      this.dialogRef.close()
    }


  }

}
