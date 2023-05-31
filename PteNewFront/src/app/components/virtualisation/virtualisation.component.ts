import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VirtualisationEventComponent } from './virtualisation-event/virtualisation-event.component';
import { VirtualisationService } from 'src/app/services/virtualisation.service';
import { UserService } from 'src/app/services/users.service';
import { VirtualisationDetailsComponent } from './virtualisation-details/virtualisation-details.component';
import { AuthService } from 'src/app/services/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendEmailComponent } from './send-email/send-email.component';

declare var $: any;


// *** Confrimation Modal ***
@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title"><strong>Acceptance of reservation</strong> </h4>
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
        <strong>Are you sure you want to accept this reservation request ?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-success" (click)="OkayAccept()">Accept</button>
		</div>
	`,
})
export class NgbdModalConfirmation {
	@Input() id : any;

	constructor(public activeModal: NgbActiveModal,
    private virtualisationService : VirtualisationService,) {}

    OkayAccept(){
    this.virtualisationService.confirmEvent(this.id).subscribe(resultat=>{
       window.location.reload();
    })

   
  }
}


// *** Delete Modal ***

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title"><strong>Reservation deletion</strong> </h4>
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
        <strong>Are you sure you want to delete this reservation request ?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="OkayDelete()">Delete</button>
		</div>
	`,
})
export class NgbdModalContent {
	@Input() id : any;

	constructor(public activeModal: NgbActiveModal,
    private virtualisationService : VirtualisationService,) {}

  OkayDelete(){
    this.virtualisationService.deleteEvent(this.id).subscribe(resultat=>{
      window.location.reload();
    })
  }
}




@Component({
  selector: 'app-virtualisation',
  templateUrl: './virtualisation.component.html',
  styleUrls: ['./virtualisation.component.css']
})
export class VirtualisationComponent {

  p;applicant;
  virtualisationEvents;
  currentUserId;

  constructor(private dialog : MatDialog,
              private authService :AuthService,
              private virtualisationService : VirtualisationService,
              private modalService: NgbModal,
              private userService : UserService){

  }

  ngOnInit() {
    this.virtualisationService.getVirtualisationEvents().subscribe((resultData:any) =>{
      console.log(resultData)
      this.virtualisationEvents = resultData;
      this.applicant = this.userService.getUserByID(this.virtualisationEvents.applicant)
    })  
    this.currentUserId = localStorage.getItem('userId')

    
  }



  openDelete(id){
    const modalRef = this.modalService.open(NgbdModalContent);
    
    modalRef.componentInstance.id = id ;
  }

  openConfirm(id){
    const modalRef = this.modalService.open(NgbdModalConfirmation);
    
    modalRef.componentInstance.id = id ;
  }


  Reservation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height="100%";
    this.dialog.open(VirtualisationEventComponent, dialogConfig)
  }

  openViewDetails(item){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height="85%";
    dialogConfig.data=item;
    this.dialog.open(VirtualisationDetailsComponent, dialogConfig)
  }
  
  checkAdmin(){
    const role = this.authService.getAuthData().roles.includes('admin');
      return role;
  }

  checkAcceptation(item) : String{
    if(item ==true){
      return "Yes"
    }else{
      return "Not yet "
    }
  }
  sendEmail(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height="60%";
    this.dialog.open(SendEmailComponent, dialogConfig)
  }


}
