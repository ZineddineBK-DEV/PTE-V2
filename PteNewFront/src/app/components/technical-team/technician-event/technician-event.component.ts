import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TechnicalTeamService } from 'src/app/services/technical-team.service';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';

declare var $: any;

@Component({
  selector: 'app-technician-event',
  templateUrl: './technician-event.component.html',
  styleUrls: ['./technician-event.component.css']
})
export class TechnicianEventComponent {

  startValue;
  endValue: Date;
  errorDate :boolean;
  res:any;

  @ViewChild('startPicker') startPicker!: DateTimePickerComponent;
  @ViewChild('endPicker') endPicker!: DateTimePickerComponent;
  
  constructor(private dialogRef : MatDialogRef<TechnicianEventComponent>,
    private technicianService : TechnicalTeamService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {}
  
  ngOnInit(){
    //console.log(this.data)
    const dateString = this.data.dateStr;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US' , { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
    this.startValue = formattedDate
  }
  

  originaltStartDate;
  originaltEndDate;

  submit(d:any){

    const starttValue = this.startPicker.value; 
    const endValue = this.endPicker.value; 
    
    this.originaltStartDate = new Date(starttValue);  
    this.originaltEndDate = new Date(endValue); 

    this.checkDate();
    
    //start date
    this.originaltStartDate.setDate(this.originaltStartDate.getDate());  
    const newStartDateTimestamp = this.originaltStartDate.getTime() + 3600 * 1000; // add one hour in milliseconds
    const newStartDate = new Date(newStartDateTimestamp).toISOString();    
    //end date
    this.originaltEndDate.setDate(this.originaltEndDate.getDate()); 
    const newEndDateTimestamp = this.originaltEndDate.getTime() + 3600 * 1000; // add one hour in milliseconds
    const newEndtDate = new Date(newEndDateTimestamp).toISOString(); 
    

    d.start =newStartDate;
    d.end =newEndtDate;
    d.engineer = this.data.engineer;
    d.applicant =localStorage.getItem("userId");
    
    //console.log(d)
    if(!this.errorDate){
      this.technicianService.setTechnicianEvent(d).subscribe({
        next: resultat => {
          console.log('Success: ', resultat);
          this.showNotification('top','center','success','Event created');
          setTimeout(() => {window.location.reload();}, 1000);
        },
        error: err => {
          console.log('Error: ', err);
          this.showNotification('top','center','danger','Date already reserved');
        },
        complete: () => {
        }
      });
    }
  }

  showNotification(from, align,col,message){

    $.notify({
        icon: "notifications",
        message: message,

    },{
        type: col,
        timer: 1000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

checkDate() {
  if (this.originaltStartDate >= this.originaltEndDate || this.originaltStartDate.getTime() === this.originaltEndDate.getTime()) {
    this.errorDate = true;
  } else {
    this.errorDate = false;
  }
  
}

  close(){
    this.dialogRef.close();
  }
}
