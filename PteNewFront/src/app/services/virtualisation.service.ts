import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VirtualisationService {

  constructor(private http: HttpClient) {}


 


  // *** Virtualisation events ***

  setVirtualisationEvent(data:any){
    return this.http.post('http://localhost:3001/api/material/virtualization/setevent/', data);
  }

  getVirtualisationEvents(){
    return this.http.get('http://localhost:3001/api/material/virtualization/getEvents');
  }

  
  deleteEvent(id:any){
    return this.http.delete('http://localhost:3001/api/material/virtualization/deleteVirtEnv/'+ id);
  }

  confirmEvent(id:any){
    return this.http.patch('http://localhost:3001/api/material/virtualization/acceptEvent/'+id,{});
  }

  sendEmail(data:any){
    return this.http.post('http://localhost:3001/api/material/virtualization/sendEmail/', data);
  }
}
