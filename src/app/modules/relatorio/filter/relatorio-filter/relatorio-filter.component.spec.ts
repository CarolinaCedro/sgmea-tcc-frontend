import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFilterComponent } from './relatorio-filter.component';

describe('RelatorioFilterComponent', () => {
  let component: RelatorioFilterComponent;
  let fixture: ComponentFixture<RelatorioFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
