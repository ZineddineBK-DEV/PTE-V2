import { Component ,OnInit, ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { CalendarOptions, EventInput  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { UserEventComponent } from './user-event/user-event.component';
import { ManageUserEventComponent } from './manage-user-event/manage-user-event.component';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MatSnackBar]
})
export class UsersComponent implements OnInit {
  
  user:User;
  workers:any[];
  SelectedUserId: string;
  showCalendar: boolean;
  
  constructor(
    private snackBar: MatSnackBar,
    private http:HttpClient,
    private dialog: MatDialog,
    private authService:AuthService,
    private userService :UserService,
    
    
  ){}
  @ViewChild('calendar') calendarComponent:FullCalendarComponent ;
  
  ngOnInit(){
    this.http.post<any>('http://localhost:3001/api/users/filter', {
      drivingLicense: "true",
      paths: 'firstName lastName image title department',
    }).subscribe(
      (response) => {
        this.workers = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    
    dateClick: (info) => {
      const dialogRef = this.dialog.open(UserEventComponent, {
        data: { startDate: info.dateStr },
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('Mini form dialog closed');
      });
    },
    eventClick: (info) => {
      // Get the clicked event's information
      
           const title=info.event.title;
           const applicant=info.event.extendedProps['applicant'];
           const id=info.event.id;
           const start= info.event.start;
           const end= info.event.end;
           const engineer= info.event.extendedProps['engineer'];
           const job= info.event.extendedProps['job'];
           const address= info.event.extendedProps['address'];
           const isAccepted = info.event.extendedProps['isAccepted'];

      
      
  
      // Display the event information using a dialog
      const dialogRef = this.dialog.open(ManageUserEventComponent, {
        data: { id,start, end, isAccepted,applicant ,title,engineer,job,address},
      });
      dialogRef.componentInstance.calendar = this.calendarComponent.getApi();
      dialogRef.afterClosed().subscribe(() => {
        console.log('Event info dialog closed');
      });
    },
    events: (info, successCallback, failureCallback) => {
      const start = info.startStr;
      const end = info.endStr;
  
      this.userService.getUserEvents(start,end,this.SelectedUserId).subscribe(
        ({ acceptedEvents, rejectedEvents }: any) => {
          const eventInputs: EventInput[] = [
            ...acceptedEvents.map(event => ({ ...event, color: 'green' ,extendedProps: { isAccepted: true }})),
            ...rejectedEvents.map(event => ({ ...event, color: 'orange' , extendedProps: { isAccepted: false }})),
          ];
  
          successCallback(eventInputs);
        },
        (error) => {
          failureCallback(error);
        }
      );
    }
  };

  onUserClick(userId: string) {
    this.userService.setSelectedUserId(userId);
    this.SelectedUserId = userId;
    console.log(this.SelectedUserId);
    this.showCalendar = true;
  
    this.calendarOptions.events = (info, successCallback, failureCallback) => {
      const start = info.startStr;
      const end = info.endStr;
  
      this.userService.getUserEvents(start, end, this.SelectedUserId).subscribe(
        ({ acceptedEvents, rejectedEvents }: any) => {
          const eventInputs: EventInput[] = [
            ...acceptedEvents.map(event => ({ ...event, color: 'green', extendedProps: { isAccepted: true } })),
            ...rejectedEvents.map(event => ({ ...event, color: 'orange', extendedProps: { isAccepted: false } })),
          ];
  
          successCallback(eventInputs);
        },
        (error) => {
          failureCallback(error);
        }
      );
    };
  };
  checkAdmin(){
    const role = this.authService.getAuthData().roles.includes('admin');
      return role;
  }
  deleteUser(userId : string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete this user?',
        confirmButtonText: 'Delete'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.http.delete("http://localhost:3001/api/users/delete/"+userId).subscribe(() => {
      this.workers = this.workers.filter(w => w._id !== userId);
      this.snackBar.open('Car deleted successfully', 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });}
  });
   
  }
  }

