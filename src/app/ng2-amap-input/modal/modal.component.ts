import { Component, AfterViewInit, ViewChild, ElementRef, Inject, Optional, Renderer } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

const qs = require('querystringify');

import { AmapPickerOptions, AmapLocation, AMAP_PICKER_OPTIONS, AMAP_KEY, parseAmap, stringifyAmap } from '../amap';

export class AmapPickerModalData extends BSModalContext {
  public amap: AmapLocation | string;
}

@Component({
  selector: 'amap-picker-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class AmapPickerModalComponent implements ModalComponent<AmapPickerModalData>, AfterViewInit {

  @ViewChild('iframe') iframe: ElementRef;

  amap: AmapLocation;

  private inited: boolean;
  private source: Observable<MessageEvent>;
  private sub: Subscription;

  constructor(
    @Inject(AMAP_KEY) private key: string,
    @Optional() @Inject(AMAP_PICKER_OPTIONS) private options: AmapPickerOptions,
    private renderer: Renderer,
    public dialog: DialogRef<AmapPickerModalData>) { }

  ngOnInit() {
    let amap = this.dialog.context.amap;
    this.amap = typeof amap === 'string' ? parseAmap(amap) : amap;
    let center = this.amap && this.amap.location && { center: this.amap.location };
    this.options = Object.assign({ key: this.key }, this.options, center);
    let query = qs.stringify(this.options, true);
    this.renderer.setElementProperty(this.iframe.nativeElement, 'src', `https://m.amap.com/picker/${query}`);
  }

  ngAfterViewInit() {
    this.inited = true;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onIframeLoad() {
    if (this.inited) {
      setTimeout(() => {
        this.iframe.nativeElement.contentWindow.postMessage('hello', 'https://m.amap.com/picker/');
        if (this.sub) {
          this.sub.unsubscribe();
        }
        this.source = Observable.fromEvent<MessageEvent>(window, 'message');
        this.sub = this.source.subscribe(this.receiveMessage.bind(this));
      }, 500);
    }
  }

  onOk() {
    this.dialog.close(stringifyAmap(this.amap));
  }

  receiveMessage(event: MessageEvent) {
    if (event.origin !== 'https://m.amap.com') {
      return;
    }
    this.amap = event.data;
  };
}

