import { TestBed } from '@angular/core/testing';

import { Arbitros } from './arbitros';

describe('Arbitros', () => {
  let service: Arbitros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arbitros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
