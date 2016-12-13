import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { stringifyOptions, randomOptions } from '../../core';
import { TrianglifyService } from '../../services/trianglify.service';

const noop = () => { };

@Component({
  selector: 'trianglify-input',
  styleUrls: ['./trianglify-input.css'],
  templateUrl: './trianglify-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TriangifyInputComponent),
      multi: true,
    },
  ],
})
export class TriangifyInputComponent implements ControlValueAccessor {

  @Input('value') _value: any = '';
  @Input() readonly: boolean;
  @Input() id: string;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private trianglifyService: TrianglifyService) { }

  get value(): any { return this._value; }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onRandom() {
    this.value = stringifyOptions(randomOptions());
  }

  onEdit() {
    this.trianglifyService.open(this.value).then(dialog => dialog.result.then((opt: string) => this.value = opt));
  }

  onEmpty() {
    this.value = '';
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
