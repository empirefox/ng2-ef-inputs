import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrianglifyInputComponent } from './trianglify-input.component';
import { Ng2TriangifyInputModule } from 'ng2-trianglify-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2TriangifyInputModule,
  ],
  declarations: [TrianglifyInputComponent],
  exports: [TrianglifyInputComponent],
})
export class TrianglifyInputModule { }
