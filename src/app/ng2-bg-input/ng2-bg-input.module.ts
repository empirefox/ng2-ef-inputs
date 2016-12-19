import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2ColorfulInputModule } from 'ng2-colorful-input';
import { Ng2SvgPatternInputModule } from 'ng2-pattern-input';
import { Ng2QiniuImageInputModule } from 'ng2-qiniu-img-input';
import { Ng2TriangifyInputModule } from 'ng2-trianglify-input';

import { BgInputComponent } from './components';
import { BgDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2ColorfulInputModule,
    Ng2SvgPatternInputModule,
    Ng2QiniuImageInputModule,
    Ng2TriangifyInputModule,
  ],
  declarations: [
    BgInputComponent,
    BgDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    Ng2ColorfulInputModule,
    Ng2SvgPatternInputModule,
    Ng2QiniuImageInputModule,
    Ng2TriangifyInputModule,
    BgInputComponent,
    BgDirective,
  ],
})
export class Ng2BgInputModule { }
