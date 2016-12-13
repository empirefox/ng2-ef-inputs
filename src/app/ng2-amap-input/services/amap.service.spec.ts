/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AmapService } from './amap.service';

describe('AmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmapService]
    });
  });

  it('should ...', inject([AmapService], (service: AmapService) => {
    expect(service).toBeTruthy();
  }));
});
