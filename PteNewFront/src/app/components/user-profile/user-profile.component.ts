import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CvService } from 'src/app/services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { CertificationFormComponent } from './certification-form/certification-form.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import * as bcrypt from 'bcryptjs';



@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title"><strong>Change Password</strong></h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="activeModal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
    <div class="modal-body">
    <div class="modal-body">
	<div class="form-group">
	
		<input id="passwordInput" #passwordInput class="form-control"  placeholder="Enter your current password">

    
  </div>
</div>

</div>

		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="Verify()">Verifiy</button>
		</div>
	`,
})
export class NgbdModalContent {
  password: any; incorrectPAssword:boolean;
	constructor(public activeModal: NgbActiveModal,
    private router: Router,
    ) {}
    ngOnInit(){
      this.incorrectPAssword=false
    }
    Verify(){
      const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
      const passwordValue = passwordInput.value;
      const hashedPassword = '$2a$10$jzZp.56giu1YkgkfgCpOsOdNmxY0B9cFqfY5Z27C3pc.ZeInO.CU.';

      bcrypt.compare(passwordValue, hashedPassword, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }

        if (result) {
          this.activeModal.close()
          this.router.navigate(['/changepassword']);
          
        } else {
          console.log('Password is incorrect!');
          this.incorrectPAssword =true;
        }
      });
      }

  
}




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  myDate:Date;
  user:any[];
  selectedRole:any;
  formData = new FormData();
  roles: string[] = [];
  data: any = {};
  imageSrc:any;
  DateOfBirdthObj: any = {};
  HiringDateObj: any = {};
  hoveredItem: any;
  userAuth;
  

  @ViewChild('print-section', { static: false }) printSection: ElementRef;

  constructor(
              public userService :UserService,
              public authService : AuthService,
              public cvService : CvService, 
              private modalService: NgbModal,
              private dialog : MatDialog ,
              private router :Router,
              private route: ActivatedRoute,
             ) { }
  
  
  ngOnInit() :void{
    const id = this.route.snapshot.paramMap.get('id')

    this.userService.getUserByID(id).subscribe((resultData:any) =>{
    this.data = resultData as User[];
    this.imageSrc = 'http://localhost:3001/images/' +this.data.image;
    this.DateOfBirdthObj = new Date(this.data.DateOfBirth);
    this.HiringDateObj = new Date(this.data.hiringDate);
    
    if(id ==this.checkEmployee())
    this.userAuth =true;
    })
    
    
  }
  
  //selectiong dates
  SelectedDateOfBirdth =this.DateOfBirdthObj;
  SelectedHiringDate =this.HiringDateObj;

  onUpdate(d:any){
    
    this.userService.updateUser(this.data._id,d).subscribe(response=>
      {
      console.log(response)
      location.reload()
    })
  }
  
  AddExperience(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "36.5%";
    dialogConfig.height="75%";
    dialogConfig.data=this.data;
    this.dialog.open(ExperienceFormComponent, dialogConfig)
    }

  AddProject(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "36.5%";
    dialogConfig.height="60%";
    dialogConfig.data=this.data;
    this.dialog.open(ProjectFormComponent, dialogConfig)
    }

  AddCertification(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "36.5%";
    dialogConfig.height="50%";
    dialogConfig.data=this.data;
    this.dialog.open(CertificationFormComponent, dialogConfig)
  }

  AddEducation(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "36.5%";
    dialogConfig.height="65%";
    dialogConfig.data=this.data;
    this.dialog.open(EducationFormComponent, dialogConfig)
  }

  editImage(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "25%";
    dialogConfig.height="40%";
    dialogConfig.data=this.data;
    this.dialog.open(ProfileImageComponent, dialogConfig)
  }
  
  onDeleteItem(idCv,arrayName,itemId){
    this.cvService.deleteItem(idCv,arrayName,itemId).subscribe(resultat=>{
      this.router.navigateByUrl(`/user-profile/${this.data._id}`)
      .then(() => {
         window.location.reload();
      });
    })
    
  }

  editProfile(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "49%";
    dialogConfig.height="65%";
    dialogConfig.data=this.data;
    this.dialog.open(EditProfileComponent, dialogConfig)
  }

  downloadCv() {

    const noPrintElements = document.querySelectorAll('.no-print');
    
    
    
    noPrintElements.forEach(element => {
    
    element.remove();
    
    });
    
    
    
    
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    
    
    accordionItems.forEach(item => {
    
    const accordionButton = item.querySelector('.accordion-button') as HTMLButtonElement;
    
    accordionButton.click();
    
    })
    
    window.print();
    
    noPrintElements.forEach(element => {
    
    // Use the appendChild method to re-insert the element
    
    document.body.appendChild(element);
    
    });
    
    location.reload();

  }

  checkAdmin(){
    const role = this.authService.getAuthData().roles.includes('admin');
      return role;
  }

  checkEmployee(){
    return  this.authService.getAuthData().userId
  }
  
  isDrivingLicenseValid(): string {
    if(this.data.drivingLicense ==true){
      return "yes" ;
    }
    else{
      return "no"
    }
  
  }

  goToSettings() {

    const modalRef = this.modalService.open(NgbdModalContent);
  }
  


}
