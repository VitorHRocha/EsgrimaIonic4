import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modal2Page } from './modal2.page';

const routes: Routes = [
  {
    path: '',
    component: Modal2Page
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
  // declarations: [ModalPage],
  exports: [Modal2Page],
})
export class Modal2PageModule {}
