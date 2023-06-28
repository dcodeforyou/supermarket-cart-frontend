import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] | undefined;
  cartTotal: number | undefined;
  loading: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe(
      (response) => {
        console.log(response);
        this.cartItems = response.items;
        this.cartTotal = response.totalPrice;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateQuantity(item: any, quantity: number) {
    if (quantity > 0) {
      this.loading = true;
      this.cartService.updateCartItemQuantity(item._id, quantity).pipe( finalize(() => this.loading = false)).subscribe(
        (response) => {
          console.log('Item quantity updated:', response);
          this.getCart();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: any) {
    this.loading = true;
    this.cartService.removeCartItem(item._id).pipe( finalize(() => this.loading = false)).subscribe(
      (response) => {
        console.log('Item removed from cart:', response);
        this.getCart();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  checkout() {
    // Implement your checkout logic here
    console.log('Checkout');
    this.router.navigate(['/receipt']);
  }
}
