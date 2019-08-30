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
  
  private pontosLutador1: any = [];
  private pontosLutador2: any = [];
  
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
      idLocalCorpo: Array<number>,
      Arena: Array<number>,
      Efetividade: Array<boolean>): string {
        var i=0;
        var lutaDetalhada: string="";
        for(i=0;i<Ataques.length;i++){
          if(idLocalCorpo[i]>6){
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
          }else if(Ataques[i]==5){
            lutaDetalhada+=" em um toque duplo";
          }
          
          if(idLocalCorpo[i]==1 || idLocalCorpo[i]==7){
            lutaDetalhada+=" mirou a cabeça";
          }else if(idLocalCorpo[i]==2 || idLocalCorpo[i]==8){
            lutaDetalhada+=" mirou o tronco";  
          }else if(idLocalCorpo[i]==3 || idLocalCorpo[i]==9){
            lutaDetalhada+=" mirou o braço esquerdo";
          }else if(idLocalCorpo[i]==4 || idLocalCorpo[i]==10){
            lutaDetalhada+=" mirou o braço direito";
          }else if(idLocalCorpo[i]==5 || idLocalCorpo[i]==11){
            lutaDetalhada+=" mirou a perna esquerda";
          }else if(idLocalCorpo[i]==6 || idLocalCorpo[i]==12){
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
        idLocalCorpo: Array<number>,
        Arena: Array<number>,
        Efetividade: Array<boolean>): any{
          var i=0;
          var pontos: any=[];
          
          for(i=0;i<12;i++){
            var p = new Pontos(i+1) ;
            pontos[i]= p;
            
          }
          
          for(i=0;i<Ataques.length;i++){
            
            if(Efetividade[i]==true){
              
              pontos[idLocalCorpo[i]-1].quantidadeAcertos++;
            }
            
            
            if(Ataques[i]==1){
              
              pontos[idLocalCorpo[i]].tipoAtaques.ataque1++;
            }else if(Ataques[i]==2){
              
              pontos[idLocalCorpo[i]].tipoAtaques.ataque2++;
            }else if(Ataques[i]==3){
              
              pontos[idLocalCorpo[i]].tipoAtaques.ataque3++;
            }else if(Ataques[i]==4){
              
              pontos[idLocalCorpo[i]].tipoAtaques.ataque4++;
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
          
          //separa os pontos em dois vetores
          for(i=0 ; i<12;i++){
            if(i<6){
              
              this.pontosLutador1[i]=pontos[i];
              
            }else{
              
              this.pontosLutador2[i-6]=pontos[i];
            }
          }
          
          for(i=0 ; i<6;i++){
            console.log(this.pontosLutador1[i].idLocalCorpo,this.pontosLutador1[i].quantidadeAcertos);
          }
          for(i=0 ; i<6;i++){
            console.log(this.pontosLutador2[i].idLocalCorpo,this.pontosLutador2[i].quantidadeAcertos);
          }
           
          this.pontosLutador1.sort(function(a, b){
            return b.quantidadeAcertos - a.quantidadeAcertos ;
          });
          this.pontosLutador2.sort(function(a, b){
            return b.quantidadeAcertos - a.quantidadeAcertos ;
          });
          
          for(i=0 ; i<6;i++){
            
            console.log(this.pontosLutador1[i].idLocalCorpo,this.pontosLutador1[i].quantidadeAcertos,);
            
          }
          for(i=0 ; i<6;i++){
            console.log(this.pontosLutador2[i].nomeLocalCorpo,this.pontosLutador2[i].quantidadeAcertos);
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
          public getPontosLutador1(): any {
            return this.pontosLutador1;
          }
          public setPontosLutador1(value: any) {
            this.pontosLutador1 = value;
          }
          public getPontosLutador2(): any {
            return this.pontosLutador2;
          }
          public setPontosLutador2(value: any) {
            this.pontosLutador2 = value;
          }
          
          
          
        }
        
        
        //Cria e preenche a classe Pontos, ultizada para trabalhar com os pontos para a estatistica da luta
        class Pontos {
          public idLocalCorpo;
          public quantidadeAcertos;
          public tipoAtaques;
          public nomeLocalCorpo;
          
          constructor(idLocalCorpo) {
            var ataque1=0;
            var ataque2=0;
            var ataque3=0;
            var ataque4=0;
            var ataque5=0;
            
            this.idLocalCorpo = idLocalCorpo;
            if(this.idLocalCorpo == 1 || this.idLocalCorpo == 7){
              
              this.nomeLocalCorpo = "Cabeça";

            }else if(this.idLocalCorpo == 2 || this.idLocalCorpo == 8){
              
              this.nomeLocalCorpo = "Tronco";

            }else if(this.idLocalCorpo == 3 || this.idLocalCorpo == 9){
              
              this.nomeLocalCorpo = "Braço Esquerdo";

            }else if(this.idLocalCorpo == 4 || this.idLocalCorpo == 10){
              
              this.nomeLocalCorpo = "Braço Direito";

            }else if(this.idLocalCorpo == 5 || this.idLocalCorpo == 11){
              
              this.nomeLocalCorpo = "Perna Direita";
              
            }else if(this.idLocalCorpo == 6 || this.idLocalCorpo == 12){
              
              this.nomeLocalCorpo = "Perna Esquerda";

            }
            this.quantidadeAcertos = 0;
            this.tipoAtaques = [ ataque1,ataque2,ataque3,ataque4,ataque5];
            this.tipoAtaques.ataque1=0;
            this.tipoAtaques.ataque2=0;
            this.tipoAtaques.ataque3=0;
            this.tipoAtaques.ataque4=0;
            this.tipoAtaques.ataque5=0;
            
          }
        }
        
        
