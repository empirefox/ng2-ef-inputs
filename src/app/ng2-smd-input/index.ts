import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// for standard export at bottom
import { SmdContentComponent, SmdInputComponent } from './components';
import { MdService } from './services/md.service';

// for manual imports
export * from './components';
export * from './md';
export * from './services/md.service';

// require css simplemde
@NgModule({
  declarations: [
    SmdContentComponent,
    SmdInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    SmdContentComponent,
    SmdInputComponent,
  ],
})
export class Ng2SmdInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2SmdInputModule,
      providers: [
        MdService,
      ],
    };
  }
}
