import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class LutaService {
  numLutas;
  public eventListRef:firebase.firestore.DocumentReference;
  public userProfile: any;
  public currentUser: firebase.User;
  public refLuta: firebase.firestore.DocumentReference;
  constructor() {
    
          firebase.auth().onAuthStateChanged(user => {
        if (user) {
          
          
        this.eventListRef = firebase
        .firestore()
        .doc(`/userProfile/${user.uid}/`);
        }
        });
        this.refLuta = firebase.firestore().doc(`/formaLuta/`);
        
        

    }
  
    updateLutas(
      Ataques: Array<number>,
      LocalCorpo: Array<number>,
      Area: Array<number>,
      Efetividade: Array<boolean>,):
      Promise<any> {
        this.numLutas++;
        return this.eventListRef.update({
          lutas: firebase.firestore.FieldValue.arrayUnion({
            Ataques,
            LocalCorpo,
            Area,
            Efetividade
          })
        });
    }



    getEventList(): firebase.firestore.DocumentReference {
      return this.eventListRef;
      }

    formaLuta(
      Ataques: Array<number>,
      LocalCorpo: Array<number>,
      Area: Array<number>,
      Efetividade: Array<boolean>,): string {
        var i=0;
       var lutaDetalhada: string="";
      for(i=0;i<Ataques.length;i++){
         if(Ataques[i]==1){
          lutaDetalhada="com um ataque";
         }else if(Ataques[i]==2){
          lutaDetalhada="com uma resposta";
         }else if(Ataques[i]==3){
          lutaDetalhada="com um contra resposta";           
        }else if(Ataques[i]==4){
          lutaDetalhada="com um contra ataque";
        }

        if(LocalCorpo[i]==1 || LocalCorpo[i]==7){
          lutaDetalhada+="mirou a cabeça";
        }else if(LocalCorpo[i]==2 || LocalCorpo[i]==8){
          lutaDetalhada+="mirou o tronco";  
        }else if(LocalCorpo[i]==3 || LocalCorpo[i]==9){
          lutaDetalhada+="mirou o braço esquerdo";
        }else if(LocalCorpo[i]==4 || LocalCorpo[i]==10){
          lutaDetalhada+="mirou o braço direito";
        }else if(LocalCorpo[i]==5 || LocalCorpo[i]==11){
          lutaDetalhada+="mirou a perna esquerda";
        }else if(LocalCorpo[i]==6 || LocalCorpo[i]==12){
          lutaDetalhada+="mirou a perna direita";
        }


        if(Area[i]==1){
          lutaDetalhada+="na zona 1";
        }else if(Area[i]==2){
          lutaDetalhada+="na zona 2";
        }else if(Area[i]==3){
          lutaDetalhada+="na zona 3";
        }else if(Area[i]==4){
          lutaDetalhada+="na zona 4";
        }else if(Area[i]==5){
          lutaDetalhada+="na zona 4";
        }
        

        if(Efetividade[i]==true){
          lutaDetalhada+="gerando ponto";
        }else if(Efetividade[i]==false){
          lutaDetalhada+="não gernado ponto";
        }





      }
       return lutaDetalhada;

    }  




}

