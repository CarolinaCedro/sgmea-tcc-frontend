import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorListComponent } from './gestor-list.component';

describe('GestorListComponent', () => {
  let component: GestorListComponent;
  let fixture: ComponentFixture<GestorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
