import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Injectable({ 
  providedIn: 'root'
})
export class ProfileService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  numeroLutas:number=0;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }
  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }
  updateName(nome: string): Promise<any> {
    return this.userProfile.update({ nome });
  }
  updateLutadores(
    nome1: string,
    clube1: string,
    nome2: string,
    clube2: string,
    altura_relativa: string,
    punho1: string,
    punho2: string): Promise<any> {

      console.log(nome1);
      console.log(nome2);
      console.log(clube1);
      console.log(clube2);
      console.log(altura_relativa);
      console.log(punho1);
      console.log(punho2);


      return this.userProfile.update({
        lutadores: firebase.firestore.FieldValue.arrayUnion({
            nome1,
            clube1,
            nome2,
            clube2,
            altura_relativa,
            punho1,
            punho2
        })
      });
  }
  updateFoto(fotoPerfilURL: string): Promise<any> {
    return this.userProfile.update({ fotoPerfilURL });
  }
  getNumeroLutas():number{
    return this.numeroLutas
  }
  setNumeroLutas(numLutas:number):void{
    this.numeroLutas=numLutas;
    this.userProfile.update({ numeroLutas:this.numeroLutas });

  }




}
    