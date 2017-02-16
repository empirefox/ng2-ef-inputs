import { Component, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { StackFa } from 'fa-tool';
import { FaSelectService } from '../../ng2-fa-input';
import { MdeCallback } from '../../ng2-smd-input';

@Component({
  selector: 'app-smd-input',
  templateUrl: './smd-input.component.html',
  styleUrls: ['./smd-input.component.css']
})
export class SmdInputComponent implements OnInit {
  value: string = `:fa-circle-o---user--spin:

  @[amap](102.99517,29.98106,my place,my address)

[tttttttttttttt](https://octodex.github.com/images/minion.png)

https://octodex.github.com/images/minion.png

@[qq](p0348kmcht9)

\`# aaa\`

:smile:

::: !!!!
# *dsfsfsdf*
:::

![](https://octodex.github.com/images/minion.png)`;

  form: FormGroup;

  constructor(
    private faSelectService: FaSelectService,
    private fb: FormBuilder,
    overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.form = this.fb.group({ value: [this.value] });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onFullscreen(on: boolean) {
    console.log('fullscreen is', on);
  }

  onAddLink(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddImage(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddMaps(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddVideo(cb: MdeCallback) {
    this.prompt(cb);
  }

  onAddFa(cb: MdeCallback) {
    this.faSelectService.open().then(dialog => dialog.result.then((fa: StackFa) => fa && cb(fa.text())));
  }

  onAddEmoji(cb: MdeCallback) {
    this.prompt((text: string) => cb(text.startsWith(':') ? text : `:${text}:`));
  }

  prompt(cb: MdeCallback) {
    this.modal.prompt()
      .size('lg')
      .title('A simple Prompt style modal window')
      .body('Please type a value!')
      .open().then(dialog => dialog.result.then((text: string) => text && cb(text)));
  }

}

