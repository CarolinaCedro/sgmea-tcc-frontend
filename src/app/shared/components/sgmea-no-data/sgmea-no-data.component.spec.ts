import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgmeaNoDataComponent } from './sgmea-no-data.component';

describe('SgmeaNoDataComponent', () => {
  let component: SgmeaNoDataComponent;
  let fixture: ComponentFixture<SgmeaNoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgmeaNoDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgmeaNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
