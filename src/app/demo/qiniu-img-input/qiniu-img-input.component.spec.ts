/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QiniuImgInputComponent } from './qiniu-img-input.component';

describe('QiniuImgInputComponent', () => {
  let component: QiniuImgInputComponent;
  let fixture: ComponentFixture<QiniuImgInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiniuImgInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiniuImgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
