import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';
import { extractNamesFromCss } from 'fa-tool';

export const FA_NAMES_SRC = new OpaqueToken('fa-names');

export interface FaNamesSource {
    names?: string[];
    css?: string;
    url?: string;
}

@Injectable()
export class FaNamesService {
    private names$: Observable<string[]>;

    constructor(
        private http: Http,
        @Inject(FA_NAMES_SRC) private src: FaNamesSource) { }

    names(): Observable<string[]> {
        if (!this.names$) {
            if (this.src.names) {
                this.names$ = Observable.of(this.src.names);
            } else if (this.src.css) {
                this.names$ = Observable.of(extractNamesFromCss(this.src.css));
            } else if (this.src.url) {
                this.names$ = this.http.get(this.src.url).map(res => extractNamesFromCss(res.text())).publishReplay(1).refCount();
            } else {
                this.names$ = Observable.of([]);
            }
        }
        return this.names$;
    }
}
