import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Qiniu, QiniuService } from '../services/qiniu.service';
import { Item } from '../services/item';

@Component({
  selector: 'qiniu-image',
  templateUrl: './qiniu-image.html',
  styleUrls: ['./qiniu-image.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QiniuImageComponent {
  @Input() qiniu: Qiniu;

  @Output() select: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() delete: EventEmitter<Item> = new EventEmitter<Item>();

  thumbnail: SafeStyle;

  private _item: Item;

  constructor(private sanitizer: DomSanitizer) { }

  @Input() get item(): Item {
    return this._item;
  }

  set item(item: Item) {
    let unsafe = `url('${this.qiniu.config.styledUrl(item.key, item.hash)}')`;
    this.thumbnail = this.sanitizer.bypassSecurityTrustStyle(unsafe);
    this._item = item;
  }

  get canDelete() {
    return this.qiniu.config.canDelete;
  }

  onSelect(item: Item) {
    this.select.next(item);
    return false;
  }

  onDelete(item: Item) {
    this.delete.next(item);
    return false;
  }

}
