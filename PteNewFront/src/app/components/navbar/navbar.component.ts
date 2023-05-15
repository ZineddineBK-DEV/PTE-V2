import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    
  id;user;imageSrc
  constructor(private router: Router,
              private authService : AuthService,
              private userService : UserService) {
                
  }

  ngOnInit() :void{
    

    this.userService.getUserByID(localStorage.getItem("userId")).subscribe((resultData:any) =>{
    this.user = resultData as User[];
    this.imageSrc = 'http://localhost:3001/images/' +this.user.image;
    
    
    
    })
    
    
  }
  



  goToSettings() {
    // Handle the settings action
    this.router.navigate(['/settings']);
  }

  goToProfile() {

     
    this.router.navigate(['/user-profile/',this.user._id]);
  }

  logout() {
    // Handle the logout action
    this.router.navigate(['/login']);
  }



  



}
