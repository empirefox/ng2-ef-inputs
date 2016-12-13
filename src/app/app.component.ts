import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay } from 'angular2-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  constructor(overlay: Overlay, vcRef: ViewContainerRef) {
    overlay.defaultViewContainer = vcRef;
  }

}
