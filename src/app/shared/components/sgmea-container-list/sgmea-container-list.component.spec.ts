import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgmeaContainerListComponent } from './sgmea-container-list.component';

describe('SgmeaContainerListComponent', () => {
  let component: SgmeaContainerListComponent;
  let fixture: ComponentFixture<SgmeaContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgmeaContainerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SgmeaContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
