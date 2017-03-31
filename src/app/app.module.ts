import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ModalModule } from 'angular2-modal';
import { environment } from '../environments/environment';

import { Ng2AmapInputModule } from './ng2-amap-input';
import { Ng2ColorfulInputModule } from './ng2-colorful-input';
import { Ng2FaInputModule, FaNamesSource } from './ng2-fa-input';
import { Ng2PhoneInputModule, ISmsConfig } from './ng2-phone-input';
import { Ng2SvgPatternInputModule } from './ng2-pattern-input';
import { Ng2QiniuImageInputModule, QiniuConfig } from './ng2-qiniu-img-input';
import { Ng2SmdInputModule, setAmapKey } from './ng2-smd-input';
import { Ng2TriangifyInputModule } from './ng2-trianglify-input';

import { AmapInputModule } from './demo/amap-input/amap-input.module';
import { BgInputModule } from './demo/bg-input/bg-input.module';
import { ColorfulInputModule } from './demo/colorful-input/colorful-input.module';
import { FaInputModule } from './demo/fa-input/fa-input.module';
import { PatternInputModule } from './demo/pattern-input/pattern-input.module';
import { PhoneInputModule } from './demo/phone-input/phone-input.module';
import { QiniuImgInputModule } from './demo/qiniu-img-input/qiniu-img-input.module';
import { SmdInputModule } from './demo/smd-input/smd-input.module';
import { TrianglifyInputModule } from './demo/trianglify-input/trianglify-input.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { value as patterns } from './ng2-pattern-input/patterns';

setAmapKey(environment.amapKey);

export function faCss(http: Http) {
  let re = /@font-face\s*\{\s*font-family:\s*'FontAwesome'/;
  let list = document.querySelectorAll('head>style');
  for (let i = 0; i < list.length; ++i) {
    let text = list[i].textContent;
    if (re.test(text)) {
      return Observable.of(text);
    }
  }
  return Observable.of('');
}

export function uptokenUrl(key: string) { return `http://127.0.0.1:9999/qiniu/uptoken/${key}/1`; };
export function listUrl(prefix: string) { return `http://127.0.0.1:9999/qiniu/${prefix}`; };
export function deleteUrl(key: string) { return `http://127.0.0.1:9999/qiniu/${key}`; };
export function profileUptokenUrl(key: string) { return `http://127.0.0.1:9999/qiniu/headtoken/30`; };

export const smsConfig: ISmsConfig = {
  key: 'phone_sms',
  post: 'http://127.0.0.1:4200/assets/sms.json',
  seconds: 10,
};

export const qiniuConfigs: QiniuConfig[] = [
  {
    name: 'site',
    bucketDomain: 'http://7xtjjx.com2.z0.glb.qiniucdn.com/',
    thumbnailStyle: '-48x48',
    uptokenUrl,
    listUrl,
    deleteUrl,
  },
  {
    name: 'profile',
    bucketDomain: 'http://7xtjjx.com2.z0.glb.qiniucdn.com/',
    thumbnailStyle: '-48x48',
    cacheUptoken: true,
    uptokenUrl: profileUptokenUrl,
    // Not used
    // listUrl: (prefix: string) => `http://127.0.0.1:9999/qiniu/list/${prefix}`,
    // deleteUrl: (key: string) => `http://127.0.0.1:9999/qiniu/delete/${key}`,
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,

    ModalModule.forRoot(),
    Ng2AmapInputModule.forRoot(environment.amapKey),
    Ng2ColorfulInputModule.forRoot(),
    Ng2FaInputModule.forRoot({ css: faCss }),
    Ng2PhoneInputModule.forRoot(smsConfig),
    Ng2SvgPatternInputModule.forRoot(patterns),
    Ng2QiniuImageInputModule.forRoot(qiniuConfigs, Http),
    Ng2SmdInputModule.forRoot(),
    Ng2TriangifyInputModule.forRoot(),

    AmapInputModule,
    BgInputModule,
    ColorfulInputModule,
    FaInputModule,
    PatternInputModule,
    PhoneInputModule,
    QiniuImgInputModule,
    SmdInputModule,
    TrianglifyInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
