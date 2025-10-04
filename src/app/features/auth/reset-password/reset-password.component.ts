import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, passwordStrengthValidator } from '../validators/register-validators';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
     this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, passwordStrengthValidator]],
      confirmPassword: ['',[Validators.required]]
    }, {validators: passwordMatchValidator });
  }

  resetPassword(){
    
  }
}
