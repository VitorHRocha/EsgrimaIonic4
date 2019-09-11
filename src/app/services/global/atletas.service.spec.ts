import { TestBed } from '@angular/core/testing';

import { AtletasService } from './atletas.service';

describe('AtletasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtletasService = TestBed.get(AtletasService);
    expect(service).toBeTruthy();
  });
});
