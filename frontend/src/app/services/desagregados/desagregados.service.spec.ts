import { TestBed } from '@angular/core/testing';

import { DesagregadosService } from './desagregados.service';

describe('DesagregadosService', () => {
  let service: DesagregadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesagregadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
