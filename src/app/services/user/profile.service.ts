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
      this.userProfile = firebase.firestore().doc(`/userProfile/BH1RbdMuRIWWWYo7bw3hG67Fcd63`);
      return this.userProfile  ;
    }

  
  }

  updateName(nome: string): Promise<any> {
    return this.userProfile.update({ nome });
  }

  updateLutadores(
    idLuta: number,
    tipoJogo: string,
    etapaCampeonato: string,
    etapaEliminatoria: string,
    rankingOponente: string,
    classOponente: string,
    nome1: string,
    clube1: string,
    nome2: string,
    clube2: string,
    data:   string,
    hora:   string,
    altura_relativa: string,
    punho1: string,
    punho2: string,
    empunhadura: string,
    tatica: string,
    nivelTecnico: string,
    conservadora: number,
    inconstante: number,
    inseguro: number,
    pressionado: number,
    provocativa: number,
    passiva: number,
    confiante: number,
    estressado: number,
    focado: number,
    motivado: number,
    controlado: number,
    disciplinado: number
    ): Promise<any> {
 
      console.log(idLuta);
      console.log(tipoJogo);
      console.log(etapaCampeonato);
      console.log(etapaEliminatoria);
      console.log(rankingOponente);
      console.log(nome1);
      console.log(clube1);
      console.log(nome2);
      console.log(clube2);
      console.log(data);
      console.log(hora);


      console.log(altura_relativa);
      console.log(punho1);
      console.log(punho2);
      console.log(empunhadura);
      console.log(tatica);
      console.log(nivelTecnico);
      console.log(conservadora);
      console.log(inconstante);
      console.log(inseguro);
      console.log(pressionado);
      console.log(provocativa);
      console.log(passiva);
      console.log(confiante);
      console.log(estressado);
      console.log(focado);
      console.log(motivado);
      console.log(controlado);
      console.log(disciplinado);

       
      this.updateLutas(idLuta);
      return this.userProfile.update({
        lutadores: firebase.firestore.FieldValue.arrayUnion({
            idLuta,
            tipoJogo,
            etapaCampeonato,
            etapaEliminatoria,
            rankingOponente,
            classOponente,
            nome1,
            clube1,
            nome2,
            clube2,
            data,
            hora,
            altura_relativa,
            punho1,
            punho2,
            empunhadura,
            tatica,
            nivelTecnico,
            conservadora,
            inconstante,
            inseguro,
            pressionado,
            provocativa,
            passiva,
            confiante ,
            estressado ,
            focado ,
            motivado ,
            controlado ,
            disciplinado 
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
    