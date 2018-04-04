import { TestBed, inject } from '@angular/core/testing';

import { AlersService } from './alers.service';

describe('AlersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlersService]
    });
  });

  it('should be created', inject([AlersService], (service: AlersService) => {
    expect(service).toBeTruthy();
  }));
});
