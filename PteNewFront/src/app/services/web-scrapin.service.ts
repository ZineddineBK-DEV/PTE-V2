import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebScrapinService {

    private backendUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  
  scrapeLinkedInProfiles(domainParam: string, locationParam: string) {
    const url = `${this.backendUrl}/scrape-linkedin-profiles?domain=${domainParam}&location=${locationParam}`;
    return this.http.get(url);
  }


}
