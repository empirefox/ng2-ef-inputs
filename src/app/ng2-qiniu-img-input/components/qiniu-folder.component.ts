import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Item } from '../services/item';

@Component({
  selector: 'qiniu-folder',
  templateUrl: './qiniu-folder.html',
})
export class QiniuFolderComponent {

  @Input() item: Item;

  @Output() select: EventEmitter<Item> = new EventEmitter<Item>();

  onSelect(item: Item) {
    this.select.next(item);
  }

}
