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

import { TrianglifyDirective } from './trianglify';

describe('ColorfulDirective', () => {
  @Component({
    template: `<div [trianglify]="trianglify" style="width:100px;height:100px"></div>`
  })
  class TestComponent {
    trianglify = 'YlGn,100,0.3';
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrianglifyDirective,
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

      expect(element.nativeElement.style.background).toContain('</svg>');

    });
  }));

});

