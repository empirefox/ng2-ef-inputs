/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmdInputComponent } from './smd-input.component';

describe('SmdInputComponent', () => {
  let component: SmdInputComponent;
  let fixture: ComponentFixture<SmdInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmdInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
