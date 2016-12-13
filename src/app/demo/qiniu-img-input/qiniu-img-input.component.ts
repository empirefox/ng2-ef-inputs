import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { QiniuImageService } from '../../ng2-qiniu-img-input';

@Component({
  selector: 'app-qiniu-img-input',
  templateUrl: './qiniu-img-input.component.html',
  styleUrls: ['./qiniu-img-input.component.css']
})
export class QiniuImgInputComponent implements OnInit {
  value: string;
  readonly = true;
  id = 'qiniu-img-id1';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private qiniuImageService: QiniuImageService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    this.qiniuImageService.open().then(dialog => dialog.result.then((src: string) => this.value = src));
  }

  onUploaded(key: string) {
    console.log('uploaded', key);
  }

  onSelect(key: string) {
    console.log('onSelect', key);
  }

  onDeleted(key: string) {
    console.log('onDeleted', key);
  }

}
