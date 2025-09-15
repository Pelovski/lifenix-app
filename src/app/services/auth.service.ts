import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  public register(registerData: RegisterRequest): Observable<RegisterResponse>{
    return this.api.post<RegisterResponse>('auth/register', registerData);
  }

  public login(loginData: LoginRequest): Observable<LoginResponse>{
    return this.api.post<LoginResponse>('auth/login', loginData);
  }
  
}
