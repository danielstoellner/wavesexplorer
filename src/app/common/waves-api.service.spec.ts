import { TestBed, inject } from '@angular/core/testing';

import { WavesApiService } from './waves-api.service';

describe('WavesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WavesApiService]
    });
  });

  it('should be created', inject([WavesApiService], (service: WavesApiService) => {
    expect(service).toBeTruthy();
  }));
});
