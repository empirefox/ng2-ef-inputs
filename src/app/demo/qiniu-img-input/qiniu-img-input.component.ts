import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Item, QiniuImageService, Qiniu, QiniuService } from 'ng2-qiniu-img-input';

@Component({
  selector: 'app-qiniu-img-input',
  templateUrl: './qiniu-img-input.component.html',
  styleUrls: ['./qiniu-img-input.component.css']
})
export class QiniuImgInputComponent implements OnInit {
  value: string;
  readonly = true;
  id = 'qiniu-img-id1';

  site: Qiniu;
  sitePrefix: string = 's/10/'; // s/:siteid/

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private qiniuService: QiniuService,
    private qiniuImageService: QiniuImageService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
    this.site = this.qiniuService.get('site');
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    let profile = this.qiniuService.get('profile');
    this.qiniuImageService.open(profile.config.name, 'h/')
      .then(dialog => dialog.result.then((item: Item) => this.value = profile.config.url(item.key, item.hash)));
  }

  onUploaded(item: Item) {
    console.log('uploaded', item);
  }

  onSelect(item: Item) {
    console.log('onSelect', item);
  }

  onDeleted(item: Item) {
    console.log('onDeleted', item);
  }

}
