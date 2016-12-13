import { Injectable } from '@angular/core';
import { overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { parse, StackFa } from 'fa-tool';
import { FaWindowComponent } from '../components';

@Injectable()
export class FaSelectService {

  constructor(private modal: Modal) { }

  open(stack?: StackFa | string): Promise<DialogRef<string>> {
    stack = typeof stack === 'string' ? parse(stack) : stack;
    let context = { size: 'lg', stack: stack || new StackFa() };
    return this.modal.open(FaWindowComponent, overlayConfigFactory(context, BSModalContext));
  }

}
