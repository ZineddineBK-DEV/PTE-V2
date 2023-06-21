import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MatSnackBar]


})
export class LoginComponent implements OnInit {
    showSuccessLogin =false;
    loginFailed=false;
    loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  
    constructor(private authService: AuthService,private router:Router , private http:HttpClient , private snackBar: MatSnackBar){}

    ngOnInit() {
    
    }

  onSubmit(){

    const token=this.authService.loginUser(this.loginForm.value);
    if(token){
      this.loginFailed=false;
      this.showSuccessLogin=true;
      this.router.navigate(['/dashboard']);
    }else{
      this.loginFailed=true;
    
    }
  }
   
  forgotPassword() {
    const email = this.loginForm.get('email').value;
    this.authService.forgotPassword(email).subscribe(
      (data) => {
        this.http.post("http://localhost:3001/api/users/forgotPassword", {email});
        console.log('Password reset code sent successfully');
        
      },
      (error) => {
        console.log(error);
        
      });    
      this.router.navigate(['/verificationcode'], { queryParams: { email } });
}}
    

