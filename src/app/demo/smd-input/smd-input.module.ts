import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2FaInputModule } from '../../ng2-fa-input';
import { SmdInputComponent } from './smd-input.component';
import { Ng2SmdInputModule } from '../../ng2-smd-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2FaInputModule,
    Ng2SmdInputModule,
  ],
  declarations: [SmdInputComponent],
  exports: [SmdInputComponent],
})
export class SmdInputModule { }
