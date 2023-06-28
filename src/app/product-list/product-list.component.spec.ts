import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CartService } from '../cart/cart.service';

import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let cartServiceMock: any;
  let productServiceMock: any;

  beforeEach(async () => {
    cartServiceMock = {
      addToCart: jest.fn()
    };
    productServiceMock = {
      getProducts: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceMock
        },
        {
          provide: CartService,
          useValue: cartServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get All products from service', () => {
    const productsResponse = [
      {
        _id: '1',
        name: 'Apple',
        price: 50,
        discount: {
          type: 'group',
          discountedPrice: 30,
          minimumQuantity: 5
        }
      },
      {
        _id: '2',
        name: 'Banana',
        price: 30,
        discount: {
          type: 'individual',
          discountedPrice: 25
        }
      }
    ];

    jest.spyOn(productServiceMock, 'getProducts').mockReturnValue(of(productsResponse));
    fixture.detectChanges();
    expect(component.products).toBe(productsResponse);
    
  });
  
  it('should get error from getCart', () => {
    const errRes = new HttpErrorResponse({
      error: 'No Products',
      statusText: 'zero products'
    })
    jest.spyOn(console, 'error');
    jest.spyOn(productServiceMock, 'getProducts').mockReturnValue(throwError(() => errRes));
    fixture.detectChanges();
    expect(console.error).toBeCalledWith(errRes);
  });

  it('should add product to cart ', () => {
    const product = {
        name: 'Apple',
        price: 50,
        quantity: 10,
        discount: {
          type: 'group',
          discountedPrice: 30,
          minimumQuantity: 5
        }
      };

    jest.spyOn(cartServiceMock, 'addToCart').mockReturnValue(of(product));
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, 'log');
    component.addToCart(product);
    const res = "Item added to cart:";
    expect(console.log).toBeCalledWith(res, product);
    
  });

  it('should should increment product quantity ', () => {
    const product = {
        name: 'Apple',
        price: 50,
        quantity: 10,
        discount: {
          type: 'group',
          discountedPrice: 30,
          minimumQuantity: 5
        }
      };

    component.incrementQuantity(product);
    expect(product.quantity).toBe(11);

    const productWithNoQuantity = {
      name: 'Apple',
      price: 50,
      quantity: undefined,
      discount: {
        type: 'group',
        discountedPrice: 30,
        minimumQuantity: 5
      }
    };
    component.incrementQuantity(productWithNoQuantity);
    expect(productWithNoQuantity.quantity).toBe(1);
    
  });

  it('should should decrement product quantity ', () => {
    const product = {
        name: 'Apple',
        price: 50,
        quantity: 10,
        discount: {
          type: 'group',
          discountedPrice: 30,
          minimumQuantity: 5
        }
      };

    component.decrementQuantity(product);
    expect(product.quantity).toBe(9);
    
  });

  it('should should get product quantity ', () => {
    const product = {
        name: 'Apple',
        price: 50,
        quantity: 10,
        discount: {
          type: 'group',
          discountedPrice: 30,
          minimumQuantity: 5
        }
      };

    component.getQuantity(product);
    expect(product.quantity).toBe(10);
    
  });


});
