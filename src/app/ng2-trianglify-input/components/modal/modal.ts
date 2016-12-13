import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Options, parseOptions, stringifyOptions, randomOptions } from '../../core';
import { Palette } from '../palette/palette';

export class TrianglifyWindowData extends BSModalContext {
  public trianglify: string;
}

@Component({
  styleUrls: ['./modal.scss'],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrianglifyWindowComponent implements ModalComponent<TrianglifyWindowData>, OnInit {
  ops: Options;

  trianglify: Observable<string>;

  private trianglify$ = new Subject<string>();
  private reshow = 0;

  constructor(public dialog: DialogRef<TrianglifyWindowData>) { }

  ngOnInit() {
    this.trianglify = this.trianglify$.debounceTime(300).distinctUntilChanged();
    this.ops = parseOptions(this.dialog.context.trianglify) || randomOptions();
    setTimeout(_ => this.onChange(), 0);
  }

  onSelect(palette: Palette) {
    this.ops.palette = palette.key;
    this.onChange();
  }

  onChange() {
    this.trianglify$.next(stringifyOptions(this.ops));
  }

  onOk() {
    this.dialog.close(stringifyOptions(this.ops));
  }

  onClose() {
    this.dialog.dismiss();
  }

  onRandom() {
    this.ops = randomOptions();
    this.onChange();
  }

}
