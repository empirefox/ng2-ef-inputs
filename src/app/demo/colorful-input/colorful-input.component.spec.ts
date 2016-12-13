/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColorfulInputComponent } from './colorful-input.component';

describe('ColorfulInputComponent', () => {
  let component: ColorfulInputComponent;
  let fixture: ComponentFixture<ColorfulInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorfulInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorfulInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
