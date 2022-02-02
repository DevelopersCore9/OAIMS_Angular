import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.width = '500px';
    this.el.nativeElement.style.height = '706px';
  }
}
