import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TechnicalTeamService } from 'src/app/services/technical-team.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  events : any [] ;
  event ;
  imageSrc;
  dateStart:any ; dateEnd :any;
  timeStart:any; timeEnd :any;
   body = {
    isAccepted: "true"
  };

  constructor( private technicianService : TechnicalTeamService,
    private authService : AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      console.log('data :',this.data)
                 
}

ngOnInit() : void{
  this.technicianService.getTechnicianEvents(this.data.engineer).subscribe((resultData:any) =>{
    this.events = resultData;
    console.log('events ',this.events)

    this.event = this.events.filter(item => item._id === this.data._id);

    const dateObjStart = new Date(this.event[0].start);
    this.dateStart = dateObjStart.toISOString().substr(0, 10);
    this.timeStart = dateObjStart.toISOString().substr(11, 5);

    const dateObjEnd = new Date(this.event[0].end);
    this.dateEnd = dateObjEnd.toISOString().substr(0, 10);
    this.timeEnd = dateObjEnd.toISOString().substr(11, 5);



    this.imageSrc = 'http://localhost:3001/images/' +this.event[0].applicant.image;
  });
  console.log(this.data)
}


acceptEvent(){
  this.technicianService.confirmTechnicianEvent(this.data._id,this.body).subscribe(resultat=>{
    location.reload();
  })
}

deleteEvent(id:any){
  this.technicianService.deleteTechninicanEvent(id).subscribe(resultat=>{
    location.reload();
  })
}  

checkAdmin(){
  const role = this.authService.getAuthData().roles.includes('admin');
    return role;
}
}
