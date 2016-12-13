/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrianglifyInputComponent } from './trianglify-input.component';

describe('TrianglifyInputComponent', () => {
  let component: TrianglifyInputComponent;
  let fixture: ComponentFixture<TrianglifyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrianglifyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrianglifyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
