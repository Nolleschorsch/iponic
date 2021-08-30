import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinesweeperPage } from './minesweeper.page';

const routes: Routes = [
  {
    path: '',
    component: MinesweeperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinesweeperPageRoutingModule {}
