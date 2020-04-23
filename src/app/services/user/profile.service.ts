import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { concat } from 'rxjs';
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
    if(this.userProfile){
      return this.userProfile ;
    }else{
      this.userProfile = firebase.firestore().doc(`/userProfile/If49ic1BNFM8zcRrTQEXSZ56umB3`);
      return this.userProfile  ;
    }

  
  }

  updateName(nome: string): Promise<any> {
    return this.userProfile.update({ nome });
  }

  updateLutadores(
    idLuta: number,
    tipoJogo: string,
    nome1: string,
    clube1: string,
    nome2: string,
    clube2: string,
    data:   string,
    hora:   string,
    altura_relativa: string,
    punho1: string,
    punho2: string
    ): Promise<any> {
       
      this.updateLutas(idLuta);
      return this.userProfile.update({
        lutadores: firebase.firestore.FieldValue.arrayUnion({
            idLuta,
            tipoJogo,
            nome1,
            clube1,
            nome2,
            clube2,
            data,
            hora,
            altura_relativa,
            punho1,
            punho2,
 
        })
      });

  
    }
  updateFoto(fotoPerfilURL: string): Promise<any> {
    return this.userProfile.update({ fotoPerfilURL });
  }
  getNumeroLutas():number{
    return this.numeroLutas
  }
  updateLutas(numLutas:number):void{
    numLutas = numLutas + 1;
    this.userProfile.update({ numeroLutas:numLutas });

  }




}
    