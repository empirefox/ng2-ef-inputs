import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';

import { QiniuConfig } from '../services/qiniu-config';

@Component({
  styleUrls: ['./modal.css'],
  templateUrl: './modal.html',
})
export class QiniuIconsWindowComponent implements ModalComponent<any> {

  constructor(
    public dialog: DialogRef<any>,
    private qiniuConfig: QiniuConfig) { }

  onUploaded(key: string) {
    this.dialog.close(`${this.qiniuConfig.bucketDomain}${key}`);
  }

  onSelect(key: string) {
    this.dialog.close(`${this.qiniuConfig.bucketDomain}${key}`);
  }

  onDeleted(key: string) {
    console.log('onDeleted', key);
  }

}
