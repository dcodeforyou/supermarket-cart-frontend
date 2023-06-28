import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService) {
    
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().pipe(
      catchError((error: any) => {
        console.error(error);
        return of([]);
      })
    ).subscribe(
      (response: any[]) => {
        this.products = response;
        const cartItemRequests = this.products.map((product: any) =>
          this.cartService.getCartItem(product._id).pipe(
            catchError((error: any) => {
              return of({ quantity: 0 });
            }),
            map((cartItem: any) => ({
              ...product,
              quantity: cartItem.quantity || 0,
            }))
          )
        );
        forkJoin(cartItemRequests).subscribe(
          (productsWithQuantity: any[]) => {
            this.products = productsWithQuantity;
          }
        );
      }
    );
  }
  

  incrementQuantity(product: any) {
    product.quantity = product.quantity ? product.quantity + 1 : 1;
  }

  decrementQuantity(product: any) {
    if (product.quantity && product.quantity > 0) {
      product.quantity--;
    }
  }

  getQuantity(product: any) {
    return product.quantity || 0;
  }

  addToCart(product: any) {
    if (product.quantity && product.quantity > 0) {
      this.loading = true;
      this.cartService.addToCart(product._id, product.quantity).pipe( finalize(() => this.loading = false)).subscribe(
        (response) => {
          console.log('Item added to cart:', response);
          alert(`${product.name} added to cart`);
          // Reset the quantity
          // product.quantity = 0;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  
}
