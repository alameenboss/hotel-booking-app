import { MaterialModule } from './../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GameComponent } from './game/game.component';
import { GameCardComponent } from './game-card/game-card.component';

@NgModule({
  declarations: [
    GameCardComponent,
    GameComponent
  ],
  exports: [
    GameCardComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: GameComponent },
    ])
  ]
})
export class GameModule { }
