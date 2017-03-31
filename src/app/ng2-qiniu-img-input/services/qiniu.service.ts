import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import { IHttp } from '../../common/http';
import { Item } from './item';
import { Config, QiniuConfigService } from './qiniu-config';
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

export class Qiniu {
  private http: IHttp;
  private _uptoken: Observable<Uptoken>;
  private uptokens: Observable<{ [key: string]: Uptoken }> = Observable.of({});

  constructor(public config: Config) {
    this.http = config.http;
  }

  // key=s/:siteid/2017/01/abc.png
  uptoken(key?: string): Observable<Uptoken> {
    key = key ? btoa(key) : key;
    if (this.config.uptoken) {
      return this.config.uptoken(key);
    }

    let fn = this.config.uptokenUrl;
    if (!fn) {
      return Observable.throw(new Error(`uptokenUrl not set in config[${this.config.name}]`));
    }

    if (!this.config.cacheUptoken) {
      return this.http.get(fn(key)).map(res => new Uptoken(res.json()));
    }

    return this.uptokens.mergeMap(uptokens => {
      let token = uptokens[key];
      return token && token.valid() ? Observable.of(token) :
        this.http.get(fn(key)).map(res => uptokens[key] = new Uptoken(res.json())).publishReplay(1).refCount();
    });
  }

  // prefix=s/:siteid/2017/01/
  list(prefix: string): Observable<Array<Item>> {
    prefix = prefix ? btoa(prefix) : prefix;
    if (this.config.list) {
      return this.config.list(prefix);
    }
    let fn = this.config.listUrl;
    if (!fn) {
      return Observable.throw(new Error(`listUrl not set in config[${this.config.name}]`));
    }
    return this.http.post(fn(prefix), JSON.stringify({ prefix })).map(res => res.json());
  }

  // key=s/:siteid/2017/01/abc.png
  delete(key: string): Observable<any> {
    key = key ? btoa(key) : key;
    if (this.config.delete) {
      return this.config.delete(key);
    }
    let fn = this.config.deleteUrl;
    if (!fn) {
      return Observable.throw(new Error(`deleteUrl not set in config[${this.config.name}]`));
    }
    return this.http.delete(fn(key));
  }

}

@Injectable()
export class QiniuService {
  services: { [key: string]: Qiniu } = {};

  constructor(private configService: QiniuConfigService) {
    Object.keys(configService.map).forEach(name => this.services[name] = new Qiniu(configService.map[name]));
  }

  get(name: string): Qiniu {
    if (!(name in this.services)) {
      throw new Error(`Qiniu(${name}) not configured!`);
    }
    return this.services[name];
  }
}
