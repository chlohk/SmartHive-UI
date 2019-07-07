import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ExampleComponent} from "./example/example.component";
import { SettingsComponent } from './settings/settings.component';
import { NewColonyComponent } from './settings/new-colony/new-colony.component';
import { EditHiveComponent } from './settings/colony-details/edit-hive/edit-hive.component';
import { NewHiveComponent } from './settings/colony-details/new-hive/new-hive.component';
import { EditColonyComponent } from './settings/colony-details/edit-colony/edit-colony.component';
import {ColoniesService} from "./settings/shared/colonies.service";
import { ColonyDetailsComponent } from './settings/colony-details/colony-details.component';
import {SettingsDataService} from "./settings/shared/settings-data.service";
import { MotherSituationComponent } from './work/reference/mother-situation/mother-situation.component';
import { WorkComponent } from './work/work.component';
import { WorkHeaderComponent } from './work/work-header/work-header.component';
import { SpinnerComponent } from './util/spinner/spinner.component';
import {SpinnerService} from "./util/spinner/spinner.service";
import {SettingsNavigationService} from "./settings/shared/settings-navigation.service";
import { JwModalComponent } from './util/jw-modal/jw-modal.component';
import {JwModalService} from "./util/jw-modal/jw-modal.service";
import { FreakMomComponent } from './work/reference/freak-mom/freak-mom.component';
import { MotherFrameComponent } from './work/reference/mother-frame/mother-frame.component';
import { MotherComponent } from './work/mother/mother.component';
import { SeenComponent } from './work/mother/seen/seen.component';
import { InCageComponent } from './work/mother/in-cage/in-cage.component';
import { HatchedComponent } from './work/mother/hatched/hatched.component';
import { UnknownComponent } from './work/mother/unknown/unknown.component';
import { MissingComponent } from './work/mother/missing/missing.component';
import { FreakComponent } from './work/mother/freak/freak.component';
import { UnCagedComponent } from './work/mother/un-caged/un-caged.component';
import {MomDataService} from "./work/mother/mom-data.service";
import {MomAttributesService} from "./work/mother/mom-attributes.service";
import {TimeAgoPipe} from "time-ago-pipe";
import {UtilService} from "./util/util.service";
import { SizeComponent } from './work/size/size.component';
import { SizeEditComponent } from './work/size/size-edit/size-edit.component';
import { SizeViewComponent } from './work/size/size-view/size-view.component';
import {SizeDataService} from "./work/size/size-data.service";
import {SizeService} from "./work/size/size.service";
import {LongPress} from "./util/long-press.directive";
import { NextTimeComponent } from './work/next-time/next-time.component';
import { NotesComponent } from './work/notes/notes.component';
import { PlanningComponent } from './work/planning/planning.component';
import { PlanElementComponent } from './work/planning/plan-element/plan-element.component';
import { PlanningMgmtComponent } from './work/planning/planning-mgmt/planning-mgmt.component';
import { PlanningMgmtEditAreaComponent } from './work/planning/planning-mgmt/planning-mgmt-edit-area/planning-mgmt-edit-area.component';
import {PlanningService} from "./work/planning/planning.service";
import {PlanningDataService} from "./work/planning/planning-data.service";
import {DaysUntilPipe} from "./util/days-until.pipe";
import { PlanningDropdownComponent } from './work/planning/planning-dropdown/planning-dropdown.component';
import { PlanningDropdownElementComponent } from './work/planning/planning-dropdown/planning-dropdown-element/planning-dropdown-element.component';
import { PlanningDropdownMgmtEditAreaComponent } from './work/planning/planning-dropdown/planning-dropdown-mgmt-edit-area/planning-dropdown-mgmt-edit-area.component';
@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    SettingsComponent,
    NewColonyComponent,
    EditHiveComponent,
    NewHiveComponent,
    EditColonyComponent,
    ColonyDetailsComponent,
    MotherSituationComponent,
    WorkComponent,
    WorkHeaderComponent,
    SpinnerComponent,
    JwModalComponent,
    FreakMomComponent,
    MotherFrameComponent,
    MotherComponent,
    SeenComponent,
    InCageComponent,
    HatchedComponent,
    UnknownComponent,
    MissingComponent,
    FreakComponent,
    UnCagedComponent,
    TimeAgoPipe,
    SizeComponent,
    SizeEditComponent,
    SizeViewComponent,
    LongPress,
    NextTimeComponent,
    NotesComponent,
    PlanningComponent,
    PlanElementComponent,
    PlanningMgmtComponent,
    PlanningMgmtEditAreaComponent,
    DaysUntilPipe,
    PlanningDropdownComponent,
    PlanningDropdownElementComponent,
    PlanningDropdownMgmtEditAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ColoniesService,
    SettingsDataService,
    SpinnerService,
    SettingsNavigationService,
    JwModalService,
    MomDataService,
    MomAttributesService,
    UtilService,
    SizeDataService,
    SizeService,
    PlanningService,
    PlanningDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
