import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MdService } from '../../services/md.service';

export interface MdeCallback {
  (s: string);
}

export interface MdeOptions {
  addLink: boolean;
  addImage: boolean;
  addVideo: boolean;
  addMaps: boolean;
  addFa: boolean;
  addEmoji: boolean;
}

const SimpleMDE = require('simplemde-ef');
const noop = () => { };

@Component({
  selector: 'smd-input',
  templateUrl: './smd-input.html',
  exportAs: 'input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmdInputComponent),
      multi: true,
    },
  ],
})
export class SmdInputComponent implements ControlValueAccessor {

  @Input('value') _value: any = '';
  @Input() options: MdeOptions;

  @Output() fullscreen = new EventEmitter<boolean>();
  @Output() addLink = new EventEmitter<MdeCallback>();
  @Output() addImage = new EventEmitter<MdeCallback>();
  @Output() addVideo = new EventEmitter<MdeCallback>();
  @Output() addMaps = new EventEmitter<MdeCallback>();
  @Output() addFa = new EventEmitter<MdeCallback>();
  @Output() addEmoji = new EventEmitter<MdeCallback>();

  @ViewChild('input') input: ElementRef;

  editor: any;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  constructor(private mdService: MdService) { }

  get value(): any { return this._value; };
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  ngAfterViewInit() {
    this.editor = new SimpleMDE({
      element: this.input.nativeElement,
      status: ['lines', 'cursor'],
      showIcons: ['table'],
    });

    if (!this.options || this.options.addLink !== false) {
      this.editor.onAddLink = (cb: MdeCallback) => this.addLink.next(cb);
    }

    if (!this.options || this.options.addImage !== false) {
      this.editor.onAddImage = (cb: MdeCallback) => this.addImage.next(cb);
    }

    if (!this.options || this.options.addVideo !== false) {
      this.editor.onAddVideo = (cb: MdeCallback) => this.addVideo.next(cb);
    }

    if (!this.options || this.options.addMaps !== false) {
      this.editor.onAddMaps = (cb: MdeCallback) => this.addMaps.next(cb);
    }

    if (!this.options || this.options.addFa !== false) {
      this.editor.onAddFa = (cb: MdeCallback) => this.addFa.next(cb);
    }

    if (!this.options || this.options.addEmoji !== false) {
      this.editor.onAddEmoji = (cb: MdeCallback) => this.addEmoji.next(cb);
    }

    this.editor.onFullScreen = (on: boolean) => this.fullscreen.next(on);
    this.editor.markdown = this.mdService.render.bind(this.mdService);

    this.editor.value(this.value);
    this.editor.codemirror.on('change', _ => this.value = this.editor.value());
    this.editor.codemirror.on('blur', this.onBlur.bind(this));
  }

  focus() {
    this.editor.codemirror.focus();
  }

  /** @internal */
  onBlur() {
    this.onTouched();
  }

  writeValue(value: any) {
    this.value = value || '';
    if (this.editor) {
      this.editor.value(this.value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
