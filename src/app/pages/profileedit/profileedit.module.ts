import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileeditPage } from './profileedit.page';

import { Camera } from '@ionic-native/Camera/ngx';
const routes: Routes = [
  {
    path: '',
    component: ProfileeditPage
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
  declarations: [ProfileeditPage]
})
export class ProfileeditPageModule {}
