import { Inject, Injectable, OpaqueToken, Optional } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from './item';
import { Uptoken } from './uptoken';

export interface IHttp {
  /**
   * Performs any type of http request. First argument is required, and can either be a url or
   * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
   * object can be provided as the 2nd argument. The options object will be merged with the values
   * of {@link BaseRequestOptions} before performing the request.
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: RequestOptionsArgs): Observable<Response>;
  /**
   * Performs a request with `options` http method.
   */
  options(url: string, options?: RequestOptionsArgs): Observable<Response>;
}

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

    let { uptoken, list, delete: del} = config;

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
    hash = hash ? `?v=${hash.slice(0,4)}` : '';
    return `${this.bucketDomain}${key}${hash}`;
  }

  styledUrl(key: string, hash?: string): string {
    hash = hash ? `?v=${hash.slice(0,4)}` : '';
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

export const QINIU_CONFIGS = new OpaqueToken('QiniuConfigs'); // QiniuConfig[]
export const QINIU_HTTP = new OpaqueToken('QiniuHttp'); // IHttp

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
