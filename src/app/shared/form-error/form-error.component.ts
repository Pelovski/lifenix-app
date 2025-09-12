import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormErrorService } from '../../services/form-error.service';

@Component({
  selector: 'app-form-error',
  standalone: false,
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() controlName!: string;
  @Input() form!: FormGroup;

  constructor(public formErrorService: FormErrorService){}
}
