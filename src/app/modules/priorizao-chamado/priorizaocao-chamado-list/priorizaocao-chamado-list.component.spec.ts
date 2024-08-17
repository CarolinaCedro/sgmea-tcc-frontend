import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorizaocaoChamadoListComponent } from './priorizaocao-chamado-list.component';

describe('PriorizaocaoChamadoListComponent', () => {
  let component: PriorizaocaoChamadoListComponent;
  let fixture: ComponentFixture<PriorizaocaoChamadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorizaocaoChamadoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorizaocaoChamadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
