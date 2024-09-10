import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizacaoFilterComponent } from './priorizacao-filter.component';

describe('PriorizacaoFilterComponent', () => {
  let component: PriorizacaoFilterComponent;
  let fixture: ComponentFixture<PriorizacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorizacaoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorizacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
