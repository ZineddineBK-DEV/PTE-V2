
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WebScrapinService } from 'src/app/services/web-scrapin.service';
import { SendEmailComponent } from '../virtualisation/send-email/send-email.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  locationparam: string;
  domainparam:any;
  profiles:any;
  loading: boolean = false;
  conferenceRoomDescription: string;
  tableauStocke;
  currentPage = 1;
  itemsPerPage = 6;

  constructor(private http: HttpClient, private webScrapinService : WebScrapinService,private dialog : MatDialog,) {}


  ngOnInit() : void{

    this.tableauStocke = Object.values(JSON.parse(localStorage.getItem('profiles')));

    console.log("TableauStock :",this.tableauStocke)

  }
  

  async scrapeProfiles() {
    try {
      const data = {
        domainparam: this.domainparam,
        locationparam: this.locationparam 
      };
      const queryParams = new HttpParams({ fromObject: data });
  
      this.loading = true; // Set the loading flag to true before making the HTTP request
      
      const results: any = await this.http.get('http://127.0.0.1:5000/scrape-linkedin-profiles', { params: queryParams }).toPromise();
      this.profiles = results;
      localStorage.setItem('profiles', JSON.stringify(this.profiles));

      console.log(this.profiles);
    } catch (error) {
      console.error('Error scraping profiles:', error);
      // Handle the error as needed
    } finally {
      window.location.reload()
      //this.loading = false; 
    }
  }

  sendEmail(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height="60%";
    this.dialog.open(SendEmailComponent, dialogConfig)
  }
}
