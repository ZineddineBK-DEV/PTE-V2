import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-technician-update',
  templateUrl: './technician-update.component.html',
  styleUrls: ['./technician-update.component.css']
})
export class TechnicianUpdateComponent {

  isInputFocused;
  constructor(private dialogRef : MatDialogRef<TechnicianUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    console.log(this.data)
  }

  onClose(){this.dialogRef.close();}
  submit(){
    window.location.reload();
  }
}
