import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Pattern, PatternsService } from '../../services';

export class PatternWindowData extends BSModalContext {
  pattern: string | Pattern;
}

@Component({
  styleUrls: ['./modal.scss'],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatternWindowComponent implements ModalComponent<PatternWindowData>, OnInit {

  pattern: Pattern;
  list: Pattern[];

  constructor(
    public dialog: DialogRef<PatternWindowData>,
    private patterns: PatternsService) { }

  ngOnInit() {
    this.list = this.patterns.list;
    let pattern = this.dialog.context.pattern;
    this.pattern = typeof pattern === 'string' ? this.patterns.map[pattern] : pattern;
  }

  onSelect(pattern: Pattern) {
    this.pattern = pattern;
  }

  onOk() {
    this.dialog.close(this.pattern.name);
  }

  onClose() {
    this.dialog.dismiss();
  }

}
