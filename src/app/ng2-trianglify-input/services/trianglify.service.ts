import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { TrianglifyWindowComponent } from '../components/modal/modal';

@Injectable()
export class TrianglifyService {

  constructor(private modal: Modal) { }

  open(value?: string): Promise<DialogRef<string>> {
    return this.modal.open(TrianglifyWindowComponent, overlayConfigFactory({ size: 'lg', trianglify: value }, BSModalContext));
  }

}
