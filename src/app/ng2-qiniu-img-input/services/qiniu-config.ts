import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IHttp } from '../../common/http';
import { Item } from './item';
import { Uptoken } from './uptoken';
import { QINIU_CONFIGS, QINIU_HTTP } from './token';

export interface QiniuConfig {
  name: string;
  bucketDomain: string;
  thumbnailStyle: string; // '-48x48'
  cacheUptoken?: boolean;

  // should not call this if not set
  uptokenUrl?: (key?: string) => string;
  uptoken?: (http: IHttp, key?: string) => Observable<Uptoken>;

  // should not call this if not set
  listUrl?: (prefix: string) => string;
  list?: (http: IHttp, prefix: string) => Observable<Array<Item>>;

  // should not call this if not set
  deleteUrl?: (key: string) => string;
  delete?: (http: IHttp, key: string) => Observable<any>;
}

export class Config {
  name: string;
  bucketDomain: string;
  thumbnailStyle: string;
  cacheUptoken: boolean;

  uptokenUrl: (key?: string) => string;
  uptoken: (key?: string) => Observable<Uptoken>;

  listUrl: (prefix: string) => string;
  list: (prefix: string) => Observable<Array<Item>>;

  deleteUrl: (key: string) => string;
  delete: (key: string) => Observable<any>;

  constructor(
    public http: IHttp,
    config: QiniuConfig) {
    this.name = config.name;
    this.bucketDomain = config.bucketDomain;
    this.thumbnailStyle = config.thumbnailStyle || '';
    this.cacheUptoken = config.cacheUptoken;
    this.uptokenUrl = config.uptokenUrl;
    this.listUrl = config.listUrl;
    this.deleteUrl = config.deleteUrl;

    let { uptoken, list, delete: del } = config;

    if (uptoken) {
      this.uptoken = (key?: string) => { return uptoken(this.http, key); };
    }
    if (list) {
      this.list = (prefix: string) => { return list(this.http, prefix); };
    }
    if (del) {
      this.delete = (key?: string) => { return del(this.http, key); };
    }
  }

  url(key: string, hash?: string): string {
    hash = hash ? `?v=${hash.slice(0, 4)}` : '';
    return `${this.bucketDomain}${key}${hash}`;
  }

  styledUrl(key: string, hash?: string): string {
    hash = hash ? `?v=${hash.slice(0, 4)}` : '';
    return `${this.bucketDomain}${key}${this.thumbnailStyle}${hash}`;
  }

  get canUpload(): boolean {
    return !!(this.uptoken || this.uptokenUrl);
  }

  get canList(): boolean {
    return !!(this.list || this.listUrl);
  }

  get canDelete(): boolean {
    return !!(this.delete || this.deleteUrl);
  }
}

@Injectable()
export class QiniuConfigService {
  map: { [key: string]: Config } = {};
  private http: IHttp;

  constructor(
    http: Http,
    @Inject(QINIU_CONFIGS) configs: QiniuConfig[],
    @Optional() @Inject(QINIU_HTTP) ihttp: IHttp) {
    this.http = ihttp || http;
    configs.forEach(config => this.map[config.name] = new Config(this.http, config));
  }

  get(name: string): Config {
    if (!(name in this.map)) {
      throw new Error(`Qiniu(${name}) not configured!`);
    }
    return this.map[name];
  }
}
