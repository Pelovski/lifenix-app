import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { passwordStrengthValidator, passwordMatchValidator, emailValidator } from '../validators/register-validators';
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
  backendErrors : any = {};

  constructor(private fb: FormBuilder, public formErrorService: FormErrorService, public authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['',[Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });
  }


  register(): void{
    if(this.registerForm.valid){
      const registerData : RegisterRequest = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (response: RegisterResponse) => {
          console.log('Registration successful', response)
          this.backendErrors = {};
        },
        error: (err: HttpErrorResponse) => {
           console.error('Registration failed', err);
           this.formErrorService.applyBackendErrors(this.registerForm, err.error);
        }
      });
    }else{
      console.warn('Form is invalid');
    }
  }

}