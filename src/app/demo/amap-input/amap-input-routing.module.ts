import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AmapInputComponent } from './amap-input.component';

const routes: Routes = [
  { path: 'amap-input', component: AmapInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AmapInputRoutingModule { }
