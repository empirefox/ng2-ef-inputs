import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Item } from '../services/item';
import { QiniuIconsWindowComponent } from '../components/modal';

@Injectable()
export class QiniuImageService {

  constructor(private modal: Modal) { }

  open(qiniu: string, prefix: string): Promise<DialogRef<Item>> {
    let context = {
      showClose: true,
      isBlocking: true,
      keyboard: null,
      size: 'lg',
      qiniu,
      prefix,
    };
    return this.modal.open(QiniuIconsWindowComponent, overlayConfigFactory(context, BSModalContext));
  }

}
