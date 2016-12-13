import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { By } from '@angular/platform-browser/src/dom/debug/by';
import { MockBackend } from '@angular/http/testing';

import { ColorfulDirective } from './colorful';

describe('ColorfulDirective', () => {
  @Component({
    template: `<div [colorful]="colorful"></div>`
  })
  class TestComponent {
    colorful = '4,z,2n,1j,3w,2i,1e,69,2n,1e,9g,2s,1j';
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColorfulDirective,
        TestComponent
      ]
    });
  });

  it('should set background', fakeAsync(() => {
    TestBed.compileComponents().then(() => {

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      tick();
      const element = fixture.debugElement.query(By.css('div'));

      expect(element.nativeElement.style.backgroundImage).toContain('linear-gradient');

    });
  }));

});

