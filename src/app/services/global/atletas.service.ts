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
  private userProfile: firebase.firestore.DocumentReference;

  constructor(
    public profileService:ProfileService) {
      this.profileService.getUserProfile()
      .get()
      .then( userProfileSnapshot => {

        this.userProfile = this.profileService.getUserProfile();
        this.listaAtletasDoc = firebase.firestore().doc(`/listaAtletas/lista`);
        // this.listaAtletasDoc = firebase.firestore().doc(`${this.userProfile}/listaAtletas/lista`);
      });
   }

   getListAtleta(){
     return this.listaAtletasDoc; 
   }

   updateAtleta(nome: string, clube: string): Promise<any> {
     
    return this.listaAtletasDoc.update({ 
      atleta: firebase.firestore.FieldValue.arrayUnion({
            nome,
            clube
        })
      });

    }

}
