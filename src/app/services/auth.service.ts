import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RegisterRequest, RegisterResponce } from '../models/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  public register(registerData: RegisterRequest): Observable<RegisterResponce>{
    return this.api.post<RegisterResponce>('auth/register', registerData);
  }
}
