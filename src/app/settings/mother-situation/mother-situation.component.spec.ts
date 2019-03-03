import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherSituationComponent } from './mother-situation.component';

describe('MotherSituationComponent', () => {
  let component: MotherSituationComponent;
  let fixture: ComponentFixture<MotherSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotherSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
