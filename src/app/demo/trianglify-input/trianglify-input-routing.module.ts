import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrianglifyInputComponent } from './trianglify-input.component';

const routes: Routes = [
  { path: 'trianglify-input', component: TrianglifyInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrianglifyInputRoutingModule { }
