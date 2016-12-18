import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PatternService } from '../../services';

const noop = () => { };

@Component({
  selector: 'pattern-input',
  exportAs: 'input',
  styleUrls: ['./input.css'],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatternInputComponent),
      multi: true,
    },
  ],
})
export class PatternInputComponent implements ControlValueAccessor {

  @Input() readonly: boolean;
  @Input() id: string;
  private _value: any = '';

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private patternService: PatternService) { }

  @Input('value') get value(): any { return this._value; }
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onEdit() {
    this.patternService.open(this.value).then(dialog => dialog.result.then((v: string) => this.value = v));
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
