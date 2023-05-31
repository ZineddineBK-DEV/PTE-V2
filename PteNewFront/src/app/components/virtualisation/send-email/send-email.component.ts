import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VirtualisationService } from 'src/app/services/virtualisation.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {

  constructor(private dialog : MatDialog,
    private virtualisationService : VirtualisationService,
    private modalService: NgbModal,
    ){

}

  submit(emailForm :any){
    //console.log(emailForm)
    this.virtualisationService.sendEmail(emailForm).subscribe()
    window.location.reload()
  }
}
