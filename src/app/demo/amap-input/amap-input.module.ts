import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AmapInputComponent } from './amap-input.component';
import { Ng2AmapInputModule } from '../../ng2-amap-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2AmapInputModule,
  ],
  declarations: [AmapInputComponent],
  exports: [AmapInputComponent],
})
export class AmapInputModule { }
