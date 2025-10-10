import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest, LoginResponse } from '../../../models/auth.models';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormErrorService } from '../../../services/form-error.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public formErrorService: FormErrorService,
    private router: Router,
    private spinnerService: SpinnerService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void{
    if(this.loginForm.valid){


    this.spinnerService.show('login');

      const loginData: LoginRequest = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response: LoginResponse) => {
          this.router.navigate(['/dashboard']);
          console.log('Login successful', response);
        },
        error: (err: HttpErrorResponse) =>{
          this.spinnerService.hide('login');
          console.error('Login failed', err);
         this.formErrorService.applyBackendErrors(this.loginForm, err.error);
        }
      });
    }
  }

  loginWithGoogle() {
  window.location.href = 'https://localhost:7217/api/auth/google-login';
}

 loginWithFacebook() {
  window.location.href = 'https://localhost:7217/api/auth/facebook-login';
}
  
}
