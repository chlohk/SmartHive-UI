import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {WorkComponent} from "./work/work.component";

const routes: Routes = [
  { path: 'tarmo', component: WorkComponent},
  { path: 'tarmo/settings', component: SettingsComponent },
  { path: '**', redirectTo: 'tarmo'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
