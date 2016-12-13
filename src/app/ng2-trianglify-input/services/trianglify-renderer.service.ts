import { Injectable, Renderer } from '@angular/core';

import { Options, parseOptions } from '../core';

const Trianglify = require('trianglify');
// const chroma = require('chroma-js');

const SVG_OPS = { includeNamespace: 1 };

@Injectable()
export class TrianglifyRenderer {

  render(element: any, value: string | Options) {
    let svg = this.svg(element, value);
    if (svg) {
      return `url("data:image/svg+xml;utf8,${svg.outerHTML.replace(/\"/g, '\'')}") no-repeat`;
    }
  }

  svg(element: any, value: string | Options) {
    if (typeof value === 'string') {
      value = parseOptions(value);
    }
    if (value) {
      let {width, height} = this.rect(element);
      if (width > 0 && height > 0) {
        let {palette, cell_size, variance} = value;
        let x_colors = Trianglify.colorbrewer[palette];

        let ops: any = { x_colors, cell_size, variance, width, height, seed: 0 };
        // ops.y_colors = ops.x_colors.map(c => chroma(c).brighten(.5));

        return Trianglify(ops).svg(SVG_OPS);
      }
    }
  }

  private rect(element: any) {
    let rect = element.getBoundingClientRect();
    let height = rect.height === undefined ? rect.top - rect.bottom : rect.height;
    let width = rect.width === undefined ? rect.left - rect.right : rect.width;
    return { width, height };
  }

}
