import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPipe } from './pipes/search.pipe';

import { ManageUserEventComponent } from './components/users/manage-user-event/manage-user-event.component';
import { UserEventComponent } from './components/users/user-event/user-event.component';
import { AddcarComponent } from './components/vehicles/addcar/addcar.component';
import { EditVehicleComponent } from './components/vehicles/edit-vehicle/edit-vehicle.component';
import { EventformComponent } from './components/vehicles/eventform/eventform.component';
import { ManageComponent } from './components/vehicles/manage/manage.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignUpRequestsComponent } from './components/sign-up-requests/sign-up-requests.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VerificationcodeComponent } from './components/verificationcode/verificationcode.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//modules
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//material
import { DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
// import { MaterialModule } from './components/material/material/material.module';
//service
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CertificationFormComponent } from './components/user-profile/certification-form/certification-form.component';
import { EditProfileComponent } from './components/user-profile/edit-profile/edit-profile.component';
import { EducationFormComponent } from './components/user-profile/education-form/education-form.component';
import { ExperienceFormComponent } from './components/user-profile/experience-form/experience-form.component';
import { ProfileImageComponent } from './components/user-profile/profile-image/profile-image.component';
import { ProjectFormComponent } from './components/user-profile/project-form/project-form.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { EditRoleComponent } from './components/user-management/edit-role/edit-role.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AddRoomComponent } from './components/rooms/add-room/add-room.component';
import { EventDtailsComponent } from './components/rooms/event-details/event-details.component';
import { RoomEventsComponent } from './components/rooms/room-event/room-event.component';
import { TechnicalTeamComponent } from './components/technical-team/technical-team.component';
import { EventDetailsComponent } from './components/technical-team/event-details/event-details.component';
import { TechnicianEventComponent } from './components/technical-team/technician-event/technician-event.component';
import { VirtualisationComponent } from './components/virtualisation/virtualisation.component';
import { VirtualisationEventComponent } from './components/virtualisation/virtualisation-event/virtualisation-event.component';
import { VirtualisationDetailsComponent } from './components/virtualisation/virtualisation-details/virtualisation-details.component';
import { SendEmailComponent } from './components/virtualisation/send-email/send-email.component';
import { ProfilDetailsComponent } from './components/sign-up-requests/profil-details/profil-details.component';
import { EmployeeDetailsComponent } from './components/user-management/employee-details/employee-details.component';
import { TechnicianDetailsComponent } from './components/technical-team/technician-details/technician-details.component';
import { TechnicianUpdateComponent } from './components/technical-team/technician-update/technician-update.component';
import { AddTechnicianComponent } from './components/technical-team/add-technician/add-technician.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';





@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
  
  
    
    SignupComponent,
  
    VehiclesComponent,
    SidebarComponent,
    UsersComponent,
    ErrorDialogComponent,
    SignUpRequestsComponent,
    ConfirmationDialogComponent,
    ChangepasswordComponent,
    NavbarComponent,
    LoginComponent,
    ManageUserEventComponent,
    UserEventComponent,
    AddcarComponent,
    EditVehicleComponent,
    EventformComponent,
    ManageComponent,
    VerificationcodeComponent,
    UserProfileComponent,
    CertificationFormComponent,
    EditProfileComponent,
    EducationFormComponent,
    ExperienceFormComponent,
    ProfileImageComponent,
    ProjectFormComponent,
    UserManagementComponent,
    EditRoleComponent,
    DashboardComponent,
    RoomsComponent,
    AddRoomComponent,
    RoomEventsComponent,
    EventDtailsComponent,
    TechnicalTeamComponent,
    EventDetailsComponent,
    TechnicianEventComponent,
    VirtualisationComponent,
    VirtualisationEventComponent,
    VirtualisationDetailsComponent,
    SendEmailComponent,
    ProfilDetailsComponent,
    EmployeeDetailsComponent,
    TechnicianDetailsComponent,
    TechnicianUpdateComponent,
    AddTechnicianComponent,
    NewPasswordComponent
    

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    NgbModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DateTimePickerModule,
    MdbCheckboxModule,
    BsDropdownModule
  
    
    
    
    
    
    
  ],
  exports:[MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    
    ],
  providers: [AuthService,DatePipe, 
    { 
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
