import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgmeaFormComponent } from './sgmea-form.component';

describe('SgmeaFormComponent', () => {
  let component: SgmeaFormComponent;
  let fixture: ComponentFixture<SgmeaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgmeaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgmeaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
