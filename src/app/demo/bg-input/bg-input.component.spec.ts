/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BgInputComponent } from './bg-input.component';

describe('BgInputComponent', () => {
  let component: BgInputComponent;
  let fixture: ComponentFixture<BgInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
