import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Bg, parseBg } from '../../services';

export interface BgType {
  name: string;
  fa: string;
}

// index is important, they are used in template.
export const BgTypes: BgType[] = [
  { name: 'color', fa: 'star-o' },
  { name: 'colorful', fa: 'star-half-o' },
  { name: 'trianglify', fa: 'cube' },
  { name: 'pattern', fa: 'hashtag' },
  { name: 'img', fa: 'image' },
];

const noop = () => { };

@Component({
  selector: 'bg-input',
  exportAs: 'input',
  styleUrls: ['./input.component.css'],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BgInputComponent),
      multi: true,
    },
  ],
})
export class BgInputComponent implements ControlValueAccessor {

  @Input() readonly: boolean;
  @Input() id: string;

  types = BgTypes;
  current: BgType;

  private _color = '';
  private _colorful = '';
  private _trianglify = '';
  private _pattern = '';
  private _img = '';

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  @Input('value') get value(): string {
    let s = this.current && this[this.current.name];
    return s ? `bg-${this.current.name}:${s}` : '';
  }

  set value(v: string) {
    let bg = parseBg(v);
    v = bg && bg[bg.typ];
    v = v ? `bg-${bg.typ}:${v}` : '';
    if (v !== this.value) {
      if (v) {
        this.current = BgTypes.find(e => e.name === bg.typ);
        if (this.current) {
          this[bg.typ] = bg[bg.typ];
        }
      } else {
        if (this.current) {
          this[this.current.name] = '';
        }
      }
      this.onChange(v);
    }
  }

  get color() { return this._color; }
  get colorful() { return this._colorful; }
  get trianglify() { return this._trianglify; }
  get pattern() { return this._pattern; }
  get img() { return this._img; }

  set color(v: string) {
    this._color = v;
    this.onChange(this.value);
  }

  set colorful(v: string) {
    this._colorful = v;
    this.onChange(this.value);
  }

  set trianglify(v: string) {
    this._trianglify = v;
    this.onChange(this.value);
  }

  set pattern(v: string) {
    this._pattern = v;
    this.onChange(this.value);
  }

  set img(v: string) {
    this._img = v;
    this.onChange(this.value);
  }

  setType(typ: BgType) {
    if (!this.readonly && this.current !== typ) {
      this.current = typ;
      this.onChange(this.value);
    }
  }

  /** @internal */
  onBlur() {
    this.onTouched();
  }

  writeValue(value: any) {
    this.value = value || '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
