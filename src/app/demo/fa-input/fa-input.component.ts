import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { StackFa } from 'fa-tool';
import { FaSelectService } from 'ng2-fa-input';

@Component({
  selector: 'app-fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.css']
})
export class FaInputComponent implements OnInit {
  value: string;
  readonly = true;
  id = 'fa-id1';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private FaSelectService: FaSelectService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    this.FaSelectService.open(this.value).then(dialog => dialog.result.then((fa: StackFa) => this.value = fa.text()));
  }

}
