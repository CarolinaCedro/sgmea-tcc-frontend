import { TestBed } from '@angular/core/testing';

import { SgmeaLoadingService } from './sgmea-loading.service';

describe('SgmeaLoadingService', () => {
  let service: SgmeaLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgmeaLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
