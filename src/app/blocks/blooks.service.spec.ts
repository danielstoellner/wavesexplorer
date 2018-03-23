import { TestBed, inject } from '@angular/core/testing';

import { BlooksService } from './blooks.service';

describe('BlooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlooksService]
    });
  });

  it('should be created', inject([BlooksService], (service: BlooksService) => {
    expect(service).toBeTruthy();
  }));
});
