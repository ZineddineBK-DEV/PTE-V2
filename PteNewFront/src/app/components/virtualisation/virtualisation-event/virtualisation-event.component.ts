import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VirtualisationService } from 'src/app/services/virtualisation.service';

@Component({
  selector: 'app-virtualisation-event',
  templateUrl: './virtualisation-event.component.html',
  styleUrls: ['./virtualisation-event.component.css']
})
export class VirtualisationEventComponent {

  originaltStartDate;originaltEndDate;
  

  constructor(private dialogRef : MatDialogRef<VirtualisationEventComponent>,
              private virtService : VirtualisationService,
              private virtualisationService : VirtualisationService){}

  



  onClose(){
    this.dialogRef.close();
  }

  submit(formValue: any) {
    formValue.applicant = localStorage.getItem('userId');
    this.virtService.setVirtualisationEvent(formValue).subscribe({
    })
    window.location.reload()
  }

  checkDate(){

  }
}
