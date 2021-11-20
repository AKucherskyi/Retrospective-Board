import { FbAuthResponse } from './../shared/interfaces';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()
  public username$: BehaviorSubject<string> = new BehaviorSubject<string>('Anonymous')

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    ).pipe(
      tap((response) => {
        this.setToken(response as FbAuthResponse)
      }),
      catchError(this.handleError.bind(this))
    )
  }

  register(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
    .pipe(
      tap((response) => {
        this.setToken(response as FbAuthResponse)
      }),
      catchError(this.handleError.bind(this))
    )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated() {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_PASSWORD':
          this.error$.next('Неверный пароль')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break;
    }
    return throwError(error);
  }

}
