import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';

describe('CartService', () => {
  let cartService: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });

    cartService = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should retrieve cart items', () => {
    const mockCartItems = [
      { id: '1', name: 'Product 1', price: 10 },
      { id: '2', name: 'Product 2', price: 20 },
    ];

    cartService.getCart().subscribe((response: any) => {
      expect(response).toEqual(mockCartItems);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/carts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCartItems);
  });

  it('should add item to cart', () => {
    const productId = '1';
    const quantity = 2;
    const mockResponse = { success: true };

    cartService.addToCart(productId, quantity).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/carts/items`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ productId, quantity });
    req.flush(mockResponse);
  });

  it('should get cart item', () => {
    const itemId = '1';
    const mockCartItem = { id: '1', name: 'Product 1', price: 10, quantity: 2 };

    cartService.getCartItem(itemId).subscribe((response: any) => {
      expect(response).toEqual(mockCartItem);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/carts/items/${itemId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCartItem);
  });

  it('should update cart item quantity', () => {
    const itemId = '1';
    const quantity = 3;
    const mockResponse = { success: true };

    cartService.updateCartItemQuantity(itemId, quantity).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/carts/items/${itemId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ quantity });
    req.flush(mockResponse);
  });

  it('should remove cart item', () => {
    const itemId = '1';
    const mockResponse = { success: true };

    cartService.removeCartItem(itemId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/carts/items/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should handle HTTP error in getCart method', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found' };

    cartService.getCart().subscribe(
      (response: any) => {
        expect(response).toBeFalsy();
      },
      (error: any) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/carts`);
    expect(req.request.method).toBe('GET');
    req.flush(null, mockErrorResponse);
  });

});
