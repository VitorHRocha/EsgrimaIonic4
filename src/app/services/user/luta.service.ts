import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class LutaService {

  public eventListRef:firebase.firestore.DocumentReference;
  public userProfile: any;
  public currentUser: firebase.User;
  public lutaAtual;

  private nome1: string;
    private clube1: string;
  private nome2: string;
  private clube2: string;



  constructor() {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
        .firestore()
        .doc(`/userProfile/${user.uid}/`);
      }
    });
    
    
  }
  
  updateLutas(
    Ataques: Array<number>,
    LocalCorpo: Array<number>,
    Area: Array<number>,
    Efetividade: Array<boolean>,):
    Promise<any> {
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
      Arena: Array<number>,
      Efetividade: Array<boolean>): string {
        var i=0;
        var lutaDetalhada: string="";
        for(i=0;i<Ataques.length;i++){
        
          if(Ataques[i]==1){
            lutaDetalhada+="com um ataque";
          }else if(Ataques[i]==2){
            lutaDetalhada+="com uma resposta";
          }else if(Ataques[i]==3){
            lutaDetalhada+="com um contra resposta";           
          }else if(Ataques[i]==4){
            lutaDetalhada+="com um contra ataque";
          }
          
          if(LocalCorpo[i]==1 || LocalCorpo[i]==7){
            lutaDetalhada+=" mirou a cabeça";
          }else if(LocalCorpo[i]==2 || LocalCorpo[i]==8){
            lutaDetalhada+=" mirou o tronco";  
          }else if(LocalCorpo[i]==3 || LocalCorpo[i]==9){
            lutaDetalhada+=" mirou o braço esquerdo";
          }else if(LocalCorpo[i]==4 || LocalCorpo[i]==10){
            lutaDetalhada+=" mirou o braço direito";
          }else if(LocalCorpo[i]==5 || LocalCorpo[i]==11){
            lutaDetalhada+=" mirou a perna esquerda";
          }else if(LocalCorpo[i]==6 || LocalCorpo[i]==12){
            lutaDetalhada+=" mirou a perna direita";
          }
          
          
          if(Arena[i]==1){
            lutaDetalhada+=" na zona 1";
          }else if(Arena[i]==2){
            lutaDetalhada+=" na zona 2";
          }else if(Arena[i]==3){
            lutaDetalhada+="na zona 3";
          }else if(Arena[i]==4){
            lutaDetalhada+=" na zona 4";
          }else if(Arena[i]==5){
            lutaDetalhada+=" na zona 4";
          }
          
          
          if(Efetividade[i]==true){
            lutaDetalhada+=" gerando ponto. \n";
          }else if(Efetividade[i]==false){
            lutaDetalhada+=" não gernado ponto. \n";
          }
          
          
          
          
          
        }
        return lutaDetalhada;
        
      }  
      
      formaLutaEstatistic(
        LutadoresNomes: Array<string>,
        Ataques: Array<number>,
        LocalCorpo: Array<number>,
        Arena: Array<number>,
        Efetividade: Array<boolean>): any{
          var i=0;
          var localCorpo=[1,2,3,4,5,6];
          var quantidadeAcertos=[0,0,0,0,0,0];
          var ataque1=0;
          var ataque2=0;
          var ataque3=0;
          var ataque4=0;
          var tipoAtaques: any= [];
          var pontos:any= [2];
          for(i=0;i<12;i++){
            tipoAtaques [i] =[ataque1,ataque2,ataque3,ataque4];
          }
          pontos={localCorpo,quantidadeAcertos };
          for(i=0;i<Ataques.length;i++){
          
            if(Efetividade[i]==true){
              if(LocalCorpo[i]>6){
                pontos[0].quantidadeAcertos[LocalCorpo[i]-6]++;
              }else{
                pontos[1].quantidadeAcertos[LocalCorpo[i]]++;
              }
              if(Ataques[i]==1){
                
                tipoAtaques [LocalCorpo[i]].ataque1++;
              }else if(Ataques[i]==2){
                
                tipoAtaques [LocalCorpo[i]].ataque2++;
              }else if(Ataques[i]==3){
                
                tipoAtaques [LocalCorpo[i]].ataque3++;
              }else if(Ataques[i]==4){
                
                tipoAtaques [LocalCorpo[i]].ataque4++;
              }
              
            }
          }
          
          
          return pontos;
          
          
      }
      guardaLutadores(
          nome1: string,
          clube1: string,
          nome2: string,
          clube2: string){
            this.nome1=nome1;
            this.nome2=nome2;
            this.clube1=clube1;
            this.clube2=clube2;


      }
      setLutaAtual(lutaAtual){
        this.lutaAtual=lutaAtual;
      }
      getLutaAtual(){
        return this.lutaAtual;
      }
      public getnome1(): string {
        return this.nome1;
      }
      public getclube1(): string {
        return this.clube1;
      }
      public getnome2(): string {
        return this.nome2;
      }
      public getclube2(): string {
        return this.clube2;
      }
     
        
        
        
        
      }

