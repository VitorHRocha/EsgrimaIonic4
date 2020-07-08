import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFiltroPage } from './modal-filtro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFiltroPage
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
  declarations: [ModalFiltroPage],
})
export class ModalFiltroPageModule {}
