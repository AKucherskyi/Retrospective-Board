import { BoardPageComponent } from './board-page/board-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/board', pathMatch: 'full'},
  {path: 'board', component: BoardPageComponent}, 
  {path: '**', redirectTo: '/board'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
