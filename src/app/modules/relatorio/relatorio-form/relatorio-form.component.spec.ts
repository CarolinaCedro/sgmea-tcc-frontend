import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFormComponent } from './relatorio-form.component';

describe('RelatorioFormComponent', () => {
  let component: RelatorioFormComponent;
  let fixture: ComponentFixture<RelatorioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
