import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-virtualisation-details',
  templateUrl: './virtualisation-details.component.html',
  styleUrls: ['./virtualisation-details.component.css']
})
export class VirtualisationDetailsComponent {



  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
          private dialogRef : MatDialogRef<VirtualisationDetailsComponent>,){

  }

  ngOnInit(): void{
  }
  onClose(){
    this.dialogRef.close();
  }
}
