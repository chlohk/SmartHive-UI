import { async, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {NewColonyComponent} from "./new-colony/new-colony.component";

describe('SettingsComponent', () => {
  function setup(){
    const fixture = TestBed.createComponent(SettingsComponent);
    const component = fixture.componentInstance;
    return { fixture, component }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent, NewColonyComponent ]
    })
  }));

  it('#newColonyButton pressed then #appNewColonyComponent is visible', () => {
    const {fixture, component} = setup();
    const compile = fixture.debugElement.nativeElement;
    const newColonyButton = compile.querySelector('#newColonyButton');
    const appNewColonyComponent = compile.querySelector('#appNewColonyComponent ');
    expect(appNewColonyComponent).toBeTruthy();
  });

  it('should let click on work part', () => {

  });
});
