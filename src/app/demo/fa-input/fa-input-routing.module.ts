import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaInputComponent } from './fa-input.component';

const routes: Routes = [
  { path: 'fa-input', component: FaInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FaInputRoutingModule { }
