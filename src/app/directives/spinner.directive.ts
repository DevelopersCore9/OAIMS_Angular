import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Directive({
  selector: '[appSpinner]',
})
export class SpinnerDirective {
  domElement: any;
  spinShow: boolean = false;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private spinnerService: SpinnerService
  ) {
    let el = this.element.nativeElement;
    this.domElement = this.element.nativeElement;

    this.spinnerService.currentSpinnerState.subscribe((res) => {
      console.log('Response of Spinner ', res);
      this.spinShow = res;
      if (this.spinShow == true) {
        this.applyStyles();
      } else {
        this.removeStyles();
      }
    });
  }

  applyStyles() {
    const requiredStyles: any = {
      'overflow-y': 'hidden',
      margin: '0',
      height: '100%',
      overflow: 'hidden',
      //...and so on
    };
    Object.keys(requiredStyles).forEach((newStyle: any) => {
      this.renderer.setStyle(
        this.domElement,
        `${newStyle}`,
        requiredStyles[newStyle]
      );
    });
  }

  removeStyles() {
    const requiredStyles: any = {
      'overflow-y': 'hidden',
      margin: '0',
      height: '100%',
      overflow: 'hidden',
      //...and so on
    };
    Object.keys(requiredStyles).forEach((newStyle: any) => {
      this.renderer.removeStyle(
        this.domElement,
        `${newStyle}`,
        requiredStyles[newStyle]
      );
    });
  }
}
