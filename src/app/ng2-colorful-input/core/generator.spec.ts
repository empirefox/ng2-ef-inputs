import {
  inject,
  TestBed
} from '@angular/core/testing';
import { ColorfulBackgroundGenerator, LAYER_PRESETS } from './generator';

describe('ColorfulBackgroundGenerator', () => {

  it('should be parse s36', () => {
    // 4, 35, 95, 55,140, 90, 50,225, 95, 50,340, 100, 55
    let generator = new ColorfulBackgroundGenerator('4,z,2n,1j,3w,2i,1e,69,2n,1e,9g,2s,1j');

    expect(generator.valid).toBe(true);
    expect(generator.preset).toBe(4);
    expect(generator.layers.length).toBe(4);

    let layer = generator.layers[0];
    let preset = LAYER_PRESETS[4][3];
    expect(layer.hue).toBe(35);
    expect(layer.saturation).toBe(95);
    expect(layer.lightness).toBe(55);
    expect(layer.degree).toBe(preset[0]);
    expect(layer.positionColor).toBe(preset[1]);
    expect(layer.positionTransparency).toBe(preset[2]);

    layer = generator.layers[1];
    preset = LAYER_PRESETS[4][2];
    expect(layer.hue).toBe(140);
    expect(layer.saturation).toBe(90);
    expect(layer.lightness).toBe(50);
    expect(layer.degree).toBe(preset[0]);
    expect(layer.positionColor).toBe(preset[1]);
    expect(layer.positionTransparency).toBe(preset[2]);

    layer = generator.layers[2];
    preset = LAYER_PRESETS[4][1];
    expect(layer.hue).toBe(225);
    expect(layer.saturation).toBe(95);
    expect(layer.lightness).toBe(50);
    expect(layer.degree).toBe(preset[0]);
    expect(layer.positionColor).toBe(preset[1]);
    expect(layer.positionTransparency).toBe(preset[2]);

    layer = generator.layers[3];
    preset = LAYER_PRESETS[4][0];
    expect(layer.hue).toBe(340);
    expect(layer.saturation).toBe(100);
    expect(layer.lightness).toBe(55);
    expect(layer.degree).toBe(preset[0]);
    expect(layer.positionColor).toBe(preset[1]);
    expect(layer.positionTransparency).toBe(preset[2]);
  });

  it('should be render s36 back to original value', () => {
    // 4, 35, 95, 55,140, 90, 50,225, 95, 50,340, 100, 55
    let s36 = '4,z,2n,1j,3w,2i,1e,69,2n,1e,9g,2s,1j';
    let generator = new ColorfulBackgroundGenerator(s36);
    expect(generator.s36()).toBe(s36);
  });
});
