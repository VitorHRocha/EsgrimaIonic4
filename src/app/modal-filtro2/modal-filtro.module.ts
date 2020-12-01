import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFiltro2Page } from './modal-filtro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFiltro2Page
  }
]; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [ModalFiltro2Page],
})
export class ModalFiltro2PageModule {}
