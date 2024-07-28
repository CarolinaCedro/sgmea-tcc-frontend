import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgmeaLoandingComponent } from './sgmea-loanding.component';

describe('SgmeaLoandingComponent', () => {
  let component: SgmeaLoandingComponent;
  let fixture: ComponentFixture<SgmeaLoandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgmeaLoandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgmeaLoandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
