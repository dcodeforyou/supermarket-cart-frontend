import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((data: any) => console.log('receipt generated', data)),
      catchError(this.handleError('Failed to get receipt'))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // send err to remote logging remote infra
      console.error(error);

      const message = `server returned code ${error.status} with body ${error.error}`;
      // better job for transfering data for user consumption
      throw new Error(`${operation} failed: ${message}`);
    }
  }
}
