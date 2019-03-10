import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {WorkComponent} from "./work/work.component";

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'work', component: WorkComponent},
  { path: '**', redirectTo: 'settings'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
