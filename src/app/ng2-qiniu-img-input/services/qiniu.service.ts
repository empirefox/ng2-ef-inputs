import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import { Item } from './item';
import { QiniuConfig } from './qiniu-config';
import { Uptoken, IUptokenResponse } from './uptoken';

function createYearItem(year: number): Item {
  return {
    key: '' + year,
    type: 'year',
    icon: 'fa fa-folder-open-o fa-3x',
  };
}

function createMonthItem(month: number): Item {
  return {
    key: '' + month,
    type: 'month',
    icon: 'fa fa-folder-open-o fa-3x',
  };
}

let YEAR_ITEMS: Array<Item> = [];
let MONTH_ITEMS: Array<Item> = [];
let i;
for (i = new Date().getFullYear(); i > 2013; i--) {
  YEAR_ITEMS.push(createYearItem(i));
}
for (i = 12; i > 0; i--) {
  MONTH_ITEMS.push(createMonthItem(i));
}

export { YEAR_ITEMS, MONTH_ITEMS };

@Injectable()
export class QiniuService {
  private _uptoken: Observable<Uptoken>;

  constructor(private http: Http, private config: QiniuConfig) { }

  uptoken(): Observable<Uptoken> {
    if (this.config.uptoken) {
      return this.config.uptoken();
    }
    this._uptoken = (this._uptoken || Observable.of(null)).flatMap(token => {
      return token && token.valid() ? Observable.of(token) :
        this.http.get(this.config.uptokenUrl).map(res => new Uptoken(res.json()));
    }).publishReplay(1).refCount();
    return this._uptoken;
  }

  list(prefix: string): Observable<Array<Item>> {
    if (this.config.list) {
      return this.config.list(prefix);
    }
    return this.http.post(this.config.listUrl, JSON.stringify({ prefix })).map(res => res.json());
  }

  delete(key: string): Observable<any> {
    if (this.config.delete) {
      return this.config.delete(key);
    }
    return this.http.post(this.config.deleteUrl, JSON.stringify({ key }));
  }

  src(item: Item): string {
    return `${this.config.bucketDomain}${item.key}`;
  }

  srcThumbnail(item: Item): string {
    return `${this.config.bucketDomain}${item.key}${this.config.thumbnailStyle}`;
  }

}
