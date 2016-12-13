import { Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { QiniuService } from '../services/qiniu.service';
import { Item } from '../services/item';

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
  @Input('dropzone') options: any;
  @Input() year: string;
  @Input() month: string;

  @Output() success: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() fail: EventEmitter<any> = new EventEmitter<any>();

  // dropzone: Dropzone;
  dropzone: any;
  uptoken: string;
  uphost: string;

  constructor(
    private elementRef: ElementRef,
    private qiniuService: QiniuService) { }

  ngOnInit() {
    this.options = this.options || {
      url: _ => this.uphost,
      acceptedFiles: 'image/*',
      parallelUploads: 1,
      maxFilesize: 10,
      addRemoveLinks: true,
    };

    this.options.accept = (file: File, done: (error?: string | Error) => void) => {
      this.qiniuService.uptoken().subscribe(
        uptoken => {
          this.uptoken = uptoken.token;
          this.uphost = uptoken.uphost;
          done();
        },
        err => {
          done(err);
          this.fail.next();
        },
      );
    };

    this.dropzone = new Dropzone(this.elementRef.nativeElement, this.options);

    this.dropzone.on('success', (file: File, res: Item) => {
      this.dropzone.removeAllFiles();
      this.success.next(res);
    });

    this.dropzone.on('sending', (file: File, xhr: XMLHttpRequest, formData: FormData) => {
      formData.append('token', this.uptoken);
      let name = /^[-\w\.]+$/.test(file.name) ? file.name : this.uniqueName();
      formData.append('key', `${this.year}/${this.month}/${name}`);
    });

  }

  ngOnDestroy() {
    if (this.dropzone) {
      this.dropzone.destroy();
    }
  }

  uniqueName(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

}
