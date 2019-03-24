import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {Settings} from "http2";
import {By} from "@angular/platform-browser";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should let create new colony', () => {
    let fixture = TestBed.createComponent(SettingsComponent);
    let testComponent = fixture.debugElement.componentInstance;
    let newColonyButton = fixture.debugElement.query(By.css('newColonyButton'));

    fixture.detectChanges();
    newColonyButton.nativeElement.click();
  });

  it('should let click on work part', () => {

  });
});
