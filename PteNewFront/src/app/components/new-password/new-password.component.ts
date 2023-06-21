import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {


  id:any;
  email: string;
  user;
  FormPw: FormGroup;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient, 
              private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.FormPw = this.formBuilder.group({
      password: ['', Validators.required]
    });

    this.userService.getUserByID(localStorage.getItem("userId")).subscribe((resultData:any) =>{
      this.user = resultData;
    })

    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id')!;
      console.log(this.id);

      this.http.post<any>(`http://localhost:3001/api/users/changePswdAutorisation/${this.id}`, {}).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      ); 
    });
  }

  onSubmit() {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email')!;
      console.log(this.id);

      const password = this.FormPw.value.password;

      const body = {
        email: this.user.email,
        password: password,
        id: this.user._id,
      };
      console.log(body)
      this.http.patch<any>(`http://localhost:3001/api/users/change-psw/${this.user._id}`, body).subscribe(
        response => console.log(response),
        error => console.log(error)
      );

      this.router.navigate(['/user-profile/'+this.user._id]);
    });
  }
}
