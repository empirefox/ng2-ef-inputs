import { Inject, Injectable } from '@angular/core';

import { BasePattern } from './base-pattern';
import { Pattern } from './pattern';
import { SVG_PATTERNS } from './token';

@Injectable()
export class PatternsService {

  list: Pattern[];
  map: { [key: string]: Pattern } = {};

  constructor( @Inject(SVG_PATTERNS) list: BasePattern[]) {
    this.list = (list || []).map((raw) => {
      let p = {
        name: raw.name,
        url: `url("data:image/svg+xml;base64,${raw.base64}")`,
        font: `svg-${raw.font}`,
      };
      this.map[p.name] = p;
      return p;
    });
  }

}
