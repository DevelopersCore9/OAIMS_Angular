import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFeaturedImages]'
})
export class FeaturedImagesDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.height = '500px';
  }

}
