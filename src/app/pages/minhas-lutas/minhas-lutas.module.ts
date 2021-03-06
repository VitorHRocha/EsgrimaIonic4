import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';
import { ModalFiltroPage } from '../../modal-filtro/modal-filtro.page';

import { MinhasLutasPage } from './minhas-lutas.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasLutasPage
  }
]; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MinhasLutasPage, ModalFiltroPage],
  entryComponents: [ModalFiltroPage],
})
export class MinhasLutasPageModule {}
