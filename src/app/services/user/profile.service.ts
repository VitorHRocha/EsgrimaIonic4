import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { concat } from 'rxjs';
import { AuthService } from './auth.service';
import { efeitoPratica } from './luta.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  numeroLutas: number = 0;
  public loading: HTMLIonLoadingElement;
  public loadingCtrl: LoadingController;
  private router: Router;
  public alertCtrl: AlertController;
  
  
  
  constructor(
    public authService: AuthService) {
      console.log('aqui3');
        // try {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.currentUser = user;
              this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
            }
          });
        // } catch (error) {
          
        // }   
    }
    
    getUserProfile():  firebase.firestore.DocumentReference {
        if (this.userProfile) {
          return this.userProfile;
        }
            
    }
    
    getCurrentUser(): firebase.User {
      
      return this.currentUser;
      
    }
    
    update_dados(nome: string, 
      clube: string,
      senha: string) {
        
        if (nome) {
          this.updateName(nome);
        }
        if (clube) {
          this.updateClube(clube);
        }
        if (senha) {
          this.updateSenha(senha);
        }
        
      }
      updateName(nome: string): Promise<any> {
        return this.userProfile.update({ nome });
      }
      updateClube(clube: string): Promise<any> {
        return this.userProfile.update({ clube });
      }      
      updateSenha(senha: string): Promise<any> {
        
        const user = firebase.auth().currentUser;
         console.log("AQ");
        return  user.updatePassword(senha).then(() => {
          
         console.log("Update successful");
        }).catch((error) => {
          // An error ocurred
          // ...
        });
        
      }
      updateEmail(email: string): Promise<any> {
        
        const user = firebase.auth().currentUser;
        
        return  user.updateEmail(email).then(() => {
          // Update successful.
        }).catch((error) => {
          // An error ocurred
          // ...
        });
        
      }
      
      updateAtleta(nome: string, clube: string): Promise<any> {
        
        return this.userProfile.update({
          lista_atleta: firebase.firestore.FieldValue.arrayUnion({
            nome,
            clube
          })
        });
        
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
        passiva_proativa: number,
        estrassado_calmo: number,
        disperso_alerta: number,
        taticamenteDisciplinado_taticamenteIndisciplinado: number,
        
        myConfiante: number,
        myEstressado: number,
        myFocado: number,
        myMotivado: number,
        myControlado: number,
        myDisciplinado: number,
        efeitoPratica: efeitoPratica
        ): Promise<any> {
          
          // console.log(idLuta);
          // console.log(tipoJogo);
          // console.log(etapaCampeonato);
          // console.log(etapaEliminatoria);
          // console.log(rankingOponente);
          // console.log(nome1);
          // console.log(clube1);
          // console.log(nome2);
          // console.log(clube2);
          // console.log(data);
          // console.log(hora);
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
              Jogo:{
                tipoJogo,
                etapaCampeonato,
                etapaEliminatoria,
                rankingOponente,
                classOponente,
                data,
                hora,
              },
              Perfil_Adversario:{
                nome2,
                clube2,
                altura_relativa,
                preferencia_manual: punho2,
                empunhadura,
                tatica,
                nivelTecnico,
              },
              Avaliacao_Adversario:{
                conservador_ousado,
                inconstante_constante,
                inseguro_confiante,
                pressionado_controlado,
                provocativa_respeitosa,
                passiva_proativa,
                estrassado_calmo,
                disperso_alerta,
                taticamenteDisciplinado_taticamenteIndisciplinado
              },
              Auto_Avaliacao:{
                confiante:  myConfiante,
                estressado: myEstressado,
                focado: myFocado,
                motivado: myMotivado,
                controlado: myControlado,
                disciplinado: myDisciplinado,
              },
              Efeito_Pratica: {
                sonolento_alerta: efeitoPratica.sonolento_alerta,
                cansado_vigoroso: efeitoPratica.cansado_vigoroso,
                inseguro_confiante: efeitoPratica.inseguro_confiante,
                preocupado_tranquilo: efeitoPratica.preocupado_tranquilo,
                triste_feliz: efeitoPratica.triste_feliz,
                desmotivado_motivado: efeitoPratica.desmotivado_motivado,
              }
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
        verificaPersistencia(numLutas: number): void {
          if (this.userProfile){
            
            this.router.navigateByUrl('user');
          }
          
        }
        
        async loginUser( login, senha): Promise<void> {
          
          this.loading = await this.loadingCtrl.create();
          await this.loading.present();
          const email = login;
          const password = senha;
          this.authService.loginUser(email+'@email.com', password).then(
            // this.authService.loginUser(email, password).then(
            () => {
              this.loading.dismiss().then(() => {
                this.router.navigateByUrl('user');
              });
            },
            error => {
              this.loading.dismiss().then(async () => {
                const alert = await this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok', role: 'cancel' }],
                });
                await alert.present();
              });
            }
            );
            
          }
          
          
        }
