import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoFilterComponent } from './chamado-filter.component';

describe('ChamadoFilterComponent', () => {
  let component: ChamadoFilterComponent;
  let fixture: ComponentFixture<ChamadoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChamadoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
