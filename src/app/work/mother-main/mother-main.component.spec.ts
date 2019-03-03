import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherMainComponent } from './mother-main.component';

describe('MotherMainComponent', () => {
  let component: MotherMainComponent;
  let fixture: ComponentFixture<MotherMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotherMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
