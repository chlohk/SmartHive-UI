import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {NewColonyComponent} from "./settings/new-colony/new-colony.component";
import {ColonyDetailsComponent} from "./settings/colony-details/colony-details.component";
import {EditColonyComponent} from "./settings/colony-details/edit-colony/edit-colony.component";
import {NewHiveComponent} from "./settings/colony-details/new-hive/new-hive.component";
import {EditHiveComponent} from "./settings/colony-details/edit-hive/edit-hive.component";
import {MotherSituationComponent} from "./settings/mother-situation/mother-situation.component";

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, children: [
      { path: 'colony/new', component: NewColonyComponent },
      { path: 'colony/:id', component: ColonyDetailsComponent , children: [
          { path: 'edit', component: EditColonyComponent },
          { path: 'hive/new', component: NewHiveComponent },
          { path: 'hive/edit/:hiveId', component: EditHiveComponent },
          ]}
    ]},
  {path: '**', redirectTo: 'settings'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
