import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorfulInputComponent } from './colorful-input.component';

const routes: Routes = [
  { path: 'colorful-input', component: ColorfulInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ColorfulInputRoutingModule { }
