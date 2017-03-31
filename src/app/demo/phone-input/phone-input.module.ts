import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { PhoneInputComponent } from './phone-input.component';
import { Ng2PhoneInputModule } from '../../ng2-phone-input';
import { PhoneInputRoutingModule } from './phone-input-routing.module';

export function httpFactory(backend: MockBackend, options: BaseRequestOptions) {
  return new Http(backend, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PhoneInputModule,
    PhoneInputRoutingModule,
  ],
  declarations: [PhoneInputComponent],
  exports: [PhoneInputComponent],
  providers: [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [MockBackend, BaseRequestOptions],
    },
  ]
})
export class PhoneInputModule { }
