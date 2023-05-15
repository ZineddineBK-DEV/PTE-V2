import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TechnicalTeamService {

  constructor( private http: HttpClient) { }

  getTechnicians(){
    return this.http.get('http://localhost:3001/api/users/getall');
  }

  getTechnicianEvents(tech :any){
    return this.http.get('http://localhost:3001/api/users/events?engineer='+tech);
  }

  setTechnicianEvent(data :any){
    return this.http.post('http://localhost:3001/api/users/setevent/', data);
  }

  deleteTechninicanEvent(id :any){
    return this.http.delete('http://localhost:3001/api/users/deleteEvent/' + id);
  }

  confirmTechnicianEvent(id:any,data:any){
    return this.http.patch('http://localhost:3001/api/users/acceptEvent/'+id, data);
  }

}
