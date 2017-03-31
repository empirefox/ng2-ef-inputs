import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FaInputComponent } from './fa-input.component';
import { Ng2FaInputModule } from '../../ng2-fa-input';
import { FaInputRoutingModule } from './fa-input-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2FaInputModule,
    FaInputRoutingModule,
  ],
  declarations: [FaInputComponent],
  exports: [FaInputComponent],
})
export class FaInputModule { }
