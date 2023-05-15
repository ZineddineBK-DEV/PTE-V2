import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import {map, OperatorFunction} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  dateStart: Date;
  selecteUserId: string;
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3001/api/users/getall');
  }

  updateUser(id: any, data: any) {

    return this.http.patch('http://localhost:3001/api/users/update/'+id, data);
  }

  deleteUser(id:string){
    return this.http.delete('http://localhost:3001/api/users/delete/'+id)
  }

  updateUserRoles(id:any,data:any){
    return this.http.patch('http://localhost:3001/api/users/update-roles/'+id,data,
    {
      headers: {
              Authorization: "Bearer ",
              "Content-Type": "application/json",
    }
    },
  )
}

  
getUserByID(id:any){
  return this.http.get('http://localhost:3001/api/users/'+id)
}
  setDateRange(dateStart: Date) {
    this.dateStart = dateStart;
    
  }
  setSelectedUserId(userId: string) {
    this.selecteUserId = userId;
  }
  
  getUserEvents(start: string, end: string , userId: string) {
    const startISO = new Date(start).toISOString().slice(0, 16); 
    const endISO = new Date(end).toISOString().slice(0, 16); 
    return this.http.get(`http://localhost:3001/api/users/events?start=${startISO}&end=${endISO}&engineer=${userId}`)
      .pipe(
        map((events: any[]) => {
          const acceptedEvents: EventInput[] = [];
          const rejectedEvents: EventInput[] = [];
  
          events.forEach(event => {
            const eventInput: EventInput = {
              title:event.title,
              applicant:event.applicant,
              id:event._id,
              start: event.start,
              end: event.end,
              engineer: event.engineer,
              job: event.job,
              address: event.address
              
            };
            console.log(eventInput)
            if (event.isAccepted) {
              acceptedEvents.push(eventInput);
            } else {
              rejectedEvents.push(eventInput);
            }
          });
  
          return { acceptedEvents, rejectedEvents };
        })as OperatorFunction<Object, { acceptedEvents: EventInput[]; rejectedEvents: EventInput[]; }>
      );
      
  }
}
