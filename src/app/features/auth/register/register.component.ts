import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { passwordStrengthValidator, passwordMatchValidator } from '../validators/register-validators';
import { RegisterRequest, RegisterResponse } from '../../../models/auth.models';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from '../../../services/form-error.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, public formErrorService: FormErrorService, public authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });
  }

  get username() { return this.registerForm.get('username'); }
  get email() {return this.registerForm.get('email'); }
  get password(){return this.registerForm.get('password'); }
  get confirmPassword() {return this.registerForm.get('confirmPassword'); }

  register(): void{
    if(this.registerForm.valid){
      const registerData : RegisterRequest = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (response: RegisterResponse) => {
          console.log('Registration successful', response)
        },
        error: (err: HttpErrorResponse) => {
           console.error('Registration failed', err);
        }
      });
    }else{
      console.warn('Form is invalid');
    }
  }

}