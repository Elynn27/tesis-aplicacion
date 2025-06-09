import { TestBed } from '@angular/core/testing';

import { ResultadosIntroducidosService } from './resultados-introducidos.service';

describe('ResultadosIntroducidosService', () => {
  let service: ResultadosIntroducidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadosIntroducidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
