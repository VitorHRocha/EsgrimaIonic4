import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ProfileService } from 'src/app/services/user/profile.service';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AtletasService {
  public listaAtletasDoc: firebase.firestore.DocumentReference;
  private userProfile: any;

  constructor(
    public profileService:ProfileService) {
      this.profileService.getUserProfile() 
      .get()
      .then( userProfileSnapshot => {

        this.userProfile = this.profileService.getUserProfile();
        this.listaAtletasDoc = this.userProfile.lista_atleta;
        // this.listaAtletasDoc = firebase.firestore().doc(`${this.userProfile}/listaAtletas/lista`);
      });
   }

   getListAtleta(){
     return this.listaAtletasDoc; 
   }

   

}
