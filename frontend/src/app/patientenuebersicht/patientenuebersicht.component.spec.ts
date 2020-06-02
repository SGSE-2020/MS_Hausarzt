import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientenuebersichtComponent } from './patientenuebersicht.component';

describe('PatientenuebersichtComponent', () => {
  let component: PatientenuebersichtComponent;
  let fixture: ComponentFixture<PatientenuebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientenuebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientenuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
