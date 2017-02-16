import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TrianglifyService } from '../../ng2-trianglify-input';

@Component({
  selector: 'app-trianglify-input',
  templateUrl: './trianglify-input.component.html',
  styleUrls: ['./trianglify-input.component.css']
})
export class TrianglifyInputComponent implements OnInit {
  value = 'YlGn-30-0.3';
  readonly = true;
  id = 'trianglify-id1';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trianglifyService: TrianglifyService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    this.trianglifyService.open(this.value).then(dialog => dialog.result.then((value: string) => this.value = value));
  }

}
