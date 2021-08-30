import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinesweeperPageRoutingModule } from './minesweeper-routing.module';

import { MinesweeperPage } from './minesweeper.page';
import { MinesweeperService } from '../minesweeper.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinesweeperPageRoutingModule
  ],
  declarations: [MinesweeperPage],
  providers: [MinesweeperService]
})
export class MinesweeperPageModule {}
