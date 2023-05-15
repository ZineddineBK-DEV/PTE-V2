import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  id: string;
  email: string;

  FormPw: FormGroup;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient, 
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.FormPw = this.formBuilder.group({
      password: ['', Validators.required]
    });

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
        email: this.email,
        password: password,
        id: this.id,
      };

      this.http.patch<any>(`http://localhost:3001/api/users/change-psw/${this.id}`, body).subscribe(
        response => console.log(response),
        error => console.log(error)
      );

      this.router.navigate(['/login']);
    });
  }
}
