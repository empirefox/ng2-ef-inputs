import { Directive, Input, ElementRef, Renderer } from '@angular/core';

import { Options } from '../core';
import { TrianglifyRenderer } from '../services';

@Directive({
  selector: '[trianglify]',
})
export class TrianglifyDirective {

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private trianglifyRenderer: TrianglifyRenderer) { }

  @Input() set trianglify(value: string | Options) {
    let element = this.elementRef.nativeElement;
    this.renderer.setElementStyle(element, 'background', this.trianglifyRenderer.render(element, value));
  }

}
