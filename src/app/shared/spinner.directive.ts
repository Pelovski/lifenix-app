import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Directive({
  selector: '[appSpinner]',
  standalone: false
})
export class SpinnerDirective {
  private sub?: Subscription;
  private hasView = false;

  @Input('appSpinner') key!: string;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private spinnerService: SpinnerService) 
  { }

}
