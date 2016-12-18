/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatternInputComponent } from './pattern-input.component';

describe('PatternInputComponent', () => {
  let component: PatternInputComponent;
  let fixture: ComponentFixture<PatternInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
