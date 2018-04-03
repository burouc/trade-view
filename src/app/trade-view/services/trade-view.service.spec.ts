import { TestBed, inject } from '@angular/core/testing';

import { TradeViewService } from './trade-view.service';

describe('TradeViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradeViewService]
    });
  });

  it('should be created', inject([TradeViewService], (service: TradeViewService) => {
    expect(service).toBeTruthy();
  }));
});
