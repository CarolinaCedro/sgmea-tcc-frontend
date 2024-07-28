import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgmeaListComponent } from './sgmea-list.component';

describe('SgmeaListComponent', () => {
  let component: SgmeaListComponent;
  let fixture: ComponentFixture<SgmeaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgmeaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgmeaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
