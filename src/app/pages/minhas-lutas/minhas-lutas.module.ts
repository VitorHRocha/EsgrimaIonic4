import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';


import { MinhasLutasPage } from './minhas-lutas.page';
import { ModalFiltroPage } from 'src/app/modal-filtro/modal-filtro.page';

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
  declarations: [MinhasLutasPage,ModalFiltroPage],
  entryComponents: [ModalFiltroPage],
})
export class MinhasLutasPageModule {}
