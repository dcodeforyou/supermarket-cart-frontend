import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ReceiptComponent } from './receipt.component';
import { ReceiptService } from './receipt.service';

describe('ReceiptComponent', () => {
  let component: ReceiptComponent;
  let fixture: ComponentFixture<ReceiptComponent>;
  let receiptServiceMock: any;

  beforeEach(async () => {
    receiptServiceMock = {
      getReceipt: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ ReceiptComponent ],
      providers: [
        {
          provide: ReceiptService,
          useValue: receiptServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate receipt', () => {
    const receiptResponse = {
      "items": [
        {
          "productId": "5f9c29d5c6f72d001746a0c1",
          "name": "Product 1",
          "quantity": 2,
          "totalPrice": 20.5
        },
        {
          "productId": "5f9c29d5c6f72d001746a0c2",
          "name": "Product 2",
          "quantity": 3,
          "totalPrice": 30.75
        }
      ],
      "totalPriceAfterDiscount": 48.5,
      "userDetails": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "purchaseTimestamp": "2023-06-23T10:30:00.000Z"
    };


    jest.spyOn(receiptServiceMock, 'getReceipt').mockReturnValue(of(receiptResponse));
    fixture.detectChanges();
    expect(component.receiptData).toBe(receiptResponse);
  });

  it('should get error while getting receipt', () => {
    const errRes = new HttpErrorResponse({
      error: 'Unable to get receipt',
      statusText: 'Error'
    })
    jest.spyOn(console, 'error');
    jest.spyOn(receiptServiceMock, 'getReceipt').mockReturnValue(throwError(() => errRes));
    fixture.detectChanges();
    expect(console.error).toBeCalledWith(errRes);
  });
});
