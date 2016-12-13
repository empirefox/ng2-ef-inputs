import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AmapService } from 'ng2-amap-input';

@Component({
  selector: 'app-amap-input',
  templateUrl: './amap-input.component.html',
  styleUrls: ['./amap-input.component.css']
})
export class AmapInputComponent implements OnInit {
  value = 'amap:102.99517,29.98106,my place,my address';
  readonly = true;
  id = 'amap-id1';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private amapService: AmapService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    this.amapService.open(this.value).then(dialog => dialog.result.then((value: string) => this.value = value));
  }

}
