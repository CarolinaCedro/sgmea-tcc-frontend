import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosFormComponent } from './tecnicos-form.component';

describe('TecnicosFormComponent', () => {
  let component: TecnicosFormComponent;
  let fixture: ComponentFixture<TecnicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
