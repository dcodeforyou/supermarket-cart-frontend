import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CartService } from './cart/cart.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpClientSpy: any;
  let cartServiceMock: any;

  beforeEach(async () => {
    httpClientSpy = {
      get: jest.fn()
    };

    cartServiceMock = {
      cartItemCount$: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        },
        {
          provide: CartService,
          useValue: cartServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
