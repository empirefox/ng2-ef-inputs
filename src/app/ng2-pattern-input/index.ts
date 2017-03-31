import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// for standard export at bottom
import { PatternWindowComponent, PatternInputComponent } from './components';
import { SvgPatternDirective } from './directives';
import { PatternsService, PatternService, BasePattern } from './services';
import { SVG_PATTERNS } from './services/token';

// for manual imports
export * from './components';
export * from './directives';
export * from './services';

// require css bootstrap/simple-line-icons/font-awesome
// require module ModalModule.forRoot()
@NgModule({
  declarations: [
    PatternWindowComponent,
    PatternInputComponent,
    SvgPatternDirective,
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
    PatternWindowComponent,
    PatternInputComponent,
    SvgPatternDirective,
  ],
})
export class Ng2SvgPatternInputModule {
  static forRoot(patterns: BasePattern[]): ModuleWithProviders {
    return {
      ngModule: Ng2SvgPatternInputModule,
      providers: [
        PatternsService,
        PatternService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [PatternWindowComponent], multi: true },
        { provide: SVG_PATTERNS, useValue: patterns },
      ],
    };
  }
}
