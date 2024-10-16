import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFilterComponent } from './historico-filter.component';

describe('HistoricoFilterComponent', () => {
  let component: HistoricoFilterComponent;
  let fixture: ComponentFixture<HistoricoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
