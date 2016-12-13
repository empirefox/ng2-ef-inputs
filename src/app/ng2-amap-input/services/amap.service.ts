import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { AmapLocation, parse } from '../amap';
import { AmapPickerModalComponent } from '../modal/modal.component';

@Injectable()
export class AmapService {

  constructor(private modal: Modal) { }

  open(value?: AmapLocation | string): Promise<DialogRef<string>> {
    return this.modal.open(AmapPickerModalComponent, overlayConfigFactory({ size: 'lg', amap: value }, BSModalContext));
  }

}
