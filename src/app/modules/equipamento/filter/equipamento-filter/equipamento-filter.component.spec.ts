import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoFilterComponent } from './equipamento-filter.component';

describe('EquipamentoFilterComponent', () => {
  let component: EquipamentoFilterComponent;
  let fixture: ComponentFixture<EquipamentoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipamentoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipamentoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
