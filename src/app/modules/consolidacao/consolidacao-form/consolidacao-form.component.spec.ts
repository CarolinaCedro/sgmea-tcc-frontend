import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacaoFormComponent } from './consolidacao-form.component';

describe('ConsolidacaoFormComponent', () => {
  let component: ConsolidacaoFormComponent;
  let fixture: ComponentFixture<ConsolidacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidacaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
