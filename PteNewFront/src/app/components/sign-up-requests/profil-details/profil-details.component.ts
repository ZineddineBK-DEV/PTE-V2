import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.css']
})
export class ProfilDetailsComponent {



  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
          private dialogRef : MatDialogRef<ProfilDetailsComponent>,){

  }

  ngOnInit(): void{
    console.log(this.data)
  }
  onClose(){
    this.dialogRef.close();
  }
}
