import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface FaNamesSource {
  names?: string[] | ((http: Http) => Observable<string[]>);
  css?: string | ((http: Http) => Observable<string>);
  url?: string;
}