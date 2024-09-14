import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidacaoListComponent } from './consolidacao-list.component';

describe('ConsolidacaoListComponent', () => {
  let component: ConsolidacaoListComponent;
  let fixture: ComponentFixture<ConsolidacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidacaoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
