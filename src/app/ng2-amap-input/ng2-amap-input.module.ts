import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AMAP_KEY, AMAP_PICKER_OPTIONS, AmapPickerOptions } from './amap';
import { Ng2AmapInputComponent } from './input/input.component';
import { AmapPickerModalComponent } from './modal/modal.component';
import { AmapService } from './services/amap.service';
import { NaviDirective } from './navi/navi.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    BootstrapModalModule,
  ],
  declarations: [
    Ng2AmapInputComponent,
    AmapPickerModalComponent,
    NaviDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalModule,
    BootstrapModalModule,
    Ng2AmapInputComponent,
    AmapPickerModalComponent,
    NaviDirective,
  ],
})
export class Ng2AmapInputModule {
  static forRoot(amapKey: string, options?: AmapPickerOptions): ModuleWithProviders {
    return {
      ngModule: Ng2AmapInputModule,
      providers: [
        AmapService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [AmapPickerModalComponent], multi: true },
        { provide: AMAP_KEY, useValue: amapKey },
        { provide: AMAP_PICKER_OPTIONS, useValue: options },
      ],
    };
  }
}
