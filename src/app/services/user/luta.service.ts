import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ProfileService } from './profile.service';
// import { efeitoPratica } from 'src/app/pages/condicao-pos-luta/condicao-pos-luta.page';

@Injectable({
  providedIn: 'root'
})

export class LutaService {
  
  
  public eventListRef: firebase.firestore.DocumentReference;
  public userProfile: any;
  public currentUser: firebase.User;
  public lutaAtual;
  
  private tipoJogo: string;
  private etapaCampenato: string;
  private etapaEliminatoria: string;
  
  private rankingOponente: string;
  private classOponente: string;
  
  private nome1: string;
  private clube1: string;
  private nome2: string;
  private clube2: string;
  
  private altura_relativa: string;
  private punho1: string;
  private punho: string;
  private empunhadura: string;
  private tatica: string;
  private nivelTecnico: string;
  
  private conservador_ousado: number;
  private inconstante_constante: number;
  private inseguro_confiante: number;
  private pressionado_controlado: number;
  private provocativa_respeitosa: number;
  private passiva_proativa: number;
  private estrassado_calmo: number;
  private disperso_alerta: number;
  private taticamenteDisciplinado_taticamenteIndisciplinado: number;
  
  private efeitoPratica = new efeitoPratica;
  
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
    Area: Array<number>):
    Promise<any> {
      return this.eventListRef.update({
        lutas: firebase.firestore.FieldValue.arrayUnion({
          Ataques,
          LocalCorpo,
          Area
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
        
        var i = 0;
        var lutaDetalhada: string = "";
        for (i = 0; i < Ataques.length; i++) {
          if (idLocalCorpo[i] > 8) {
            lutaDetalhada += Lutadores[1];
          } else {
            lutaDetalhada += Lutadores[0];
          }
          if (Ataques[i] == 1) {
            lutaDetalhada += " com um ataque";
          } else if (Ataques[i] == 2) {
            lutaDetalhada += " com uma resposta";
          } else if (Ataques[i] == 3) {
            lutaDetalhada += " com um contra resposta";
          } else if (Ataques[i] == 4) {
            lutaDetalhada += " com um contra ataque";
          } else if (Ataques[i] == 5) {
            lutaDetalhada += " em um toque duplo";
          }
          
          if (idLocalCorpo[i] == 1 || idLocalCorpo[i] == 9) {
            lutaDetalhada += " mirou a cabeça";
          } else if (idLocalCorpo[i] == 2 || idLocalCorpo[i] == 10) {
            lutaDetalhada += " mirou o braço esquerdo";
          } else if (idLocalCorpo[i] == 3 || idLocalCorpo[i] == 11) {
            lutaDetalhada += " mirou o tronco";
          } else if (idLocalCorpo[i] == 4 || idLocalCorpo[i] == 12) {
            lutaDetalhada += " mirou o braço direito";
          } else if (idLocalCorpo[i] == 5 || idLocalCorpo[i] == 13) {
            lutaDetalhada += " mirou a perna esquerda";
          } else if (idLocalCorpo[i] == 6 || idLocalCorpo[i] == 14) {
            lutaDetalhada += " mirou a perna direita";
          } else if (idLocalCorpo[i] == 7 || idLocalCorpo[i] == 14) {
            lutaDetalhada += " mirou o pe direito";
          } else if (idLocalCorpo[i] == 8 || idLocalCorpo[i] == 14) {
            lutaDetalhada += " mirou o pe direito";
          }
          
          
          if (Arena[i] == 1) {
            lutaDetalhada += " na zona 1 \n";
          } else if (Arena[i] == 2) {
            lutaDetalhada += " na zona 2 \n";
          } else if (Arena[i] == 3) {
            lutaDetalhada += "na zona 3 \n";
          } else if (Arena[i] == 4) {
            lutaDetalhada += " na zona 4 \n";
          } else if (Arena[i] == 5) {
            lutaDetalhada += " na zona 5 \n";
          }
          
        }
        return lutaDetalhada;
        
      }
      
      formaLutaEstatistic(
        LutadoresNomes: Array<string>,
        Ataques: Array<number>,
        idLocalCorpo: Array<number>,
        Arena: Array<number>,
        Efetividade: Array<boolean>): any {
          var i = 0;
          var pontos = [];
          
          for (i = 1; i <= 20; i++) {
            var p = new Pontos(i);
            pontos[i] = p;
            // console.log(pontos[i])
            
          }
          console.log(Ataques)
          for (i = 0; i < Ataques.length; i++) {
            
            pontos[idLocalCorpo[i]].quantidadeAcertos++;
            console.log(pontos[idLocalCorpo[i]]);
            
            
            if (Ataques[i] == 1) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque1) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque1 = 0
              }
              pontos[idLocalCorpo[i]].tipoAtaques.ataque1++; 
            } else if (Ataques[i] == 2) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque2) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque2 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque2++;
            } else if (Ataques[i] == 3) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque3) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque3 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque3++;
            } else if (Ataques[i] == 4) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque4) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque4 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque4++;
            } else if (Ataques[i] == 5) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque5) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque5 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque5++;
            }
            
            else if (Ataques[i] == 11) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque11) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque11 = 0
              }
              pontos[idLocalCorpo[i]].tipoAtaques.ataque11++; 
            } else if (Ataques[i] == 12) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque12) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque12 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque12++;
            } else if (Ataques[i] == 13) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque13) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque13 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque13++;
            } else if (Ataques[i] == 14) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque14) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque14 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque14++;
            } else if (Ataques[i] == 15) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque15) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque15 = 0
              } pontos[idLocalCorpo[i]].tipoAtaques.ataque15++;
            }
            
            else if (Ataques[i] == 7) {
              if (!pontos[idLocalCorpo[i]].tipoAtaques.ataque7) {
                pontos[idLocalCorpo[i]].tipoAtaques.ataque7 = 0
              }
              pontos[idLocalCorpo[i]].tipoAtaques.ataque7++; 
            }
            
            
          }
          
          //separa os pontos em dois vetores
          for (i = 0; i < 20; i++) {
            if (i < 10) {
              
              this.pontosLutador1[i] = pontos[i + 1];
            } else {
              
              this.pontosLutador2[i - 10] = pontos[i];
            }
          }
          
          for (i = 0; i < 10; i++) {
            console.log(this.pontosLutador1[i].idLocalCorpo, this.pontosLutador1[i].quantidadeAcertos, this.pontosLutador1[i].nomeLocalCorpo);
          }
          for (i = 0; i < 10; i++) {
            console.log(this.pontosLutador2[i].idLocalCorpo, this.pontosLutador2[i].quantidadeAcertos, this.pontosLutador1[i].nomeLocalCorpo);
          }
          
          this.pontosLutador1.sort(function (a, b) {
            return b.quantidadeAcertos - a.quantidadeAcertos;
          });
          this.pontosLutador2.sort(function (a, b) {
            return b.quantidadeAcertos - a.quantidadeAcertos;
          });
          
          
          
        }
        
        guardaCaracteristicasJogo(
          tipoJogo: string,
          etapaCampenato: string,
          etapaEliminatoria: string,
          rankingOponente: string,
          classOponente: string) {
            this.tipoJogo = tipoJogo;
            this.etapaCampenato = etapaCampenato;
            this.etapaEliminatoria = etapaEliminatoria;
            this.rankingOponente = rankingOponente;
            this.classOponente = classOponente;
          }
          
          guardaOponente(
            nome1: string,
            clube1: string,
            nome2: string,
            clube2: string){
              this.nome1 = nome1;
              this.nome2 = nome2;
              this.clube1 = clube1;
              this.clube2 = clube2;
              
            }
            
            guardaCaracteristicasOponente(
              altura_relativa: string,
              punho1: string,
              punho: string,
              empunhadura: string,
              tatica: string,
              nivelTecnico: string) {
                this.altura_relativa = altura_relativa;
                this.punho1 = punho1,
                this.punho = punho,
                this.empunhadura = empunhadura,
                this.tatica = tatica,
                this.nivelTecnico = nivelTecnico;
              }
              
              guardaComportamentoOponente(
                conservador_ousado: number,
                inconstante_constante: number,
                inseguro_confiante: number,
                pressionado_controlado: number,
                provocativa_respeitosa: number,
                passiva_proativa: number,                
                estrassado_calmo: number,   
                disperso_alerta: number,   
                taticamenteDisciplinado_taticamenteIndisciplinado: number,   
                ) {
                  this.conservador_ousado = conservador_ousado;
                  this.inconstante_constante = inconstante_constante;
                  this.inseguro_confiante = inseguro_confiante;
                  this.pressionado_controlado = pressionado_controlado;
                  this.provocativa_respeitosa = provocativa_respeitosa;
                  this.passiva_proativa = passiva_proativa;
                  this.estrassado_calmo = estrassado_calmo;
                  this.disperso_alerta = disperso_alerta;
                  this.taticamenteDisciplinado_taticamenteIndisciplinado = taticamenteDisciplinado_taticamenteIndisciplinado;
      
                }
                
                public setLutaAtual(lutaAtual) {
                  this.lutaAtual = lutaAtual;
                }
                
                public getConservadorOusado() {
                  return this.conservador_ousado;
                }
                
                public getInconstanteConstante() {
                  return this.inconstante_constante;
                }
                
                public getInseguroConfiante() {
                  return this.inseguro_confiante;
                }
                
                public getPressionadoControlado() {
                  return this.pressionado_controlado;
                }
                
                public getProvocativaRespeitosa() {
                  return this.provocativa_respeitosa;
                }
                
                public getPassivaProativa() {
                  return this.passiva_proativa;
                }

                public getEstrassado_calmo() {
                  return this.estrassado_calmo;
                }

                public getDisperso_alerta() {
                 return this.disperso_alerta;
                }

                public getTaticamenteDisciplinado_taticamenteIndisciplinado() {
                  return this.taticamenteDisciplinado_taticamenteIndisciplinado;
                }
                
                public getAlturaRelativa() {
                  return this.altura_relativa;
                }
                
                public getPunho1() {
                  return this.punho1;
                }
                
                public getPunho() {
                  return this.punho;
                }
                
                public getEmpunhadura() {
                  return this.empunhadura;
                }
                
                public getTatica() {
                  return this.tatica;
                }
                
                public getNivelTecnico(): string {
                  return this.nivelTecnico;
                }
                
                public getLutaAtual() {
                  return this.lutaAtual;
                }
                
                public getTipoJogo() {
                  return this.tipoJogo;
                }
                
                public getEtapaCampenato() {
                  return this.etapaCampenato;
                }
                
                public getEtapaEliminatoria() {
                  return this.etapaEliminatoria;
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
                
                public getRankingOponente(): any {
                  return this.rankingOponente;
                }
                
                public getClassOponente(): any {
                  return this.classOponente;
                }
                
                public getEfeitoPratica(): any {
                  return this.efeitoPratica;
                }
                
                public setEfeitoPratica(efeitoPratica: efeitoPratica) {
                  this.efeitoPratica = efeitoPratica;
                }
                
                public getData(): string {
                  
                  var date = new Date();
                  var data: string;
                  var mes: any;
                  var dia: any;
                  var ano: any;
                  
                  // Recebe valores
                  ano = date.getFullYear();
                  mes = date.getMonth() + 1;
                  dia = date.getDate();
                  
                  // transforma em String
                  dia = dia.toString();
                  mes = mes.toString();
                  ano = ano.toString();
                  
                  //Manipula valores
                  if (dia.length < 2) {
                    dia = '0' + dia;
                  }
                  if (mes.length < 2) {
                    mes = '0' + mes;
                  }
                  mes = mes.concat('.', dia);
                  data = ano.concat('.', mes);
                  return data;
                  
                }
                
                public getHora(): string {
                  
                  var date = new Date();
                  var hora: any;
                  var min: any;
                  
                  // Recebe valores
                  hora = date.getHours();
                  min = date.getMinutes();
                  
                  // Transforma em String
                  hora = hora.toString();
                  min = min.toString();
                  
                  
                  //Manipula valores
                  if (hora.length < 2) {
                    hora = '0' + hora;
                  }
                  if (min.length < 2) {
                    min = '0' + min;
                  }
                  
                  hora = hora.concat(':', min);
                  return hora;
                  
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
                
                public tipoAtaques = new TipoAtaques;
                public nomeLocalCorpo;
                
                constructor(idLocalCorpo) {
                  var ataque1 = 0;
                  var ataque2 = 0;
                  var ataque3 = 0;
                  var ataque4 = 0;
                  var ataque5 = 0;
                  
                  this.idLocalCorpo = idLocalCorpo;
                  if (this.idLocalCorpo == 1 || this.idLocalCorpo == 11) {
                    
                    this.nomeLocalCorpo = "Cabeça";
                    
                  } else if (this.idLocalCorpo == 2 || this.idLocalCorpo == 12) {
                    this.nomeLocalCorpo = "Tronco";
                    
                  } else if (this.idLocalCorpo == 3 || this.idLocalCorpo == 13) {
                    
                    this.nomeLocalCorpo = "Braço Esquerdo";
                    
                    
                  } else if (this.idLocalCorpo == 4 || this.idLocalCorpo == 14) {
                    
                    this.nomeLocalCorpo = "Mão Esquerda";
                    
                    
                  } else if (this.idLocalCorpo == 5 || this.idLocalCorpo == 15) {
                    
                    this.nomeLocalCorpo = "Braço Direito";
                    
                  }  else if (this.idLocalCorpo == 6 || this.idLocalCorpo == 16) {
                    
                    this.nomeLocalCorpo = "Mão Direita";
                    
                  } else if (this.idLocalCorpo == 7 || this.idLocalCorpo == 17) {
                    
                    
                    this.nomeLocalCorpo = "Perna Direita";
                    
                  } else if (this.idLocalCorpo == 8 || this.idLocalCorpo == 18) {
                    
                    this.nomeLocalCorpo = "Perna Esquerda";
                    
                  } else if (this.idLocalCorpo == 9 || this.idLocalCorpo == 19) {
                    
                    
                    this.nomeLocalCorpo = "Pe Direito";
                    
                  } else if (this.idLocalCorpo == 10 || this.idLocalCorpo == 20) {
                    
                    this.nomeLocalCorpo = "Pe Esquerdo";
                    
                  }
                  
                  
                  
                  this.quantidadeAcertos = 0;
                  this.tipoAtaques.ataque1 = 0;
                  this.tipoAtaques.ataque2 = 0;
                  this.tipoAtaques.ataque3 = 0;
                  this.tipoAtaques.ataque4 = 0;
                  this.tipoAtaques.ataque5 = 0;
                  
                  this.tipoAtaques.ataque11 = 0;
                  this.tipoAtaques.ataque12 = 0;
                  this.tipoAtaques.ataque13 = 0;
                  this.tipoAtaques.ataque14 = 0;
                  this.tipoAtaques.ataque15 = 0;
                  
                  this.tipoAtaques.ataque7 = 0;
                  
                }
              }
              class TipoAtaques {
                public ataque1 = 0;
                public ataque2 = 0;
                public ataque3 = 0;
                public ataque4 = 0;
                public ataque5 = 0;
                
                public ataque11 = 0;
                public ataque12 = 0;
                public ataque13 = 0;
                public ataque14 = 0;
                public ataque15 = 0;
                
                public ataque7 = 0;
                
              }
              
              export class efeitoPratica {
                constructor() {
                }
                public sonolento_alerta: number;
                public cansado_vigoroso: number;
                public inseguro_confiante: number;
                public preocupado_tranquilo: number;
                public triste_feliz: number;
                public desmotivado_motivado: number;
                
              }
