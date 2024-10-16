import { TestBed } from '@angular/core/testing';

import { PriorizacaoChamadoService } from './priorizacao-chamado.service';

describe('PriorizacaoChamadoService', () => {
  let service: PriorizacaoChamadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorizacaoChamadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
