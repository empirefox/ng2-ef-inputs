import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Response } from '@angular/http';

import { Item } from '../services/item';
import { Qiniu, YEAR_ITEMS, MONTH_ITEMS } from '../services/qiniu.service';

@Component({
  selector: 'qiniu-icons-view',
  templateUrl: './qiniu-icons-view.html',
  styleUrls: ['./qiniu-icons-view.css'],
})
export class QiniuIconsViewComponent {
  @Input() qiniu: Qiniu;
  @Input() prefix: string = ''; // s/:siteid/

  @Output() select = new EventEmitter<Item>();
  @Output() delete = new EventEmitter<Item>();
  @Output() uploaded = new EventEmitter<Item>();

  items: Array<Item> = YEAR_ITEMS;

  private requesting: boolean;
  private error: string;
  private year: string;
  private month: string;

  get canUpload() {
    return this.qiniu.config.canUpload;
  }

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
    if (this.qiniu.config.canList) {
      this.requesting = true;
      this.qiniu.list(`${this.prefix}${this.year}/${this.month}/`).subscribe(items => {
        this.items = items;
        this.requesting = false;
      }, this.rxOnError.bind(this));
    } else {
      this.items = [];
      this.requesting = false;
    }
  }

  selectItem(item: Item) {
    this.select.next(item);
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
    this.uploaded.next(res);
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
    this.qiniu.delete(item.key).subscribe(_ => {
      let i = this.items.indexOf(item);
      if (i > -1) {
        this.items.splice(i, 1);
      }
      this.delete.next(item);
      this.requesting = false;
    }, this.rxOnError.bind(this));
  }

  trackByItems(i: number, item: Item) { return item.key; }
}
