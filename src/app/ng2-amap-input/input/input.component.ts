import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { parseAmap } from '../amap';
import { AmapService } from '../services/amap.service';

const noop = () => { };

@Component({
  selector: 'amap-input',
  exportAs: 'input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2AmapInputComponent),
      multi: true,
    },
  ],
})
export class Ng2AmapInputComponent implements ControlValueAccessor {

  @Input() readonly: boolean;
  @Input() id: string;
  _value: string;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private amapService: AmapService) { }

  @Input() get value(): string { return this._value; }
  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  get name(): string {
    let amap = parseAmap(this.value);
    return amap ? amap.name : '';
  }

  onEdit() {
    this.amapService.open(this.value).then(dialog => dialog.result.then((value: string) => this.value = value));
  }

  onEmpty() {
    this.value = null;
  }

  /** @internal */
  onBlur() {
    this.onTouched();
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
