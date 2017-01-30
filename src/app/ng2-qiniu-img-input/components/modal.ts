import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Item } from '../services/item';
import { Qiniu, QiniuService } from '../services/qiniu.service';

export class QiniuWindowData extends BSModalContext {
  qiniu: string;
  prefix: string;
}

@Component({
  styleUrls: ['./modal.css'],
  templateUrl: './modal.html',
})
export class QiniuIconsWindowComponent implements OnInit, ModalComponent<QiniuWindowData> {
  qiniu: Qiniu;
  prefix: string;

  constructor(
    public dialog: DialogRef<QiniuWindowData>,
    private qiniuService: QiniuService) { }

  ngOnInit() {
    this.qiniu = this.qiniuService.get(this.dialog.context.qiniu);
    this.prefix = this.dialog.context.prefix;
  }

  onUploaded(item: Item) {
    this.dialog.close(item);
  }

  onSelect(item: Item) {
    this.dialog.close(item);
  }

  onDeleted(item: Item) {
    console.log('onDeleted', item);
  }

}
