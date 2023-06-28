import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private apiUrl = `${environment.apiUrl}/receipt`;

  constructor(private http: HttpClient) { }

  getReceipt() {
    return this.http.get(`${this.apiUrl}`).pipe(
      tap((data: any) => console.log('receipt generated', data)),
      catchError(this.handleError('Failed to get receipt'))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // send err to remote logging remote infra
      console.error(error);

      const message = `server returned code ${error.status} with body ${error.error}`;
      throw new Error(`${operation} failed: ${message}`);
    }
  }
}
