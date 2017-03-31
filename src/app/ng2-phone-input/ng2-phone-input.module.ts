import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ng-countdownjs';
import { PhoneInputComponent } from './input/input.component';

import { ISmsConfig } from './config';
import { IHttp } from '../common/http';
import { SMS_CONFIG, SMS_HTTP } from './token';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    CountdownModule,
  ],
  declarations: [
    PhoneInputComponent,
  ],
  exports: [
    HttpModule,
    ReactiveFormsModule,
    CountdownModule,
    PhoneInputComponent,
  ]
})
export class Ng2PhoneInputModule {
  static forRoot(config: ISmsConfig, http?: Type<IHttp>): ModuleWithProviders {
    return {
      ngModule: Ng2PhoneInputModule,
      providers: [
        { provide: SMS_CONFIG, useValue: config },
        { provide: SMS_HTTP, useExisting: http || Http },
      ],
    };
  }
}
