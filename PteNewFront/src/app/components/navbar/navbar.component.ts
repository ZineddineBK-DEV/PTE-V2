import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    
  id;user;imageSrc
  constructor(private router: Router,
              private authService : AuthService,
              private modalService: NgbModal,
              private userService : UserService) {
                
  }

  ngOnInit() :void{
    

    this.userService.getUserByID(localStorage.getItem("userId")).subscribe((resultData:any) =>{
    this.user = resultData as User[];
    this.imageSrc = 'http://localhost:3001/images/' +this.user.image;
    
    
    })
  }
  



  goToSettings() {

    const modalRef = this.modalService.open(NgbdModalContent);
  }

  goToProfile() {

     
    this.router.navigate(['/user-profile/',this.user._id]);
  }

  logout() {
    
    this.authService.logout()
  }



  

}
