import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { ColorfulBackgroundGenerator } from '../core/generator';

@Pipe({
  name: 'colorful'
})
export class ColorfulPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(new ColorfulBackgroundGenerator(value).preview());
  }
}
