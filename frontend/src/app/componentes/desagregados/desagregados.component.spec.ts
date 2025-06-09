import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesagregadosComponent } from './desagregados.component';

describe('DesagregadosComponent', () => {
  let component: DesagregadosComponent;
  let fixture: ComponentFixture<DesagregadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesagregadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesagregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
