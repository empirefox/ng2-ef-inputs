/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ColorfulService } from './colorful.service';

describe('ColorfulService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorfulService]
    });
  });

  it('should ...', inject([ColorfulService], (service: ColorfulService) => {
    expect(service).toBeTruthy();
  }));
});
