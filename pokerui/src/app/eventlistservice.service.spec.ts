import { TestBed } from '@angular/core/testing';

import { EventlistserviceService } from './eventlistservice.service';

describe('EventlistserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventlistserviceService = TestBed.get(EventlistserviceService);
    expect(service).toBeTruthy();
  });
});
