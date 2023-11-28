import { NgModule } from '@angular/core';
import {TasksComponent} from "./tasks/tasks.component";
import {RouterModule, Routes} from "@angular/router";
import {ArchiveComponent} from "./archive/archive.component";

const routes: Routes = [
  {path: 'tasks', component: TasksComponent},
  {path: 'archive', component: ArchiveComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
