import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ColorfulBackgroundGenerator } from '../../core/generator';

export class ColorfulWindowData extends BSModalContext {
  public s36: string;
}

@Component({
  styleUrls: ['./modal.css'],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorfulWindowComponent implements ModalComponent<ColorfulWindowData>, OnInit {
  generator: ColorfulBackgroundGenerator;

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: DialogRef<ColorfulWindowData>) {
  }

  ngOnInit() {
    this.generator = new ColorfulBackgroundGenerator(this.dialog.context.s36);
  }

  get preview(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.generator.preview());
  }

  onOk() {
    this.dialog.close(this.generator.s36());
  }

  random() {
    this.generator.random();
    return false;
  }

}
