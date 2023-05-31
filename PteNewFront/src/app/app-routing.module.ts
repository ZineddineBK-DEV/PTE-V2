
import { LoginComponent } from './components/login/login.component';
import { NgModule} from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { VerificationcodeComponent } from './components/verificationcode/verificationcode.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { SignUpRequestsComponent } from './components/sign-up-requests/sign-up-requests.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

import { RoleGuard } from './role.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TechnicalTeamComponent } from './components/technical-team/technical-team.component';
import { VirtualisationComponent } from './components/virtualisation/virtualisation.component';

const routes:  Routes = [
  { path: 'signup',     component: SignupComponent },
  { path: 'login',     component: LoginComponent },
  
  { path : 'verificationcode' , component:VerificationcodeComponent },
  { path : 'changepassword' , component:ChangepasswordComponent},
  {path : 'dashboard' ,canActivate:[AuthGuard], component:DashboardComponent},
  { path :'conference-rooms',canActivate:[AuthGuard], component:RoomsComponent},
  { path: 'requests',canActivate:[AuthGuard,RoleGuard] ,component: SignUpRequestsComponent},
  { path :'user-profile/:id',canActivate:[AuthGuard], component:UserProfileComponent},
  {path : 'user-management',canActivate:[AuthGuard,RoleGuard] , component:UserManagementComponent},
  {path : 'vehicles',canActivate:[AuthGuard], component:VehiclesComponent},
  {path : 'technical team' ,canActivate:[AuthGuard],component:TechnicalTeamComponent},
  {path : 'virtualisation' ,canActivate:[AuthGuard],component:VirtualisationComponent},
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
 
  // {
  //   path: '',
  //   canActivate:[AuthGuard],
  //   component: AppComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: () => import('./app.module').then(m => m.AppModule),
  //   }]
  // }
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
