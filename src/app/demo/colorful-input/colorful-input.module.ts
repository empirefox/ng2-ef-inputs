import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorfulInputComponent } from './colorful-input.component';
import { Ng2ColorfulInputModule } from 'ng2-colorful-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2ColorfulInputModule,
  ],
  declarations: [ColorfulInputComponent],
  exports: [ColorfulInputComponent],
})
export class ColorfulInputModule { }
