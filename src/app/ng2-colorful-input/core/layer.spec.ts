import {
  inject,
  TestBed
} from '@angular/core/testing';
import { ColorfulBackgroundLayer } from './layer';

describe('ColorfulBackgroundLayer', () => {

  it('should set default value', () => {
    let layer = new ColorfulBackgroundLayer([]);
    expect(layer.hue).toBe(200);
    expect(layer.degree).toBe(45);
  });

  it('should generate css', () => {
    let layer = new ColorfulBackgroundLayer([324, 91, 49, 45, 0, 70]);
    expect(layer.getCSSProperty().replace(/\s/g, ''))
      .toBe(`linear-gradient(45deg, hsla(324, 91%, 49%, 1) 0%, hsla(324, 91%, 49%, 0) 70%)`.replace(/\s/g, ''));
  });

});
