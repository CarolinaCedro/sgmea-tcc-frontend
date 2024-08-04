import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoFormComponent } from './equipamento-form.component';

describe('EquipamentoFormComponent', () => {
  let component: EquipamentoFormComponent;
  let fixture: ComponentFixture<EquipamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipamentoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
