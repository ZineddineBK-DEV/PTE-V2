import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private http: HttpClient ,) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError ('Something bad happened; please try again later.');
  }

  updateCV(id:any,data:any){
    return this.http.patch('http://localhost:3001/api/cv/update/'+id,data)
  }
  
  deleteItem(id:any,arrayName:any,itemId:any){
    return this.http.delete(`http://localhost:3001/api/cv/delete-item/${id}/${arrayName}/${itemId}`).pipe(
      catchError(this.handleError)
    )
  }
}
