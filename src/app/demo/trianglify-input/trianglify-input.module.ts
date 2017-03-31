import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrianglifyInputComponent } from './trianglify-input.component';
import { Ng2TriangifyInputModule } from '../../ng2-trianglify-input';
import { TrianglifyInputRoutingModule } from './trianglify-input-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2TriangifyInputModule,
    TrianglifyInputRoutingModule,
  ],
  declarations: [TrianglifyInputComponent],
  exports: [TrianglifyInputComponent],
})
export class TrianglifyInputModule { }
