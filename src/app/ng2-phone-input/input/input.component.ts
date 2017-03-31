import { Inject, Component, Input, Optional, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, Validator, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Http } from '@angular/http';
import * as countdown from 'countdown';
import { CountdownComponent } from 'ng-countdownjs';

import { ISmsConfig, ISmsResponse } from '../config';
import { IHttp } from '../../common/http';
import { SMS_HTTP, SMS_CONFIG } from '../token';

const noop = () => { };
const defaultPattern = `1[3|4|5|7|8]\\d{9}`;

@Component({
  selector: 'phone-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
  exportAs: 'input',
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
  @ViewChild(CountdownComponent) countdown: CountdownComponent;

  @Input() id: string;
  @Input() pattern: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() start: string;
  @Input() payload: any;

  input: FormControl;
  _value = '';
  started: boolean;
  ts: countdown.Timespan;
  defaultUnits = countdown.SECONDS;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(
    private http: Http,
    @Inject(SMS_CONFIG) private config: ISmsConfig,
    @Optional() @Inject(SMS_HTTP) private ihttp: IHttp) { }

  @Input() get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  get key() { return `${this.config.key}_${this.value}`; }

  ngOnInit() {
    let v = Validators.pattern(this.pattern || defaultPattern);
    v = this.required ? v = Validators.compose([Validators.required, v]) : v;
    this.input = new FormControl(this.value, v);
  }

  time() {
    return new Date().getTime() + this.config.seconds * 1000;
  }

  onStart() {
    const payload = Object.assign({}, this.payload, { phone: this.value });
    (this.ihttp || this.http).post(this.config.post, JSON.stringify(payload)).subscribe(res => {
      const data: ISmsResponse = res.json() || {};
      const time = data.unix ? data.unix * 1000 : this.time();
      this.countdown.start(time);
    });
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

  // returns null when valid else the validation object
  // in this case we're checking if the json parsing has
  // passed or failed from the onChange method
  validate(c: FormControl) {
    return this.input.validator(c);
  }

}
