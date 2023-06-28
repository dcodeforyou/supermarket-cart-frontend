import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { CartComponent } from './cart.component';
import { CartService } from './cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: any;
  

  beforeEach(async () => {
    cartServiceMock = {
      getCart: jest.fn(),
      updateCartItemQuantity: jest.fn(),
      removeCartItem: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [
        {
          provide: CartService,
          useValue: cartServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Cart Items from service', () => {
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

    jest.spyOn(cartServiceMock, 'getCart').mockReturnValue(of(cartResponse));
    fixture.detectChanges();
    expect(component.cartItems).toBe(itemsMock);
    expect(component.cartTotal).toBe(cartResponse.totalPrice);
    
  });

  it('should get error from getCart', () => {
    const errRes = new HttpErrorResponse({
      error: 'Empty',
      status: 500,
      statusText: 'Cart Empty'
    })
    jest.spyOn(console, 'error');
    jest.spyOn(cartServiceMock, 'getCart').mockReturnValue(throwError(() => errRes));
    fixture.detectChanges();
    expect(console.error).toBeCalledWith(errRes);
  });

  it('should update quantity of Cart Item', () => {
    const itemsMock = [
      {
        _id: '_id123',
        productId: 'product123',
        name: 'product-name',
        quantity: 3,
        totalPrice: 150,
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

    jest.spyOn(cartServiceMock, 'updateCartItemQuantity').mockReturnValue(of(cartResponse));
    jest.spyOn(cartServiceMock, 'getCart').mockReturnValue(of(cartResponse));
    component.updateQuantity(itemsMock[0], 3);
    expect(component.cartItems).toBe(itemsMock);
    expect(component.cartTotal).toBe(cartResponse.totalPrice);
    
  });

  it('should get error from updateQuantity', () => {
    const errRes = new HttpErrorResponse({
      error: 'Unable to update quantity',
      status: 404,
      statusText: 'Error'
    })
    jest.spyOn(console, 'error');
    jest.spyOn(cartServiceMock, 'updateCartItemQuantity').mockReturnValue(throwError(() => errRes));
    component.updateQuantity({}, 1);
    expect(console.error).toBeCalledWith(errRes);
  });

  it('should update quantity of Cart Item', () => {
    const deletedItem = {
      _id: '_id123',
        productId: 'product123',
        name: 'product-name',
        quantity: 3,
        totalPrice: 150,
    }

    const cartResponse = {
      user: 'exampleuser',
      timestamp: '2022-05-03T10:25:36.000Z',
      totalPrice: 0,
      items: [],
      shippingAddress: '123 Street, City',
      paymentMethod: 'Credit Card',
      status: 'Pending',
    };

    jest.spyOn(cartServiceMock, 'removeCartItem').mockReturnValue(of(deletedItem));
    jest.spyOn(cartServiceMock, 'getCart').mockReturnValue(of(cartResponse));
    component.removeFromCart(deletedItem);
    expect(component.cartItems).toEqual([]);
    expect(component.cartTotal).toBe(cartResponse.totalPrice);
    
  });

  it('should get error from updateQuantity', () => {
    const errRes = new HttpErrorResponse({
      error: 'Unable to delete item',
      status: 404,
      statusText: 'Error'
    })
    jest.spyOn(console, 'error');
    jest.spyOn(cartServiceMock, 'removeCartItem').mockReturnValue(throwError(() => errRes));
    component.removeFromCart({});
    expect(console.error).toBeCalledWith(errRes);
  });
});
