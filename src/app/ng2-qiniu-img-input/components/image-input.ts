import { Component, Input, Provider, forwardRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Config } from '../services/qiniu-config';
import { Item } from '../services/item';
import { Qiniu } from '../services/qiniu.service';
import { QiniuImageService } from '../services/qiniu-image.service';

const noop = () => { };

@Component({
  selector: 'qiniu-img-input',
  exportAs: 'input',
  styleUrls: ['./image-input.css'],
  templateUrl: './image-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QiniuImageInputComponent),
      multi: true,
    },
  ],
})
export class QiniuImageInputComponent implements ControlValueAccessor {

  @Input('value') _value = '';
  @Input() readonly: boolean;
  @Input() id: string;

  @Input() qiniu: Qiniu;
  @Input() prefix: string = ''; // s/:siteid/
  private qiniuConfig: Config;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(
    private sanitizer: DomSanitizer,
    public qiniuImageService: QiniuImageService) { }

  get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  get thumbnail(): SafeStyle {
    if (!this._value) {
      return null;
    }
    let thumbnailStyle = this._value.endsWith(this.qiniuConfig.thumbnailStyle) ? '' : this.qiniuConfig.thumbnailStyle;
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.value}${thumbnailStyle}')`);
  }

  ngOnInit() {
    this.qiniuConfig = this.qiniu.config;
  }

  onEdit() {
    this.qiniuImageService.open(this.qiniu.config.name, this.prefix)
      .then(dialog => dialog.result.then((item: Item) => this.value = this.qiniuConfig.url(item.key, item.hash)));
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
