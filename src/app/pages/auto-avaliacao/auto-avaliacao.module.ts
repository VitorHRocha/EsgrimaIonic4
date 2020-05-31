import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutoAvaliacaoPage } from './auto-avaliacao.page';

const routes: Routes = [
  {
    path: '',
    component: AutoAvaliacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AutoAvaliacaoPage]
})
export class AutoAvaliacaoPageModule {}
