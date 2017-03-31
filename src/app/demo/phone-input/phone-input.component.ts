import { Component, OnInit } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ResponseOptions, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css']
})
export class PhoneInputComponent implements OnInit {
  start = 'Send SMS to phone';
  payload = { seconds: 5 };

  value = '13812345678';
  readonly = true;
  id = 'phone-id1';
  form: FormGroup;

  private sub: any;

  constructor(
    private fb: FormBuilder,
    private backend: MockBackend) { }

  ngOnInit() {
    this.sub = this.backend.connections.subscribe((c: MockConnection) => {
      console.log('Connection mocked by MockBackend!');
      const seconds: number = c.request.json().seconds;
      const unix = seconds ? Math.floor(new Date().getTime() / 1000) + seconds : 0;
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ unix })
      })));
    });
    this.form = this.fb.group({ value: [this.value] });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
