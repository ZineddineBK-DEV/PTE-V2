import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TechnicalTeamService } from 'src/app/services/technical-team.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from "@fullcalendar/core";
import { TechnicianEventComponent } from './technician-event/technician-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AuthService } from 'src/app/services/auth.service';
import { data } from 'src/app/technicians-data';
import { TechnicianDetailsComponent } from './technician-details/technician-details.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTechnicianComponent } from './add-technician/add-technician.component';
import { TechnicianUpdateComponent } from './technician-update/technician-update.component';
@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h2 class="modal-title" id="modal-title">Technician deletion</h2>
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
        <strong>Are you sure you want to delete this Tehnician ?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="OkayDelete()">Delete</button>
		</div>
	`,
})
export class NgbdModalContent {
  

	constructor(public activeModal: NgbActiveModal) {}


  OkayDelete(){
    // window.location.reload()
  }

  
}

@Component({
  selector: 'app-technical-team',
  templateUrl: './technical-team.component.html',
  styleUrls: ['./technical-team.component.css']
})
export class TechnicalTeamComponent {

  search:any ;
  engineer ;
  selectedTechnician: any;
  technicians : any; technicianEvents :any;
  showCalendar = false;
  isCalendarOpen: any[] = [];
  currentCalendarIndex: number =-1 ;
  i;
  hoveredItem;
  technician_Fake_Data= data;

  constructor( private technicalTeam : TechnicalTeamService ,
               private authService: AuthService ,
               private modalService: NgbModal,
               private dialog : MatDialog ,){}

  ngOnInit() : void{
    this.technicalTeam.getTechnicians().subscribe((resultData:any) =>{
      this.technicians = resultData;
      console.log('Technicians : ',this.technicians)
    })
    this.currentCalendarIndex = -1; 
    
  }

  toggleCalendar(id:any, index ) {
    
    this.i =index
    // Set the flag for the clicked technician to true, and all other flags to false
    this.isCalendarOpen = this.isCalendarOpen.map((val, i) => (i === index ? true : false));
    this.currentCalendarIndex = index;
    
    this.selectedTechnician = id;

    this.showCalendar = !this.showCalendar;
    this.selectedTechnician = id;

    this.technicalTeam.getTechnicianEvents(id).subscribe((resultData:any) =>{
      this.technicianEvents = resultData;

      // console.log("*** TechEvents ***")
      // console.log(this.technicianEvents);
  
      // to set the event color
      this.technicianEvents.forEach(event => {
        event.backgroundColor = this.getEventColor(event.isAccepted);
      });
  
      
      if(!this.checkAdmin()){
        this.calendarOptions.events = this.technicianEvents.filter(obj => obj.isAccepted === true);
        
      }else{
        this.calendarOptions.events = this.technicianEvents
      }
    })
    this.engineer=id;
    

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
      console.log(info.event);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.height="70%";
      dialogConfig.data=info.event._def.extendedProps;
      this.dialog.open(EventDetailsComponent, dialogConfig)
    }
  }

  openEvent(d){
    this.body.engineer=this.engineer;
    this.body.dateStr=d;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height="75%";
    dialogConfig.data=this.body;
    this.dialog.open(TechnicianEventComponent, dialogConfig)
  }

  getEventColor(isAccepted: boolean): string {
    if (isAccepted === false) {
      return "red";
    } else {
      return "green";
    }
  }

  checkAdmin(){
    const role = this.authService.getAuthData().roles.includes('admin');
      return role;
  }
  addTechnician(){}

  highlightCard() {
    const card = document.querySelector('.card');
    if (card.classList.contains('card-highlight')) {
      card.classList.remove('card-highlight');
    } else {
      card.classList.add('card-highlight');
    }
  }

  openViewDetails(technician){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height="62.6%";
    dialogConfig.data=technician;
    this.dialog.open(TechnicianDetailsComponent, dialogConfig)
  }

  openDelete(){
    const modalRef = this.modalService.open(NgbdModalContent);
  }

  openAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height="78%";
    this.dialog.open(AddTechnicianComponent, dialogConfig)
  }
  openEdit(technician){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height="78%";
    dialogConfig.data=technician;
    this.dialog.open(TechnicianUpdateComponent, dialogConfig)
  }

}
