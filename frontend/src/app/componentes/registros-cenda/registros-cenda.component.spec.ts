import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosCendaComponent } from './registros-cenda.component';

describe('RegistrosCendaComponent', () => {
  let component: RegistrosCendaComponent;
  let fixture: ComponentFixture<RegistrosCendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosCendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosCendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
