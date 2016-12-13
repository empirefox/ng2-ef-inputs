import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// for standard export at bottom
import { ColorfulWindowComponent } from './components/modal/modal';
import { ColorfulInputComponent } from './components/colorful-input/colorful-input';
import { ColorfulDirective } from './directives/colorful';
import { ColorfulPipe } from './pipes/colorful.pipe';
import { ColorfulService } from './services/colorful.service';

// for manual imports
export * from './components/modal/modal';
export * from './components/colorful-input/colorful-input';
export * from './directives/colorful';
export * from './pipes/colorful.pipe';
export * from './services/colorful.service';

// require css bootstrap/simple-line-icons/font-awesome
// require module ModalModule.forRoot()
@NgModule({
  declarations: [
    ColorfulWindowComponent,
    ColorfulInputComponent,
    ColorfulDirective,
    ColorfulPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    BootstrapModalModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ColorfulWindowComponent,
    ColorfulInputComponent,
    ColorfulDirective,
    ColorfulPipe,
  ],
})
export class Ng2ColorfulInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2ColorfulInputModule,
      providers: [
        ColorfulService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [ColorfulWindowComponent], multi: true },
      ],
    };
  }
}
