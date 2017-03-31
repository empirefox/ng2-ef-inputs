import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorfulInputComponent } from './colorful-input.component';
import { Ng2ColorfulInputModule } from '../../ng2-colorful-input';
import { ColorfulInputRoutingModule } from './colorful-input-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2ColorfulInputModule,
    ColorfulInputRoutingModule,
  ],
  declarations: [ColorfulInputComponent],
  exports: [ColorfulInputComponent],
})
export class ColorfulInputModule { }
