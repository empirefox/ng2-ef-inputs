import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Item, QiniuImageService, Qiniu, QiniuService } from '../../ng2-qiniu-img-input';

@Component({
  selector: 'app-bg-input',
  templateUrl: './bg-input.component.html',
  styleUrls: ['./bg-input.component.css']
})
export class BgInputComponent implements OnInit {
  value = 'bg-colorful:4,z,2n,1j,3w,2i,1e,69,2n,1e,9g,2s,1j';
  readonly = true;

  qiniu: Qiniu;
  prefix = 's/11/'; // s/:siteid/

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private qiniuService: QiniuService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
    this.qiniu = this.qiniuService.get('site');
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
