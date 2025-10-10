import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { SpinnerDirective } from './spinner.directive';



@NgModule({
  declarations: [
    FormErrorComponent,
    SpinnerDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormErrorComponent,
    SpinnerDirective
  ]
})
export class SharedModule { }
