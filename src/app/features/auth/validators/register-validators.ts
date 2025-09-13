import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
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

export const passwordStrengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const passMach: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!control.value) {return null};

    return passMach.test(control.value) ? null : {passwordStrength: true};
  }

  export const emailValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(value) ? null : {email: true};
  }