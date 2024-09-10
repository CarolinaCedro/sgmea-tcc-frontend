import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoFilterComponent } from './tecnico-filter.component';

describe('TecnicoFilterComponent', () => {
  let component: TecnicoFilterComponent;
  let fixture: ComponentFixture<TecnicoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnicoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
