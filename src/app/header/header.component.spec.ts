import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { SnackBarService } from './../shared/snack-bars/snack-bar.service';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RouterStub {
  navigate(path: string[]) {}
}

class ActivatedRouteStub {
  queryParams!: Observable<Params>;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, MatMenuModule, MatSnackBarModule],
      providers: [
        AuthService,
        SnackBarService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should open snackbar if query param authFailed = true', () => {
    let snackBarService = TestBed.inject(SnackBarService);
    let route = TestBed.inject(ActivatedRoute);
    let spy = spyOn(snackBarService, 'openSnackBar');

    route.queryParams = of({ authFailed: true });
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('AUTH');
  });

  it('should navigate to /login on logout method ', () => {
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');
    component.logout();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
});
