import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { ColorfulBackgroundGenerator } from '../../ng2-colorful-input/core/generator';
import { PatternsService } from '../../ng2-pattern-input/services/patterns.service';
import { TrianglifyRenderer } from '../../ng2-trianglify-input/services/trianglify-renderer.service';

import { Bg, parseBg } from '../services';

@Directive({
  selector: '[bg]',
})
export class BgDirective {

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private patterns: PatternsService,
    private trianglifyRenderer: TrianglifyRenderer) { }

  @Input() set bg(bg: Bg | string) {
    let element = this.elementRef.nativeElement;
    bg = typeof bg === 'string' ? parseBg(bg) : bg;
    if (bg && bg.typ) {
      let value = <string>bg[bg.typ];
      switch (bg.typ) {
        case 'color':
          this.renderer.setElementStyle(element, 'background', value);
          return;
        case 'colorful':
          this.renderer.setElementStyle(element, 'background', new ColorfulBackgroundGenerator(value).preview());
          return;
        case 'trianglify':
          setTimeout(_ => this.renderer.setElementStyle(element, 'background', this.trianglifyRenderer.render(element, value)), 100);
          return;
        case 'pattern':
          this.renderer.setElementStyle(element, 'background', (this.patterns.map[value] || <any>{}).url);
          return;
        case 'img':
          this.renderer.setElementStyle(element, 'background', `url(${value}) no-repeat center`);
          return;
        default:
      }
    }
    this.renderer.setElementStyle(element, 'background', null);
  }
}
