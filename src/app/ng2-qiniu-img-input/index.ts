import { NgModule, ModuleWithProviders, Type, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { IHttp } from '../common/http';

// for standard export at bottom
import { DropzoneDirective } from './directives/dropzone.directive';
import {
  QiniuIconsViewComponent,
  QiniuFolderComponent,
  QiniuImageComponent,
  QiniuIconsWindowComponent,
  QiniuImageInputComponent,
} from './components';
import { QiniuConfigService, QiniuConfig } from './services/qiniu-config';
import { QiniuService } from './services/qiniu.service';
import { QiniuImageService } from './services/qiniu-image.service';
import { QINIU_CONFIGS, QINIU_HTTP } from './services/token';

// for manual imports
export * from './components';
export * from './services/item';
export * from './services/qiniu.service';
export * from './services/qiniu-image.service';
export * from './services/qiniu-config';

// require css bootstrap/font-awesome
// require module ModalModule.forRoot()
// add QiniuImageInputModule, QiniuConfig to root component
@NgModule({
  declarations: [
    DropzoneDirective,
    QiniuIconsViewComponent,
    QiniuFolderComponent,
    QiniuImageComponent,
    QiniuIconsWindowComponent,
    QiniuImageInputComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ModalModule,
    BootstrapModalModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule,
    DropzoneDirective,
    QiniuIconsViewComponent,
    QiniuIconsWindowComponent,
    QiniuImageInputComponent,
  ],
})
export class Ng2QiniuImageInputModule {
  static forRoot(configs: QiniuConfig[], http?: Type<IHttp>): ModuleWithProviders {
    return {
      ngModule: Ng2QiniuImageInputModule,
      providers: [
        QiniuConfigService,
        QiniuService,
        QiniuImageService,
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [QiniuIconsWindowComponent], multi: true },
        { provide: QINIU_CONFIGS, useValue: configs },
        { provide: QINIU_HTTP, useExisting: http || Http },
      ],
    };
  }
}
