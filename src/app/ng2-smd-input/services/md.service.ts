import { Injectable, Inject } from '@angular/core';
import { AMAP_KEY } from 'ng2-amap-input/amap/tokens';

import { createMd } from '../md';

@Injectable()
export class MdService {
  md: any;

  constructor( @Inject(AMAP_KEY) key: string) {
    this.md = createMd(key);
  }

  render(src: string, env?: any): string {
    return this.md.render(src, env).replace(/<a\s+href="/g, `<a luck href="`);
  }

}
