import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2AmapInputModule,
      providers: [
        AmapService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [AmapPickerModalComponent], multi: true },
      ],
    };
  }
}
