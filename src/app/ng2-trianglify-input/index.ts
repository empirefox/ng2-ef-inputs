import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// for standard export at bottom
import { TrianglifyWindowComponent } from './components/modal/modal';
import { PaletteComponent } from './components/palette/palette';
import { TriangifyInputComponent } from './components/trianglify-input/trianglify-input';
import { TrianglifyDirective } from './directives/trianglify';
import { TrianglifyRenderer, TrianglifyService } from './services';

// for manual imports
export * from './components/modal/modal';
export * from './components/trianglify-input/trianglify-input';
export * from './directives/trianglify';
export * from './core';
export * from './services';

// require css bootstrap/simple-line-icons/font-awesome
// require module ModalModule.forRoot()
@NgModule({
  declarations: [
    TrianglifyWindowComponent,
    PaletteComponent,
    TriangifyInputComponent,
    TrianglifyDirective,
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
    TrianglifyWindowComponent,
    PaletteComponent,
    TriangifyInputComponent,
    TrianglifyDirective,
  ],
})
export class Ng2TriangifyInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2TriangifyInputModule,
      providers: [
        TrianglifyRenderer,
        TrianglifyService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [TrianglifyWindowComponent], multi: true },
      ],
    };
  }
}
