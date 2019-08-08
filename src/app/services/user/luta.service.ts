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

  private pontosLutador1: Array<number>;
  private pontosLutador2: Array<number>;

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
      Lutadores: Array<string>,
      Ataques: Array<number>,
      LocalCorpo: Array<number>,
      Arena: Array<number>,
      Efetividade: Array<boolean>): string {
        var i=0;
        var lutaDetalhada: string="";
        for(i=0;i<Ataques.length;i++){
          if(LocalCorpo[i]>6){
            lutaDetalhada+=Lutadores[1];
          }else{
            lutaDetalhada+=Lutadores[0];
          }        
          if(Ataques[i]==1){
            lutaDetalhada+=" com um ataque";
          }else if(Ataques[i]==2){
            lutaDetalhada+=" com uma resposta";
          }else if(Ataques[i]==3){
            lutaDetalhada+=" com um contra resposta";           
          }else if(Ataques[i]==4){
            lutaDetalhada+=" com um contra ataque";
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
            lutaDetalhada+=" gerando ponto. \n ";
          }else if(Efetividade[i]==false){
            lutaDetalhada+=" não gernado ponto. \n ";
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
          var localCorpo = 0;
          var quantidadeAcertos=0;
          var ataque1=0;
          var ataque2=0;
          var ataque3=0;
          var ataque4=0;
          var tipoAtaques: any= [];
          var pontos: any= [];
          
          for(i=0;i<12;i++){
            pontos[i]={localCorpo, quantidadeAcertos,tipoAtaques};
            pontos[i].localCorpo=i+1;
            pontos[i].quantidadeAcertos=0;
            pontos[i].tipoAtaques =[ ataque1,ataque2,ataque3,ataque4];
            pontos[i].tipoAtaques.ataque1=0;
            pontos[i].tipoAtaques.ataque2=0;
            pontos[i].tipoAtaques.ataque3=0;
            pontos[i].tipoAtaques.ataque4=0;
            

            }
          
          for(i=0;i<Ataques.length;i++){
          
            if(Efetividade[i]==true){
                
                pontos[LocalCorpo[i]-1].quantidadeAcertos++;
              }


              if(Ataques[i]==1){
                
                pontos[LocalCorpo[i]].tipoAtaques.ataque1++;
              }else if(Ataques[i]==2){
                
                pontos[LocalCorpo[i]].tipoAtaques.ataque2++;
              }else if(Ataques[i]==3){
                
                pontos[LocalCorpo[i]].tipoAtaques.ataque3++;
              }else if(Ataques[i]==4){
                
                pontos[LocalCorpo[i]].tipoAtaques.ataque4++;
              }
              
            }
          
          
        for(i=0 ; i<12;i++){
            console.log(pontos[i].tipoAtaques.ataque1);
            
        } for(i=0 ; i<12;i++){
          console.log(pontos[i].tipoAtaques.ataque2);
          
        } for(i=0 ; i<12;i++){
          console.log(pontos[i].tipoAtaques.ataque3);
          
        } for(i=0 ; i<12;i++){
          console.log(pontos[i].tipoAtaques.ataque4);
          
        }
         //sepera os pontos em dois vetores
         for(i=0 ; i<12;i++){
           if(i<6){
             this.pontosLutador1=pontos;
           }
          
        }






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

