import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EstatisticaPage } from './estatistica.page';
import { ModalFiltro2Page } from 'src/app/modal-filtro2/modal-filtro.page';


const routes: Routes = [
  {
    path: '',
    component: EstatisticaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EstatisticaPage,ModalFiltro2Page],
  entryComponents: [ModalFiltro2Page],
})
export class EstatisticaPageModule {}
