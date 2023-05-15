import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Profile deletion</h4>
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
        <strong>Are you sure you want to delete this profile ?</strong>
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
    private userService: UserService,) {}


  OkayDelete(){
    
    console.log(this.IdItem)
    this.userService.deleteUser(this.IdItem).subscribe(resultat=>{
      
      this.showNotification('bottom', 'center',"Profile deleted")
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
 
  selector: 'user-management-list',

  templateUrl: './user-management.component.html' ,
  styleUrls: ['./user-management.component.css']
})


export class UserManagementComponent implements OnInit, AfterViewInit{

  // @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  // @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;

  elements: any = [];
  previous: any = [];
  p: number = 1;
  headElements = ['ID', 'First', 'Last', 'Handle'];

  searchName;searchDepartment;searchTitle
  users: any;
  isHovered;

  constructor(private userService: UserService,
    private authService :AuthService,
    private dialog : MatDialog ,
    private modalService: NgbModal,
    private router :Router) {}
  
  
  
  ngOnInit() : void{
    this.userService.getData().subscribe((resultData:any) =>{
      this.users = resultData as User[];
      console.log("*** users ***")
      console.log(this.users);
    })
    
  }
  

  ngAfterViewInit() {
  }

  clearInput(): void{

    this.searchName='';
    this.searchDepartment='';
    this.searchTitle='';
  }
  
  onEditRole(user){
    this.router.navigate(['/user-profile']);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "30%";
    dialogConfig.height="35%";
    dialogConfig.data=user;
    this.dialog.open(EditRoleComponent, dialogConfig)
  }
  
  
  checkAdmin(){
    const role = this.authService.getAuthData().roles.includes('admin');
      return role;
  }
  
  open(id) {
    
    const modalRef = this.modalService.open(NgbdModalContent);
    
    modalRef.componentInstance.IdItem = id;
  }

}
