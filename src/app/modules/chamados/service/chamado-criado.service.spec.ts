import { TestBed } from '@angular/core/testing';

import { ChamadoCriadoService } from './chamado-criado.service';

describe('ChamadoCriadoService', () => {
  let service: ChamadoCriadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadoCriadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
