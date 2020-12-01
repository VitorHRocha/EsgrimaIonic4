import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelecionaOponentePage } from './seleciona-oponente.page';
import { ModalPage } from 'src/app/modal/modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelecionaOponentePage
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
  declarations: [SelecionaOponentePage,ModalPage],
  entryComponents: [ModalPage],
})
export class SelecionaOponentePageModule {}
