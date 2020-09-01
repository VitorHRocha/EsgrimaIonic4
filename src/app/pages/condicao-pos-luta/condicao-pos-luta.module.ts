import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CondicaoPosLutaPage } from './condicao-pos-luta.page';

const routes: Routes = [
  {
    path: '',
    component: CondicaoPosLutaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CondicaoPosLutaPage]
})
export class CondicaoPosLutaPageModule {}
