import { Component, Input, Output, EventEmitter } from '@angular/core';

const trianglify = require('trianglify');

export interface Palette {
  key: string;
  colors: string[];
}

@Component({
  selector: 'palette',
  templateUrl: './palette.html',
  styleUrls: ['./palette.scss']
})
export class PaletteComponent {

  @Output() select = new EventEmitter<Palette>();

  private lists: Palette[] = Object.keys(trianglify.colorbrewer).map(key => ({ key: key, colors: trianglify.colorbrewer[key] }));

  onSelect(palette: Palette) {
    this.select.next(palette);
  }
}
