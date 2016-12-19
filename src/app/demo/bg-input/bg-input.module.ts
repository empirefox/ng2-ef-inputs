import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BgInputModule } from '../../ng2-bg-input';
import { BgInputComponent } from './bg-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2BgInputModule,
  ],
  declarations: [BgInputComponent],
  exports: [BgInputComponent],
})
export class BgInputModule { }
