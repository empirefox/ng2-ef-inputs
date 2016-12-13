import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Response } from '@angular/http';

import { Item } from '../services/item';
import { QiniuService, YEAR_ITEMS, MONTH_ITEMS } from '../services/qiniu.service';
import { QiniuConfig } from '../services/qiniu-config';
import { QiniuImageComponent } from './qiniu-image.component';
import { QiniuFolderComponent } from './qiniu-folder.component';
import { DropzoneDirective } from '../directives/dropzone.directive';

@Component({
  selector: 'qiniu-icons-view',
  templateUrl: './qiniu-icons-view.html',
  styleUrls: ['./qiniu-icons-view.css'],
})
export class QiniuIconsViewComponent implements OnInit {

  @Output() public select: EventEmitter<string> = new EventEmitter<string>();
  @Output() public delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() public uploaded: EventEmitter<string> = new EventEmitter<string>();

  items: Array<Item> = YEAR_ITEMS;

  private requesting: boolean;
  private error: string;
  private year: string;
  private month: string;

  constructor(
    private elementRef: ElementRef,
    private qiniu: QiniuConfig,
    private qiniuService: QiniuService) { }

  ngOnInit() { }

  listYears() {
    this.error = '';
    this.items = YEAR_ITEMS;
    this.year = null;
    this.month = null;
  }

  listMonths(year: string) {
    this.error = '';
    this.year = year;
    this.month = null;
    this.items = MONTH_ITEMS;
  }

  listImages(month: string) {
    this.error = '';
    this.month = month;
    if (!this.month || !this.year) {
      return;
    }
    this.requesting = true;
    this.qiniuService.list(`${this.year}/${this.month}/`).subscribe(items => {
      this.items = items;
      this.requesting = false;
    }, this.rxOnError.bind(this));
  }

  selectItem(item: Item) {
    this.select.next(item.key);
  }

  rxOnError(err: any) {
    this.requesting = false;
    if (err instanceof Response) {
      this.error = err.status === 200 ? 'Cannot connect to server.' : 'Failed to get data from server';
    } else if (err instanceof Error) {
      this.error = `Error: ${err.message}`;
    } else {
      this.error = `Error: ${err.toString()}`;
    }
  }

  onUpSuccess(res: Item) {
    this.error = '';
    this.items.unshift(res);
    this.uploaded.next(res.key);
  }

  onUpFail(err) {
    this.error = err.toString() || 'Upload failed';
    this.requesting = false;
  }

  onSelect(item: Item) {
    switch (item.type) {
      case 'year':
        this.listMonths(item.key);
        break;
      case 'month':
        this.listImages(item.key);
        break;
      default:
        this.selectItem(item);
    }
  }

  onDelete(item: Item) {
    this.error = '';
    this.requesting = true;
    this.qiniuService.delete(item.key).subscribe(_ => {
      let i = this.items.indexOf(item);
      if (i > -1) {
        this.items.splice(i, 1);
      }
      this.delete.next(item.key);
      this.requesting = false;
    }, this.rxOnError.bind(this));
  }

  trackByItems(i: number, item: Item) { return item.key; }
}
