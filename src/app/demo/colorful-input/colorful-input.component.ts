import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ColorfulService } from 'ng2-colorful-input';

@Component({
  selector: 'app-colorful-input',
  templateUrl: './colorful-input.component.html',
  styleUrls: ['./colorful-input.component.css']
})
export class ColorfulInputComponent implements OnInit {
  value = '4,z,2n,1j,3w,2i,1e,69,2n,1e,9g,2s,1j';
  readonly = true;
  id = 'colorful-id1';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private colorfulService: ColorfulService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    this.colorfulService.open(this.value).then(dialog => dialog.result.then((value: string) => this.value = value));
  }

}
