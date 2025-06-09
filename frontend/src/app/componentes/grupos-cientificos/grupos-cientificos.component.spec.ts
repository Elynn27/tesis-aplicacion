import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposCientificosComponent } from './grupos-cientificos.component';

describe('GruposCientificosComponent', () => {
  let component: GruposCientificosComponent;
  let fixture: ComponentFixture<GruposCientificosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposCientificosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposCientificosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
