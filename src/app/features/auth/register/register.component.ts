import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest, RegisterResponce } from '../../../models/auth.models';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormErrorService } from '../../../services/form-error.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, public formErrorService: FormErrorService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  get username() { return this.registerForm.get('username'); }
  get email() {return this.registerForm.get('email'); }
  get password(){return this.registerForm.get('password'); }
  get confirmPassword() {return this.registerForm.get('confirmPassword'); }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPasswordControl = group.get('confirmPassword');

  if (!confirmPasswordControl) return null;

  const mismatch = password !== confirmPasswordControl.value;

  if (mismatch) {
    confirmPasswordControl.setErrors({ mismatch: true });
  } else {
    if (confirmPasswordControl.hasError('mismatch')) {
      const errors = { ...confirmPasswordControl.errors };
      delete errors['mismatch'];
      confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
    }
  }

  return null;
};

  passwordStrengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const passMach: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!control.value) {return null};

    return passMach.test(control.value) ? null : {passwordStrength: true};
  }
}