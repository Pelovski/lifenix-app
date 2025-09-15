import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest, LoginResponse } from '../../../models/auth.models';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void{
    if(this.loginForm.valid){
      const loginData: LoginRequest = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful', response);
        },
        error: (err: HttpErrorResponse) =>{
          console.error('Login failed', err);
        }
      });
    }
  }
}
