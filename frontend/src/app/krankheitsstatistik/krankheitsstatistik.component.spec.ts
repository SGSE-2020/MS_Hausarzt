import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KrankheitsstatistikComponent } from './krankheitsstatistik.component';

describe('KrankheitsstatistikComponent', () => {
  let component: KrankheitsstatistikComponent;
  let fixture: ComponentFixture<KrankheitsstatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KrankheitsstatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KrankheitsstatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
