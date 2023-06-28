import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carts';
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initCartItemCount();
  }

  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((data: any) => console.log('cart items', data)),
      catchError(this.handleError('Failed to get cart'))
    );
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const payload = { productId, quantity };
    const url = `${this.apiUrl}/items`;
    return this.http.post<any>(url, payload).pipe(
      tap((data: any) => this.updateCartItemCount())
    );
  }

  getCartItem(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items/${productId}`);
  }

  updateCartItemQuantity(itemId: string, quantity: number): Observable<any> {
    const payload = { quantity };
    const url = `${this.apiUrl}/items/${itemId}`;
    return this.http.put<any>(url, payload).pipe(
      tap((data: any) => this.updateCartItemCount())
    );
  }

  removeCartItem(itemId: string): Observable<any> {
    const url = `${this.apiUrl}/items/${itemId}`;
    return this.http.delete<any>(url).pipe(
      tap((data: any) => this.updateCartItemCount()),
      catchError(this.handleError('Failed to delete item'))
    );
  }

  private initCartItemCount(): void {
    this.http.get<{count: number}>(`${this.apiUrl}/count`).subscribe(res => {
      console.log(res)
      this.cartItemCountSubject.next(res.count);
    }, error => {
      console.error('Failed to retrieve cart item count:', error);
    });
  }

  public updateCartItemCount(): void {
    this.http.get<{count: number}>(`${this.apiUrl}/count`)
    .subscribe(res => {
      this.cartItemCountSubject.next(res.count);
    });
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
