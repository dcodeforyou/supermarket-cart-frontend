import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currentUser: String = 'Current User';
  cartItemCount: number = 0;

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.getCurrentUser();
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  getCurrentUser() {
    
    this.http.get(`${this.apiUrl}/current`).subscribe(
      (response: any) => {
        this.currentUser = response.user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
}
