import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Options, parseOptions, stringifyOptions } from './options';

describe('Options', () => {

  it('should parse options', () => {
    // 4, 35, 95, 55,140, 90, 50,225, 95, 50,340, 100, 55
    let options: Options = parseOptions('YlGn,100');
    expect(options).toBeUndefined();

    options = parseOptions('YlGn,100,0.3');
    expect(options).toBeDefined();
    expect(options.cell_size).toBe(100);
    expect(options.variance).toBe(.3);

    expect(stringifyOptions(options)).toBe('YlGn,100,0.3');
  });
});
