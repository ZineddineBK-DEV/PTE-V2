import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
          private dialogRef : MatDialogRef<EmployeeDetailsComponent>,){

  }

  ngOnInit(): void{
   
  }
  onClose(){
    this.dialogRef.close();
  }
}
