import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { QiniuIconsWindowComponent } from '../components/modal';

const context = {
  showClose: true,
  isBlocking: true,
  keyboard: null,
};

@Injectable()
export class QiniuImageService {

  constructor(private modal: Modal) { }

  open(): Promise<DialogRef<string>> {
    return this.modal.open(QiniuIconsWindowComponent, overlayConfigFactory(context, BSModalContext));
  }

}
