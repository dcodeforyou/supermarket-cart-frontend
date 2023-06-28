import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    }
    service = new CartService(httpClientSpy);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart items', (done) => {
    const itemsMock = [
      {
        _id: '_id123',
        productId: 'product123',
        name: 'product-name',
        quantity: 2,
        totalPrice: 100,
      }
    ];

    const cartResponse = {
      user: 'exampleuser',
      timestamp: '2022-05-03T10:25:36.000Z',
      totalPrice: 150,
      items: itemsMock,
      shippingAddress: '123 Street, City',
      paymentMethod: 'Credit Card',
      status: 'Pending',
    };
    
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(cartResponse));

    service.getCart().subscribe(
      {
        next: data => {
          expect(data).toEqual(cartResponse);
          done();
        },
        error: err => console.log(err)
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
  });

  it('should test getCart thrown error', (done) => {
    const errRes = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errRes));

    service.getCart().subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('test 404 error');
          done();
        }
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
  });

  it('should add an item to the cart', (done) => {
    const itemsMock = [
      {
        _id: '_id123',
        productId: 'product123',
        name: 'product-name',
        quantity: 2,
        totalPrice: 100,
      }
    ];

    const cartResponse = {
      user: 'exampleuser',
      timestamp: '2022-05-03T10:25:36.000Z',
      totalPrice: 150,
      items: itemsMock,
      shippingAddress: '123 Street, City',
      paymentMethod: 'Credit Card',
      status: 'Pending',
    };
    
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(cartResponse));

    service.addToCart(itemsMock[0].productId, 2).subscribe(
      {
        next: data => {
          expect(data).toEqual(cartResponse);
          done();
        },
        error: err => console.log(err)
      }
    );
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });

  it('should update quantity of an item to the cart', (done) => {
    const itemsMock = [
      {
        _id: '_id123',
        productId: 'product123',
        name: 'product-name',
        quantity: 3,
        totalPrice: 100,
      }
    ];
    
    jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(itemsMock));

    service.updateCartItemQuantity(itemsMock[0].productId, 3).subscribe(
      {
        next: data => {
          expect(data).toEqual(itemsMock);
          done();
        },
        error: err => console.log(err)
      }
    );
    expect(httpClientSpy.put).toBeCalledTimes(1);
  });


  it('should delete an item from the cart', (done) => {
    const itemsMock = [
      {
        _id: '_id123',
        productId: 'product123',
        name: 'product-name',
        quantity: 2,
        totalPrice: 100,
      }
    ];

    const cartResponse = {
      user: 'exampleuser',
      timestamp: '2022-05-03T10:25:36.000Z',
      totalPrice: 150,
      items: [],
      shippingAddress: '123 Street, City',
      paymentMethod: 'Credit Card',
      status: 'Pending',
    };
    
    jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(cartResponse));

    service.removeCartItem(itemsMock[0].productId).subscribe(
      {
        next: data => {
          expect(data).toEqual(cartResponse);
          done();
        },
        error: err => console.log(err)
      }
    );
    expect(httpClientSpy.delete).toBeCalledTimes(1);
  });

  it('should test removeItemFromCart thrown error', (done) => {
    const errRes = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Not Added'
    });
    
    jest.spyOn(httpClientSpy, 'delete').mockReturnValue(throwError(() => errRes));

    service.removeCartItem('product123').subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('test 500 error');
          done();
        }
      }
    );
    expect(httpClientSpy.delete).toBeCalledTimes(1);
  });
});
