import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

// for standard export at bottom
import { FaWindowComponent, FaComponent, FaInputComponent } from './components';
import { FaNamesService, FaSelectService } from './services';

// for manual imports
export * from './components';
export * from './services';

// require css bootstrap/font-awesome
// require module ModalModule.forRoot()
@NgModule({
  declarations: [
    FaWindowComponent,
    FaComponent,
    FaInputComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ModalModule,
    BootstrapModalModule,
    ButtonsModule,
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ButtonsModule,
    FaWindowComponent,
    FaComponent,
    FaInputComponent,
  ],
})
export class Ng2FaInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2FaInputModule,
      providers: [
        FaNamesService,
        FaSelectService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [FaWindowComponent], multi: true },
      ],
    };
  }
}
