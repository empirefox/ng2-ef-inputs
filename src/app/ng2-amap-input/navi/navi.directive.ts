import { Directive, Input, Inject, ElementRef, Renderer } from '@angular/core';

import { AmapLocation, AMAP_KEY, parse, toUrl } from '../amap';

@Directive({
  selector: 'iframe[amap]',
})
export class NaviDirective {

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Inject(AMAP_KEY) private key: string) { }

  @Input() set amap(amap: AmapLocation | string) {
    amap = typeof amap === 'string' ? parse(amap) : amap;
    let element = this.elementRef.nativeElement;
    this.renderer.setElementProperty(element, 'src', toUrl(amap, this.key));
  }

}
