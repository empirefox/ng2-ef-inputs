import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QiniuImgInputComponent } from './qiniu-img-input.component';
import { Ng2QiniuImageInputModule } from 'ng2-qiniu-img-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2QiniuImageInputModule,
  ],
  declarations: [QiniuImgInputComponent],
  exports: [QiniuImgInputComponent],
})
export class QiniuImgInputModule { }
