import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatternInputComponent } from './pattern-input.component';
import { Ng2SvgPatternInputModule } from '../../ng2-pattern-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SvgPatternInputModule,
  ],
  declarations: [PatternInputComponent],
  exports: [PatternInputComponent],
})
export class PatternInputModule { }
