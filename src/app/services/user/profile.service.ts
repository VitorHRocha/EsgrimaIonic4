import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { concat } from 'rxjs';
import { efeitoPratica } from './luta.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  numeroLutas: number = 0;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    if (this.userProfile) {
      return this.userProfile;
    } else {
      this.userProfile = firebase.firestore().doc(`/userProfile/noVcK052RXcODxbo9pfoXhoBUJS2`);
      return this.userProfile;
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
    data: string,
    hora: string,
    altura_relativa: string,
    punho1: string,
    punho2: string,
    empunhadura: string,
    tatica: string,
    nivelTecnico: string,
    conservador_ousado: number,
    inconstante_constante: number,
    inseguro_confiante: number,
    pressionado_controlado: number,
    provocativa_respeitosa: number,
    passiva_ativa: number,
    myConfiante: number,
    myEstressado: number,
    myFocado: number,
    myMotivado: number,
    myControlado: number,
    myDisciplinado: number,
    efeitoPratica: efeitoPratica
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


    // console.log(altura_relativa);
    // console.log(punho1);
    // console.log(punho2);
    // console.log(empunhadura);
    // console.log(tatica);
    // console.log(nivelTecnico);
    // console.log(conservador_ousado);
    // console.log(inconstante_constante );
    // console.log(inseguro);
    // console.log(pressionado);
    // console.log(provocativa);
    // console.log(passiva);
    // console.log(confiante);
    // console.log(estressado);
    // console.log(focado);
    // console.log(motivado);
    // console.log(controlado);
    // console.log(disciplinado);


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
        conservador_ousado,
        inconstante_constante,
        inseguro_confiante,
        pressionado_controlado,
        provocativa_respeitosa,
        passiva_ativa,
        myConfiante,
        myEstressado,
        myFocado,
        myMotivado,
        myControlado,
        myDisciplinado,
        ep_sonolento_alerta: efeitoPratica.sonolento_alerta,
        ep_cansado_vigoroso: efeitoPratica.cansado_vigoroso,
        ep_inseguro_confiante: efeitoPratica.inseguro_confiante,
        ep_preocupado_tranquilo: efeitoPratica.preocupado_tranquilo,
        ep_triste_feliz: efeitoPratica.triste_feliz,
        ep_desmotivado_motivado: efeitoPratica.desmotivado_motivado,
      })
    });


  }
  updateFoto(fotoPerfilURL: string): Promise<any> {
    return this.userProfile.update({ fotoPerfilURL });
  }
  getNumeroLutas(): number {
    return this.numeroLutas
  }
  updateLutas(numLutas: number): void {
    numLutas = numLutas + 1;
    this.userProfile.update({ numeroLutas: numLutas });

  }




}
