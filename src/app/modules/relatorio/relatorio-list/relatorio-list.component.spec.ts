import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioListComponent } from './relatorio-list.component';

describe('RelatorioListComponent', () => {
  let component: RelatorioListComponent;
  let fixture: ComponentFixture<RelatorioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
