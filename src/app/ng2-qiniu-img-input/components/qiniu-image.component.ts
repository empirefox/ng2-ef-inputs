import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { QiniuService } from '../services/qiniu.service';
import { Item } from '../services/item';

@Component({
  selector: 'qiniu-image',
  templateUrl: './qiniu-image.html',
  styleUrls: ['./qiniu-image.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QiniuImageComponent {

  @Output() select: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() public delete: EventEmitter<Item> = new EventEmitter<Item>();

  thumbnail: SafeStyle;

  private _item: Item;

  constructor(
    private sanitizer: DomSanitizer,
    private qiniuService: QiniuService) { }

  @Input() get item(): Item {
    return this._item;
  }

  set item(item: Item) {
    let unsafe = `url('${this.qiniuService.srcThumbnail(item)}')`;
    this.thumbnail = this.sanitizer.bypassSecurityTrustStyle(unsafe);
    this._item = item;
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
