import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatternService } from '../../ng2-pattern-input';

@Component({
  selector: 'app-pattern-input',
  templateUrl: './pattern-input.component.html',
  styleUrls: ['./pattern-input.component.css']
})
export class PatternInputComponent implements OnInit {
  value = 'carbonfiber';
  readonly = true;
  id = 'pattern-id1';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patternService: PatternService) { }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onOpen() {
    this.patternService.open(this.value).then(dialog => dialog.result.then((value: string) => this.value = value));
  }

}
