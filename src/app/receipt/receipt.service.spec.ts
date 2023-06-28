import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ReceiptService } from './receipt.service';

describe('ReceiptService', () => {
  let service: ReceiptService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    }
    service = new ReceiptService(httpClientSpy);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get receipt data', (done) => {
    const res = {
      "items": [
        {
          "name": "Product 1",
          "quantity": 2,
          "totalPrice": 10
        },
        {
          "name": "Product 2",
          "quantity": 3,
          "totalPrice": 15
        }
      ],
      "totalPriceAfterDiscount": 20,
      "userDetails": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "timestamp": "2023-06-23T14:30:00.000Z"
    };
    
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));

    service.getReceipt().subscribe(
      {
        next: data => {
          expect(data).toEqual(res);
          done();
        },
        error: err => console.log(err)
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
  });

  it('should test getReceipt thrown error', (done) => {
    const errRes = new HttpErrorResponse({
      error: 'test 404 error',
      status: 400,
      statusText: 'Not Found'
    });
    
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errRes));

    service.getReceipt().subscribe(
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
