import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherFrameComponent } from './mother-frame.component';

describe('MotherFrameComponent', () => {
  let component: MotherFrameComponent;
  let fixture: ComponentFixture<MotherFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotherFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
