import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioLogadoGuard } from './usuario-logado.guard';

describe('UsuarioLogadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioLogadoGuard]
    });
  });

  it('should ...', inject([UsuarioLogadoGuard], (guard: UsuarioLogadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
