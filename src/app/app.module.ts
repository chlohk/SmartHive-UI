import { BrowserModule } from '@angular/platform-browser';
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
import { MotherMainComponent } from './work/mother-main/mother-main.component';
import { MotherSituationComponent } from './work/mother-situation/mother-situation.component';
import { WorkComponent } from './work/work.component';
import { WorkHeaderComponent } from './work/work-header/work-header.component';
import { SpinnerComponent } from './util/spinner/spinner.component';
import {SpinnerService} from "./util/spinner/spinner.service";
import {SettingsNavigationService} from "./settings/shared/settings-navigation.service";
import { JwModalComponent } from './util/jw-modal/jw-modal.component';
import {JwModalService} from "./util/jw-modal/jw-modal.service";
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
    MotherMainComponent,
    MotherSituationComponent,
    WorkComponent,
    WorkHeaderComponent,
    SpinnerComponent,
    JwModalComponent
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
    JwModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
