import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosIntroducidosComponent } from './resultados-introducidos.component';

describe('ResultadosIntroducidosComponent', () => {
  let component: ResultadosIntroducidosComponent;
  let fixture: ComponentFixture<ResultadosIntroducidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosIntroducidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosIntroducidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
