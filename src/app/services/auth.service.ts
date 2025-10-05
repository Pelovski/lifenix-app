import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ForgotPasswordRequest, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordRequest, ValidateResetTokenRequest } from '../models/auth.models';
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

  forgotPassword(forgotPasswordData: ForgotPasswordRequest): Observable<void>{
    return this.api.post<void>('auth/forgot-password', forgotPasswordData);
  }

  resetPassword(resetPasswordData: ResetPasswordRequest): Observable<void>{
    return this.api.post<void>('auth/reset-password', resetPasswordData)
  }

  validateResetToken(validateResetTokenData: ValidateResetTokenRequest): Observable<void>{
    return this.api.post<void>('auth/validate-reset-token', validateResetTokenData)
  }
}
