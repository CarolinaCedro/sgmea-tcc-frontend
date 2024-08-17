import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizaocaoChamadoFormComponent } from './priorizaocao-chamado-form.component';

describe('PriorizaocaoChamadoFormComponent', () => {
  let component: PriorizaocaoChamadoFormComponent;
  let fixture: ComponentFixture<PriorizaocaoChamadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorizaocaoChamadoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorizaocaoChamadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
