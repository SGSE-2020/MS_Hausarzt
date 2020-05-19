import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiteruebersichtComponent } from './mitarbeiteruebersicht.component';

describe('MitarbeiteruebersichtComponent', () => {
  let component: MitarbeiteruebersichtComponent;
  let fixture: ComponentFixture<MitarbeiteruebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitarbeiteruebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitarbeiteruebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
