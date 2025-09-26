import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.models';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  public register(registerData: RegisterRequest): Observable<RegisterResponse>{
    return this.api.post<RegisterResponse>('auth/register', registerData);
  }

  public login(loginData: LoginRequest): Observable<LoginResponse>{
    return this.api.post<LoginResponse>('auth/login', loginData, {withCredentials: true });
  }

  public logout(): Observable<any>{
    return this.api.post<any>('auth/logout', {}, {withCredentials: true});
  }

  checkStatus(): Observable<boolean>{
    return this.api.get('auth/status', {withCredentials: true}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
