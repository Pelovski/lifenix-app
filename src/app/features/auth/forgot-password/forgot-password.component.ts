import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/register-validators';
import { ForgotPasswordRequest } from '../../../models/auth.models';
import { AuthService } from '../../../services/auth.service';
import { FormErrorService } from '../../../services/form-error.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public formErrorService: FormErrorService,
    public notificationService: NotificationService){

  }
  ngOnInit(): void {
   this.forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, emailValidator]]
   })
  }

  forgotPassword(){
    if(this.forgotPasswordForm.valid){
      const forgotPasswordData: ForgotPasswordRequest = {
        email: this.forgotPasswordForm.value.email
      };

      this.authService.forgotPassword(forgotPasswordData).subscribe({
        next: (response: void) => {
          console.log("ForgotPassword successful", response);
          this.notificationService.show('Almost done! If your email matches an existing account, you’ll get a reset link shortly.', 'success');
          this.forgotPasswordForm.reset();
        }
      });
    }
  }
}
