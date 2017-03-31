import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BgInputComponent } from './bg-input.component';

const routes: Routes = [
  { path: 'bg-input', component: BgInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BgInputRoutingModule { }
