import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomEventsComponent } from './room-event/room-event.component';
import { EventDtailsComponent } from './event-details/event-details.component';
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RoomsService } from 'src/app/services/rooms.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Room deletion</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="activeModal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<!-- <strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong> -->
        <strong>Are you sure you want to delete this Room ?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="OkayDelete()">Delete</button>
		</div>
	`,
})
export class NgbdModalContent {
	@Input() IdItem : any;

	constructor(public activeModal: NgbActiveModal,
    private roomsService : RoomsService,) {}

  OkayDelete(){
    console.log(this.IdItem)
    this.roomsService.deleteRoom(this.IdItem).subscribe(resultat=>{
      
      window.location.reload();
    })
  }

  showNotification(from, align,msg){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: msg,

    },{
        type: 'success',
        timer: 3000,
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
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  search:any ; filteredRooms: any[] = [];
  rooms :any; room :any ;
  roomEvents:any;
  selectedRoom :any;
  showCalendar = false;
  isCalendarOpen: any[] = [];
  currentCalendarIndex;
  i;
  hoveredItem;
  itsAdmin ;

  constructor( private roomsService : RoomsService,
               private authService: AuthService ,
               private dialog : MatDialog ,
               private modalService: NgbModal,){

  }

  ngOnInit() : void{
    this.roomsService.getRooms().subscribe((resultData:any) =>{
      this.rooms = resultData;
    })
    this.currentCalendarIndex = -1;
    this.itsAdmin = this.checkAdmin();

  }

  
  toggleCalendar(id:any ,index) {

    this.i =index
    // Set the flag for the clicked technician to true, and all other flags to false
    this.isCalendarOpen = this.isCalendarOpen.map((val, i) => (i === index ? true : false));
    this.currentCalendarIndex = index;
    this.showCalendar = !this.showCalendar;
    this.selectedRoom = id
    this.roomsService.getRoomEvent(id).subscribe((resultData:any) =>{
      this.roomEvents = resultData;
      console.log("*** roomEvents ***")
      console.log(this.roomEvents);
  
      // to set the event color
      this.roomEvents.forEach(event => {
        event.backgroundColor = this.getEventColor(event.isAccepted);
      });

      if(!this.checkAdmin()){
        this.calendarOptions.events = this.roomEvents.filter(obj => obj.isAccepted === true);
        
      }else{
        this.calendarOptions.events = this.roomEvents
      }
  
      
    })
    this.room=id;
  }
  
  getEventColor(isAccepted: boolean): string {
    if (isAccepted === false) {
      return "red";
    } else {
      return "green";
    }
  }


  body : any ={} ;
  showForm: boolean = false;
  form: any = {};
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,  interactionPlugin],
  headerToolbar: {
    start: 'title',
    center: '',
    end: 'today prev,next'
  },
  
    
    events: [],
    initialView: "dayGridMonth",
    dateClick :  (info) => {
  
      const dateString = info.dateStr;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.openEvent(info.dateStr);

    },
  
    eventClick: (info) => {
      // console.log(info.event);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.height="55%";
      dialogConfig.data=info.event._def.extendedProps;
      this.dialog.open(EventDtailsComponent, dialogConfig)
    }
  }
  
  highlightCard() {
    const card = document.querySelector('.card');
    if (card.classList.contains('card-highlight')) {
      card.classList.remove('card-highlight');
    } else {
      card.classList.add('card-highlight');
    }
  }

  openEvent(d){
    this.body.room=this.room;
    this.body.dateStr=d;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "42%";
    dialogConfig.height="53%";
    dialogConfig.data=this.body;
    this.dialog.open(RoomEventsComponent, dialogConfig)
  }
  
  onDateClick(info: any) {
    this.showForm = true;
    this.form.start = info.dateStr;
    this.form.end = info.dateStr;
  }

  addRoom(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "36.5%";
    dialogConfig.height="50%";
    this.dialog.open(AddRoomComponent, dialogConfig)
  }

  deleteRoom(id){
    // this.roomsService.deleteRoom(id).subscribe(resultat=>{
      
    //   this.showNotification('top', 'center')
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 3000);
    // })
  }

  showNotification(from, align){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Room deleted."

    },{
        type: 'success',
        timer: 3000,
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


checkAdmin(){
  const role = this.authService.getAuthData().roles.includes('admin');
    return role;
}
  open(id) {
  
    const modalRef = this.modalService.open(NgbdModalContent);
    
    modalRef.componentInstance.IdItem = id ;
  }

  

  

}
