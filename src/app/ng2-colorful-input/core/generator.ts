import { ColorfulBackgroundLayer } from './layer';

export const LAYER_PRESETS = {
  3: [[50, 100, 70], [140, 30, 80], [210, 10, 55]],
  4: [[315, 100, 70], [225, 10, 80], [135, 10, 80], [45, 0, 70]],
  5: [[325, 100, 70], [245, 30, 80], [155, 10, 80], [55, 0, 70], [20, 0, 55]]
};

export class ColorfulBackgroundGenerator {
  valid: boolean = false;
  layers: ColorfulBackgroundLayer[] = [];
  preset: number = 4;

  constructor(s36: string) {
    if (!s36) {
      return;
    }
    let s36array = s36.split(',').map(s => parseInt(s, 36));
    this.valid = this.check36array(s36array);

    if (this.valid) {
      this.preset = s36array[0];
      this.parse(s36array);
    }
  }

  random(preset = 4) {
    this.preset = preset;
    let a = [preset];
    let i;
    for (i = 0; i < preset; i++) {
      a.push(Math.ceil(359 * Math.random()));
      a.push(Math.ceil(10 * Math.random()) + 90);
      a.push(Math.ceil(10 * Math.random()) + 40);
    }
    this.parse(a);
    this.valid = true;
    return this;
  }

  preview(prefix?: string): string {
    return this.valid ? this.layers.map(layer => layer.getCSSProperty(prefix)).join(',') : '';
  }

  s36(): string {
    if (!this.valid) {
      return '';
    }
    return this.layers.map(layer => [+layer.hue, +layer.saturation, +layer.lightness]).
      reduce((a, e) => [...a, ...e], [this.preset]).
      map(e => e.toString(36)).join(',');
  }

  private parse(a: number[]) {
    this.layers = [];

    let li, ll = a[0];
    for (li = 0; li < ll; li++) {
      let q = li * 3 + 1;
      let presets = <number[]>LAYER_PRESETS[ll][ll - li - 1];
      this.layers.push(new ColorfulBackgroundLayer([
        ...a.slice(q, q + 3),
        ...presets
      ]));
    }
  }

  private check36array(a: number[]): boolean {
    return a[0] > 2 && a[0] < 6 && a.length === a[0] * 3 + 1;
  }
}
