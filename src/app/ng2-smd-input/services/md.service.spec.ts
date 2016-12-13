/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MdService } from './md.service';

describe('MdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdService]
    });
  });

  it('should ...', inject([MdService], (service: MdService) => {
    expect(service).toBeTruthy();
  }));
});
