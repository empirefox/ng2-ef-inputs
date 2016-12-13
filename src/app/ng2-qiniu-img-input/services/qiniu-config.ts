import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Item } from './item';
import { Uptoken } from './uptoken';

@Injectable()
export class QiniuConfig {
  uptokenUrl?: string;
  listUrl?: string;
  deleteUrl?: string;
  bucketDomain: string;
  thumbnailStyle: string;

  uptoken?: () => Observable<Uptoken>;
  list?: (prefix: string) => Observable<Array<Item>>;
  delete?: (key: string) => Observable<any>;
}
