import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorFilterComponent } from './gestor-filter.component';

describe('GestorFilterComponent', () => {
  let component: GestorFilterComponent;
  let fixture: ComponentFixture<GestorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
