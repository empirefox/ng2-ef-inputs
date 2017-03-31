import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2FaInputModule } from '../../ng2-fa-input';
import { SmdInputComponent } from './smd-input.component';
import { Ng2SmdInputModule } from '../../ng2-smd-input';
import { SmdInputRoutingModule } from './smd-input-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2FaInputModule,
    Ng2SmdInputModule,
    SmdInputRoutingModule,
  ],
  declarations: [SmdInputComponent],
  exports: [SmdInputComponent],
})
export class SmdInputModule { }
