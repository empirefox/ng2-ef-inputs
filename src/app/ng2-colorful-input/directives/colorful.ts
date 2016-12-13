import { Directive, Input, ElementRef, Renderer } from '@angular/core';

import { ColorfulBackgroundGenerator } from '../core/generator';

@Directive({
  selector: '[colorful]'
})
export class ColorfulDirective {

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef) { }

  @Input() set colorful(value: string) {
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'background', new ColorfulBackgroundGenerator(value).preview());
  }
}
