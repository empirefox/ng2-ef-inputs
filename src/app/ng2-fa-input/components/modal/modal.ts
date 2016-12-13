import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { StackFa, Fa, colors as toolColors } from 'fa-tool';
import { FaNamesService } from '../../services';

export let sizes = [
  { text: '1.3x', value: 'lg' },
  { text: '2x', value: '2x' },
  { text: '3x', value: '3x' },
  { text: '4x', value: '4x' },
  { text: '5x', value: '5x' },
];

export let dirs = [
  { pic: 'fa-arrow-right', value: 90 },
  { pic: 'fa-arrow-down', value: 180 },
  { pic: 'fa-arrow-left', value: 270 },
];

export let flips = [
  { pic: 'fa-exchange', value: 'h' },
  { pic: 'fa-exchange fa-rotate-90', value: 'v' },
];

export let colors = toolColors;

export let pulls = [
  { value: 'right', pic: 'fa-step-backward' },
  { value: 'left', pic: 'fa-step-forward' },
];

export class FaWindowData extends BSModalContext {
  public stack: StackFa;
}

@Component({
  styleUrls: ['./modal.css'],
  templateUrl: './modal.html',
})
export class FaWindowComponent implements ModalComponent<FaWindowData>, OnInit {
  stack: StackFa;
  current: Fa;
  front: Fa;
  back: Fa;

  sizes = sizes;
  dirs = dirs;
  flips = flips;
  colors = colors;
  pulls = pulls;
  names$: Observable<string[]>;

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: DialogRef<FaWindowData>,
    private faNamesService: FaNamesService) { }

  get frontPreview() {
    return this.front.pre;
  }

  get backPreview() {
    let back = new Fa(this.back.export());
    back.size = this.front.size;
    back.pull = this.front.pull;
    return back.pre;
  }

  ngOnInit() {
    this.names$ = this.faNamesService.names();

    let stack = this.dialog.context.stack;
    this.stack = new StackFa();
    this.stack.xfb = stack.xfb;
    this.back = new Fa(stack.back && stack.back.export());
    this.back.name = this.back.name || 'circle-o';
    this.front = new Fa(stack.front && stack.front.export());
    this.front.name = this.front.name || 'user';
    // additions
    this.back['btnType'] = 'btn-primary';
    this.back['tittleType'] = 'text-primary';
    this.front['btnType'] = 'btn-danger';
    this.front['tittleType'] = 'text-danger';

    this.stack.back = this.back;
    this.current = this.stack.front = this.front;
  }

  onOk(fa?: Fa) {
    let stack = new StackFa();
    switch (fa) {
      case this.front:
        stack.front = fa;
        break;
      case this.back:
        fa.size = this.front.size;
        fa.pull = this.front.pull;
        stack.front = fa;
        break;
      default:
        stack = this.stack;
    }
    this.dialog.close(stack);
  }

  onDismiss() {
    this.dialog.dismiss();
  }

}
