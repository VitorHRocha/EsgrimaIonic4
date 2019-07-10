import { TestBed } from '@angular/core/testing';

import { LutaService } from './luta.service';

describe('LutaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LutaService = TestBed.get(LutaService);
    expect(service).toBeTruthy();
  });
});
