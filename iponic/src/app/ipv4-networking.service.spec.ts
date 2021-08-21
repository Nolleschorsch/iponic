import { TestBed } from '@angular/core/testing';

import { Ipv4NetworkingService } from './ipv4-networking.service';

describe('Ipv4NetworkingService', () => {
  let service: Ipv4NetworkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ipv4NetworkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
