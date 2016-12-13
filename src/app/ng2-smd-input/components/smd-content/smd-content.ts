import { Component, Input, ElementRef, Renderer } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MdService } from '../../services/md.service';

@Component({
  selector: 'smd-content',
  template: '',
})
export class SmdContentComponent {

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private mdService: MdService) { }

  @Input() set raw(raw: string) {
    let value = this.raw ? this.sanitizer.bypassSecurityTrustHtml(this.mdService.render(raw)) : '';
    this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', value);
  }
}
