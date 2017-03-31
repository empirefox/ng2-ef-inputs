import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';
import { extractNamesFromCss } from 'fa-tool';
import { FaNamesSource } from './fa-names-source';
import { FA_NAMES_SRC } from './token';

@Injectable()
export class FaNamesService {
    private names$: Observable<string[]>;

    constructor(
        private http: Http,
        @Inject(FA_NAMES_SRC) private src: FaNamesSource) { }

    names(): Observable<string[]> {
        if (!this.names$) {
            if (this.src.names) {
                this.names$ = typeof this.src.names === 'function' ? this.src.names(this.http) : Observable.of(this.src.names);
            } else if (this.src.css) {
                this.names$ = typeof this.src.css === 'function' ? this.src.css(this.http).map(css => extractNamesFromCss(css)) :
                    Observable.of(extractNamesFromCss(this.src.css));
            } else if (this.src.url) {
                this.names$ = this.http.get(this.src.url).map(res => extractNamesFromCss(res.text())).publishReplay(1).refCount();
            } else {
                this.names$ = Observable.of([]);
            }
        }
        return this.names$;
    }
}
