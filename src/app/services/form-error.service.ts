import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  constructor() { }

  private errorMessages: any = {
    username: {
      required: 'Username is required.',
      minlength: 'Username must be at least 4 characters.',
      maxlength: 'Username cannot be longer than 15 characters.'
    },
    email: {
      required: 'Email is required.',
      email: 'Invalid email address.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 8 characters.',
      passwordStrength: 'Password must contain uppercase, lowercase, number, and special character.'
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      mismatch: 'Passwords do not match.',
    }
  }
  
  getErrorMessage(fb: FormGroup, contorlName: string) : string | null{
    const control = fb.get(contorlName);

    if(!control) return null;
    
    if(control.errors){
      for(const errorName in control.errors){
        if(this.errorMessages[contorlName]?.[errorName]){
          return this.errorMessages[contorlName][errorName];
        }
      }
    }

    if(control.errors?.['backend']){
      return control.errors['backend'];
    }

    if(contorlName === 'confirmPassword' && fb.hasError('mismatch')){
      return this.errorMessages.confirmPassword.mismatch;
    }

    return null;
  }
}
