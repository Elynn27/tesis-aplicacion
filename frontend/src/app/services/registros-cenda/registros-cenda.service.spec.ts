import { TestBed } from '@angular/core/testing';

import { RegistrosCendaService } from './registros-cenda.service';

describe('RegistrosCendaService', () => {
  let service: RegistrosCendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrosCendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
