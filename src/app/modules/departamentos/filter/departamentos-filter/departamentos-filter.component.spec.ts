import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosFilterComponent } from './departamentos-filter.component';

describe('DepartamentosFilterComponent', () => {
  let component: DepartamentosFilterComponent;
  let fixture: ComponentFixture<DepartamentosFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentosFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartamentosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
