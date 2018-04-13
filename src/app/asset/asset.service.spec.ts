import { TestBed, inject } from '@angular/core/testing';

import { AssetDetailService } from './asset-detail.service';

describe('AssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetService]
    });
  });

  it('should be created', inject([AssetService], (service: AssetService) => {
    expect(service).toBeTruthy();
  }));
});
