import { Component, Output, Input, EventEmitter } from '@angular/core';

import { QiniuService } from '../services/qiniu.service';
import { Item } from '../services/item';

@Component({
  selector: 'qiniu-folder',
  templateUrl: './qiniu-folder.html',
})
export class QiniuFolderComponent {

  @Input() item: Item;

  @Output() select: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private qiniuService: QiniuService) { }

  onSelect(item: Item) {
    this.select.next(item);
  }

}
