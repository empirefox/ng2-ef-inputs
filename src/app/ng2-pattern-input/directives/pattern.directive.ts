import { Directive, Input, ElementRef, Renderer } from '@angular/core';

import { Pattern, PatternsService } from '../services';

@Directive({
  selector: '[svgPattern]',
})
export class SvgPatternDirective {

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private patterns: PatternsService) { }

  @Input() set svgPattern(value: string | Pattern) {
    let pattern = typeof value === 'string' ? this.patterns.map[value] : value;
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'background', (pattern || <any>{}).url);
  }

}
