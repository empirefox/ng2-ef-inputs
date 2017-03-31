import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhoneInputComponent } from './phone-input.component';

const routes: Routes = [
  { path: 'phone-input', component: PhoneInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PhoneInputRoutingModule { }
