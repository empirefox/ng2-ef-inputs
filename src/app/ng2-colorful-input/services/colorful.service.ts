import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ColorfulWindowComponent } from '../components/modal/modal';

@Injectable()
export class ColorfulService {

  constructor(private modal: Modal) { }

  open(value?: string): Promise<DialogRef<string>> {
    return this.modal.open(ColorfulWindowComponent, overlayConfigFactory({ size: 'lg', s36: value }, BSModalContext));
  }

}
