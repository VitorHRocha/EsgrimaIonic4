import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AtletasService {
  public listaAtletasDoc: firebase.firestore.DocumentReference;

  constructor() {
    this.listaAtletasDoc = firebase.firestore().doc('/listaAtletas/lista');
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
