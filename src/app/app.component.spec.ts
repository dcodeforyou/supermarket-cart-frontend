import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpClientSpy: any;

  beforeEach(async () => {
    httpClientSpy = {
      get: jest.fn()
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
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should get current user`, () => {
    const res = {
      user: "New User"
    };
    expect(component.currentUser).toBe("Current User");

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    fixture.detectChanges();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(component.currentUser).toBe(res.user);
  });
});
