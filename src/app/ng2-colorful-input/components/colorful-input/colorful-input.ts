import { Component, Input, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ColorfulBackgroundGenerator } from '../../core/generator';
import { ColorfulService } from '../../services/colorful.service';

const noop = () => { };

@Component({
  selector: 'colorful-input',
  styleUrls: ['./colorful-input.css'],
  templateUrl: './colorful-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorfulInputComponent),
      multi: true,
    },
  ],
})
export class ColorfulInputComponent implements ControlValueAccessor {

  @Input('value') _value: any = '';
  @Input() readonly: boolean;
  @Input() id: string;

  private generator = new ColorfulBackgroundGenerator('');
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private colorfulService: ColorfulService) { }

  get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onRandom() {
    if (!this.readonly) {
      this.value = this.generator.random().s36();
    }
  }

  onEdit() {
    this.colorfulService.open(this.value).then(dialog => dialog.result.then((s36: string) => this.value = s36));
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
