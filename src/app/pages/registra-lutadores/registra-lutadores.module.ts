import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistraLutadoresPage } from './registra-lutadores.page';
import { ModalPage } from '../../modal/modal.page';

const routes: Routes = [ 
  {
    path: '',
    component: RegistraLutadoresPage
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
  declarations: [RegistraLutadoresPage,ModalPage],
  entryComponents: [ModalPage],
})
export class RegistraLutadoresPageModule {}
