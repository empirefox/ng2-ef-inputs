import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatternInputComponent } from './pattern-input.component';

const routes: Routes = [
  { path: 'pattern-input', component: PatternInputComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PatternInputRoutingModule { }
