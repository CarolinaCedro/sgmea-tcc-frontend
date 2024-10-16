import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioFilterComponent } from './funcionario-filter.component';

describe('FuncionarioFilterComponent', () => {
  let component: FuncionarioFilterComponent;
  let fixture: ComponentFixture<FuncionarioFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionarioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
