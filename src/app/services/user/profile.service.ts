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
    nome1: string,
    clube1: string,
    nome2: string,
    clube2: string,
    altura_relativa: string,
    punho1: string,
    punho2: string): Promise<any> {

      const date  = new Date
      var dia     = date.getDate()
      var mes     = date.getMonth()+1
      var ano     = date.getFullYear() 
      var hora    = date.getHours()
      var minuto  = date.getMinutes()
      var horario = hora+':'+minuto
      var data    = dia+'/'+mes+'/'+ano
          

      return this.userProfile.update({
        lutadores: firebase.firestore.FieldValue.arrayUnion({
            nome1,
            clube1,
            nome2,
            clube2,
            altura_relativa,
            punho1,
            punho2,
            data,
            horario
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
    