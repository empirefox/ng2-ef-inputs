import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FaInputComponent } from './fa-input.component';
import { Ng2FaInputModule } from 'ng2-fa-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2FaInputModule,
  ],
  declarations: [FaInputComponent],
  exports: [FaInputComponent],
})
export class FaInputModule { }
