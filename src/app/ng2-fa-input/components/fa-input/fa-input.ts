import { Component, Input, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { parse, StackFa } from 'fa-tool';

import { FaSelectService } from '../../services';

const noop = () => { };

@Component({
  selector: 'fa-input',
  exportAs: 'input',
  styleUrls: ['./fa-input.css'],
  templateUrl: './fa-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FaInputComponent),
      multi: true
    },
  ],
})
export class FaInputComponent implements ControlValueAccessor {

  @Input('value') _value: any = '';
  @Input() readonly: boolean;
  @Input() id: string;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private faSelectService: FaSelectService) { }

  get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onEdit() {
    this.faSelectService.open(this.value).then(dialog => dialog.result.then((stack: StackFa) => this.value = stack.text()));
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
