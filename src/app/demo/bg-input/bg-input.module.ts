import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BgInputModule } from '../../ng2-bg-input';
import { BgInputComponent } from './bg-input.component';
import { BgInputRoutingModule } from './bg-input-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2BgInputModule,
    BgInputRoutingModule,
  ],
  declarations: [BgInputComponent],
  exports: [BgInputComponent],
})
export class BgInputModule { }
