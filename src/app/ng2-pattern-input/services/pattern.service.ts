import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { PatternWindowComponent } from '../components/modal/modal';

@Injectable()
export class PatternService {

  constructor(private modal: Modal) { }

  open(value?: string): Promise<DialogRef<string>> {
    return this.modal.open(PatternWindowComponent, overlayConfigFactory({ size: 'lg', pattern: value }, BSModalContext));
  }

}
