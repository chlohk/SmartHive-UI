import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreakMomComponent } from './freak-mom.component';

describe('FreakMomComponent', () => {
  let component: FreakMomComponent;
  let fixture: ComponentFixture<FreakMomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreakMomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreakMomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
