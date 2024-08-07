import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosFormComponent } from './chamados-form.component';

describe('ChamadosFormComponent', () => {
  let component: ChamadosFormComponent;
  let fixture: ComponentFixture<ChamadosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
