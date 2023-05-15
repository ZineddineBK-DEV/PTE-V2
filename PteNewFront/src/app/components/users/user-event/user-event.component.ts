import { Component ,OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { userEvent } from 'src/app/model/userevent';
import { UserService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css'],
  providers: [MatSnackBar]
})
export class UserEventComponent implements OnInit{
  eventform: FormGroup;
  
  constructor( 
    private userService : UserService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar

){}

  ngOnInit(){
    this.eventform = this.formBuilder.group({
      title:[''],
      start:[this.data.startDate],
      starttime:[''],
      end:[''],
      endtime:[''],
      job:[''],
      address:['']
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.eventform.valid ) {
      const event = {
        title: this.eventform.value.title,
        start: null,
        end:null,
        applicant: localStorage.getItem("userId"),
        engineer: this.userService.selecteUserId,
        job:this.eventform.value.job,
        address:this.eventform.value.address,
      };
      
      if (this.eventform.value.starttime) {
        const startDate = moment(this.eventform.value.start).startOf('day');
        const startTime = moment(this.eventform.value.starttime, 'HH:mm');
        const startDateTime = startDate.add(startTime.get('hours'), 'hours').add(startTime.get('minutes'), 'minutes');
  
        event.start = startDateTime.toISOString();
      }
  
      if (this.eventform.value.endtime) {
        const endDate = moment(this.eventform.value.end).startOf('day');
        const endTime = moment(this.eventform.value.endtime, 'HH:mm');
        const endDateTime = endDate.add(endTime.get('hours'), 'hours').add(endTime.get('minutes'), 'minutes');
  
        event.end = endDateTime.toISOString();
      }
  
      

      this.http.post<userEvent>("http://localhost:3001/api/users/setevent", event)
        .subscribe(
          (response) => {
            console.log('Event created successfully', response);
            
            
            this.snackBar.open('Event created successfully', 'Close', { duration: 7000 });
           
          },
          (error) => {
            console.log('Error creating event', error);
            if (error.status === 500) {
              this.snackBar.open('Dates already booked', 'Close', { duration: 3000 });
            }
           
          }
        );
    }
  }
}
