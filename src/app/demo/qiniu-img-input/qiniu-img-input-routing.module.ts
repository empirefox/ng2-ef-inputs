import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QiniuImgInputComponent } from './qiniu-img-input.component';

const routes: Routes = [
  { path: 'qiniu-img-input', component: QiniuImgInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QiniuImgInputRoutingModule { }
