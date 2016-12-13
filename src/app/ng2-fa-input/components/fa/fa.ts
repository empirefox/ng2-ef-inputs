import { Component, Input } from '@angular/core';
import { StackFa, parse } from 'fa-tool';

@Component({
  selector: 'fa',
  templateUrl: './fa.html',
})
export class FaComponent {
  _fa: StackFa;

  @Input() get fa() { return this._fa; }
  set fa(fa: string | StackFa) {
    if (typeof fa === 'string') {
      this._fa = parse(fa);
    } else if (fa instanceof StackFa) {
      this._fa = fa;
    }
  }
}
