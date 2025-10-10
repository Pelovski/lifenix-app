import { ContentChild, Directive, ElementRef, Input, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Directive({
  selector: '[appSpinner]',
  standalone: false
})
export class SpinnerDirective implements OnDestroy {
  @Input('appSpinner') key!: string;
  private sub?: Subscription;
  private spinnerEl?: HTMLElement;

  @ContentChild('btnText', {static: true}) textEl?: ElementRef;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2, private spinnerService: SpinnerService) 
  { }

 ngOnInit() {
    if (!this.key) {
      console.warn('SpinnerDirective: missing key (example: [appSpinner]="\'login\'")');
      return;
    }

    this.sub = this.spinnerService.isLoading$(this.key).subscribe(isLoading => {
      if (isLoading) {
        this.showSpinner();
      } else {
        this.hideSpinner();
      }
    });
  }

  private showSpinner() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.spinnerEl = this.renderer.createElement('div');
    this.renderer.addClass(this.spinnerEl, 'spinner-container');
    this.renderer.setStyle(this.spinnerEl, 'position', 'absolute');
    this.renderer.setStyle(this.spinnerEl, 'top', '50%');
    this.renderer.setStyle(this.spinnerEl, 'left', '50%');
    this.renderer.setStyle(this.spinnerEl, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(this.spinnerEl, 'display', 'flex');
    this.renderer.setStyle(this.spinnerEl, 'align-items', 'center');
    this.renderer.setStyle(this.spinnerEl, 'justify-content', 'center');

    const circle = this.renderer.createElement('div');
    this.renderer.addClass(circle, 'spinner-circle');
    this.renderer.setStyle(circle, 'width', '18px');
    this.renderer.setStyle(circle, 'height', '18px');
    this.renderer.setStyle(circle, 'border', '3px solid rgba(255,255,255,0.3)');
    this.renderer.setStyle(circle, 'border-top-color', 'white');
    this.renderer.setStyle(circle, 'border-radius', '50%');
    this.renderer.setStyle(circle, 'animation', 'spin 0.8s linear infinite');

    this.renderer.appendChild(this.spinnerEl, circle);

    this.renderer.appendChild(this.el.nativeElement, this.spinnerEl);

    this.renderer.setStyle(this.el.nativeElement, 'color', 'transparent');
  }

  private hideSpinner() {

    this.renderer.setStyle(this.el.nativeElement, 'color', '');
    if (this.spinnerEl) {
      this.renderer.removeChild(this.el.nativeElement, this.spinnerEl);
      this.spinnerEl = undefined;
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


}
