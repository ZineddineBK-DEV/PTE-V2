import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-technician-details',
  templateUrl: './technician-details.component.html',
  styleUrls: ['./technician-details.component.css']
})
export class TechnicianDetailsComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
          private dialogRef : MatDialogRef<TechnicianDetailsComponent>,){

  }
  onClose(){
    this.dialogRef.close();
  }
}
