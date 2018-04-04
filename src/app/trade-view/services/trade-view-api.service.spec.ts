import { TestBed, inject } from '@angular/core/testing';

import { TradeViewApiService } from './trade-view-api.service';

describe('TradeViewApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradeViewApiService]
    });
  });

  it('should be created', inject([TradeViewApiService], (service: TradeViewApiService) => {
    expect(service).toBeTruthy();
  }));
});
