import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SmdInputComponent } from './smd-input.component';

const routes: Routes = [
  { path: 'smd-input', component: SmdInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SmdInputRoutingModule { }
