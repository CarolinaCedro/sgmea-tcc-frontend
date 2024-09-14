import { TestBed } from '@angular/core/testing';

import { ChamadoAtribuidoService } from './chamado-atribuido.service';

describe('ChamadoAtribuidoService', () => {
  let service: ChamadoAtribuidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadoAtribuidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
