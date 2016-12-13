/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrianglifyService } from './trianglify.service';

describe('TrianglifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrianglifyService]
    });
  });

  it('should ...', inject([TrianglifyService], (service: TrianglifyService) => {
    expect(service).toBeTruthy();
  }));
});
