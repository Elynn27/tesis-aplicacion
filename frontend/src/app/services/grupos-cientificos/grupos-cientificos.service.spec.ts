import { TestBed } from '@angular/core/testing';

import { GruposCientificosService } from './grupos-cientificos.service';

describe('GruposCientificosService', () => {
  let service: GruposCientificosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposCientificosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
