import { Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { Qiniu } from '../services/qiniu.service';
import { Item } from '../services/item';
import { Uptoken } from '../services/uptoken';

const Dropzone = require('dropzone');
Dropzone.autoDiscover = false;

@Directive({
  selector: '[dropzone]',
  exportAs: 'dropzone',
  host: {
    '[class.dropzone]': 'true',
  }
})
export class DropzoneDirective implements OnInit, OnDestroy {
  @Input() qiniu: Qiniu;
  @Input() dropzone: any;
  @Input() prefix: string = ''; // s/:siteid/
  @Input() year: string;
  @Input() month: string;

  @Output() success: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() fail: EventEmitter<any> = new EventEmitter<any>();

  // dropzone: Dropzone;
  instance: any;
  uptoken: Uptoken;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.dropzone = Object.assign(
      {
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        maxFilesize: 10,
      },
      this.dropzone,
      {
        url: _ => this.uptoken.uphost,
        parallelUploads: 1,
      },
    );

    this.dropzone.accept = (file: File, done: (error?: string | Error) => void) => {
      let name = /^[-\w\.]+$/.test(file.name) ? file.name : this.uniqueName();
      let key = `${this.prefix}${this.year}/${this.month}/${name}`;
      this.qiniu.uptoken(key).subscribe(
        uptoken => {
          file['qn_key'] = uptoken.key || key;
          this.uptoken = uptoken;
          done();
        },
        err => {
          done(err);
          this.fail.next();
        },
      );
    };

    this.instance = new Dropzone(this.elementRef.nativeElement, this.dropzone);

    this.instance.on('success', (file: File, res: Item) => {
      this.instance.removeAllFiles();
      this.success.next(res);
    });

    this.instance.on('sending', (file: File, xhr: XMLHttpRequest, formData: FormData) => {
      formData.append('token', this.uptoken.token);
      formData.append('key', file['qn_key']);
    });

  }

  ngOnDestroy() {
    if (this.instance) {
      this.instance.destroy();
    }
  }

  uniqueName(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

}
