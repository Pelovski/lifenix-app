import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, passwordStrengthValidator } from '../validators/register-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordRequest, ValidateResetTokenRequest } from '../../../models/auth.models';
import { AuthService } from '../../../services/auth.service';
import { take } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;
  email!: string;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public notificationService: NotificationService){}

  ngOnInit(): void {
  this.resetPasswordForm = this.fb.group({
    password: ['', [Validators.required, passwordStrengthValidator]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator });

  this.route.queryParams
    .pipe(take(1))
    .subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];

    console.log('Reset email:', this.email);
    console.log('Reset token:', this.token);

    if (this.email && this.token) {

      const validateData: ValidateResetTokenRequest = {
        email: this.email,
        token: this.token
      };

       this.authService.validateResetToken(validateData).subscribe({
        next: () => {
          console.log('Token is valid');
          setTimeout(() => {
            this.router.navigate([], { replaceUrl: true, queryParams: {} });
          });
        },
        error: () => {
          console.log('Invalid or expired token.');
        }
      });
    } else {
      console.error('Missing email or token in URL (check reset link)');
    }
  });
}

  resetPassword(){
    if(this.resetPasswordForm.valid){
      const resetData: ResetPasswordRequest = {
        email: this.email,
        token: this.token,
        newPassword: this.resetPasswordForm.value.password
      };

       console.log('ValidateResetTokenData:', resetData);
      
    this.authService.resetPassword(resetData).subscribe({
      next: () => {
        this.notificationService.show('Your password has been successfully changed!', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: () => {
        console.log('Failed to reset password. Token may be invalid or expired.');
        this.notificationService.show('Your password reset link has expired. Please request a new one.', 'error');
        setTimeout(() => {
          this.router.navigate(['/forgot-password'])
        }, 3000);
      }
    });
    }
  }
}
