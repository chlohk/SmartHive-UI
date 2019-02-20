import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ExampleComponent} from "./example/example.component";
import { SettingsComponent } from './settings/settings.component';
import { ColoniesComponent } from './settings/colonies/colonies.component';
import { NewColonyComponent } from './settings/colonies/new-colony/new-colony.component';
import { HivesComponent } from './settings/hives/hives.component';
import { EditHiveComponent } from './settings/hives/edit-hive/edit-hive.component';
import { NewHiveComponent } from './settings/hives/new-hive/new-hive.component';
import { EditColonyComponent } from './settings/colonies/edit-colony/edit-colony.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    SettingsComponent,
    ColoniesComponent,
    NewColonyComponent,
    HivesComponent,
    EditHiveComponent,
    NewHiveComponent,
    EditColonyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
