import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.css']
})
export class AddTechnicianComponent {

  constructor(private dialogRef : MatDialogRef<AddTechnicianComponent>,
    ){}

  onClose(){this.dialogRef.close();}
  submit(){
    window.location.reload();
  }
}
