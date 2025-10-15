import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { passwordStrengthValidator, passwordMatchValidator, emailValidator } from '../validators/register-validators';
import { RegisterRequest, RegisterResponse } from '../../../models/auth.models';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from '../../../services/form-error.service';
import { SpinnerService } from '../../../services/spinner.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  backendErrors : any = {};

  constructor(
    private fb: FormBuilder,
    public formErrorService: FormErrorService,
    public authService: AuthService,
    public spinnerService: SpinnerService,
    public notificationService: NotificationService,
    public router: Router ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['',[Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });
  }


  register(): void{
    this.formErrorService.removeAllBackendRrrors(this.registerForm);
    if(this.registerForm.valid){
      this.spinnerService.show('register');
      const registerData : RegisterRequest = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (response: RegisterResponse) => {
          console.log('Registration successful', response)
          this.notificationService.show('Registration successful! You can now log in with your credentials.', 'success');
          this.spinnerService.hide('register');
          setTimeout(() => {
            this.router.navigate(['login'])
          }, 3000);
          this.backendErrors = {};
        },
        error: (err: HttpErrorResponse) => {
           this.spinnerService.hide('register');
           console.error('Registration failed', err);
           this.formErrorService.applyBackendErrors(this.registerForm, err.error);
        }
      });
    }else{
      console.warn('Form is invalid');
      this.spinnerService.hide('register');
    }
  }

}