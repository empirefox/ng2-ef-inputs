/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaInputComponent } from './fa-input.component';

describe('FaInputComponent', () => {
  let component: FaInputComponent;
  let fixture: ComponentFixture<FaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
