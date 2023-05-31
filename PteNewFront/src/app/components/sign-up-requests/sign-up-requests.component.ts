
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilDetailsComponent } from './profil-details/profil-details.component';
declare var $: any;


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Request deletion</h4>
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
        <strong>Are you sure you want to delete this request ?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="OkayDelete()">Delete</button>
		</div>
	`,
})
export class NgbdModalDelete {
	@Input() IdItem : any;
  private _DeleteUrl = "http://localhost:3001/api/users/delete/";

	constructor(public activeModal: NgbActiveModal,private AuthService: AuthService ,private http : HttpClient ,
    ) {}


    OkayDelete() {
      
      this.http.delete(this._DeleteUrl + this.IdItem).subscribe(() => {
        this.showNotification('bottom', 'center',"Request deleted")
      setTimeout(() => {
        window.location.reload();
      }, 3000);
     
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
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Confirm Request</h4>
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
        <strong>Are you sure you want to confirm this request ?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-success" (click)="OkayConfirm()">confirm</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	@Input() IdItem : any;
  private _ConfirmUrl= "http://localhost:3001/api/users/confirm-signup/";

	constructor(public activeModal: NgbActiveModal,private AuthService: AuthService ,private http : HttpClient ,
    ) {}


    OkayConfirm() {
      
      this.http.post(this._ConfirmUrl+this.IdItem, {}).subscribe(() => {
        
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
  selector: 'sign-up-requests',
  templateUrl: './sign-up-requests.component.html',
  styleUrls: ['./sign-up-requests.component.css'],
  providers: [MatSnackBar]
})


 
export class SignUpRequestsComponent implements OnInit{




  users : User[];
deleteError: string;
deleteSuccess: string;
private _DeleteUrl = "http://localhost:3001/api/users/delete/";
private _ConfirmUrl= "http://localhost:3001/api/users/confirm-signup/";
user: User;
file;
p: number = 1;
headElements = ['ID', 'First', 'Last', 'Handle'];
searchName;searchDepartment;searchPhone;


constructor(private snackBar: MatSnackBar,
   private AuthService: AuthService ,
    private http : HttpClient ,
   private dialog: MatDialog,
   private modalService: NgbModal,){}



   ngOnInit() {
  this.AuthService.getSignUpRequests().subscribe((users) => {
    this.users = users;
  });
  
}


openDelete(id) {
    
  const modalRef = this.modalService.open(NgbdModalDelete);
  
  modalRef.componentInstance.IdItem = id;
}

openConfirm(id) {
    
  const modalRef = this.modalService.open(NgbdModalConfirm);
  
  modalRef.componentInstance.IdItem = id;
}

clearInput(): void{

  this.searchName='';
  this.searchDepartment='';
  
}

openViewDetails(user){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height="78%";
    dialogConfig.data=user;
    this.dialog.open(ProfilDetailsComponent, dialogConfig)
}

}

