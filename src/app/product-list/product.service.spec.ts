import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    }
    service = new ProductService(httpClientSpy);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', (done) => {
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
    ];;
    
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(productsResponse));

    service.getProducts().subscribe(
      {
        next: data => {
          expect(data).toEqual(productsResponse);
          done();
        },
        error: err => console.log(err)
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
  });

  it('should test getProducts thrown error', (done) => {
    const errRes = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errRes));

    service.getProducts().subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('test 404 error');
          done();
        }
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
  })
});
