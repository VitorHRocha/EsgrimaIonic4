import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from '../../services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';
import { AlertController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { ModalFiltroPage } from '../../modal-filtro/modal-filtro.page';



@Component({ 
  selector: 'app-minhas-lutas',
  templateUrl: './minhas-lutas.page.html', 
  styleUrls: ['./minhas-lutas.page.scss'],
})
export class MinhasLutasPage implements OnInit {
  public lutas: any;
  public lutaVisao: any;
  public userProfile: any;
  
  
  constructor(
    private profileService: ProfileService,
    public router: Router,
    public lutaService:LutaService,
    public modalCtrl1: ModalController, 
    public alertController: AlertController
    ) {   
      
    }  
    voltar(){
      this.router.navigate(['/user'])
    }
    ngOnInit() {
      this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.lutas = this.userProfile.lutadores;
        this.lutaVisao = this.lutas.slice();
        this.ordenaLutas(this.lutaVisao);
        this.formataExibicaoData(this.lutaVisao);
        console.log(this.userProfile);
      });
    }

    selecionaLuta(lutaSelecionada){
      
      this.lutaService.setLutaAtual(lutaSelecionada);
      console.log(lutaSelecionada);
      this.router.navigate(['/relatorio']) 
    }
    
    ordenaLutas(listLutas){
      var valor: any;
      var a_data_num: number;
      var b_data_num: number;
      var a_data_string: string;
      var b_data_string: string;
      // console.log(this.lutas[0].Jogo.etapaCampeonato);
      // console.log(this.userProfile);
      listLutas.sort(function(a, b){
        valor =  b.data - a.data ;
        a_data_string = a.Jogo.data + a.Jogo.hora;
        b_data_string = b.Jogo.data + b.Jogo.hora;
        a_data_string = a_data_string.replace(/\./g,'');        
        console.log(a_data_string);
        a_data_string = a_data_string.replace(/\:/g,'');        
        console.log(a_data_string);
        b_data_string = b_data_string.replace(/\./g,'');
        b_data_string = b_data_string.replace(/\:/g,'');
        a_data_num = parseInt(a_data_string);
        b_data_num = parseInt(b_data_string);
        valor = b_data_num - a_data_num;
        return valor;
      });
      
    }
    formataExibicaoData(listLutas){
      
      var data_string: string;
      var data_string_aux: string;
      for (var luta in listLutas){
        data_string_aux = "";
        data_string = listLutas[luta].data;
        data_string = data_string.replace(/\./g,''); 
        data_string_aux = data_string_aux.concat(data_string.substring(6, 8));
        data_string_aux = data_string_aux.concat('/');
        data_string_aux = data_string_aux.concat(data_string.substring(4, 6));
        data_string_aux = data_string_aux.concat('/');
        data_string_aux = data_string_aux.concat(data_string.substring(0, 4));
        listLutas[luta].data = data_string_aux;
        console.log(data_string_aux);
      }
      
    }
    
    buscarData(){
    }
    
    async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Radio',
        inputs: [
          {
            name: 'Treinamento',
            type: 'radio',
            label: 'Treinamento',
            value: 'treinamento',
            checked: true
          },
          {
            name: 'Campeonato',
            type: 'radio',
            label: 'Campeonato',
            value: 'campeonato'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              this.filtraLutas(data);
            }
          }
        ]
      }); 
      
      await alert.present();
    }
    
    public filtraLutas(filtro:any){
      console.log(this.lutaVisao);
      var aux: string;  
      // console.log(indice);
      
      console.log(filtro);
      console.log(filtro.filtro.tipoJogo);
      if(filtro.filtro.tipoJogo === undefined){
        return;
      }else if(filtro.filtro.tipoJogo == "limpar"){
        
        this.lutaVisao = this.lutas.slice();
        return;
      }
      this.lutaVisao = [];
      for (var luta in this.lutas){
        if(this.lutas[luta].Jogo.tipoJogo == filtro.filtro.tipoJogo){
          if(filtro.filtro.etapaCampeonato === undefined){
            this.lutaVisao.push(this.lutas[luta]);
          }else{
            if(this.lutas[luta].Jogo.etapaCampeonato == filtro.filtro.etapaCampeonato){
              if(filtro.filtro.etapaEliminatoria === undefined){
                this.lutaVisao.push(this.lutas[luta]);
              }else if(this.lutas[luta].Jogo.etapaEliminatoria == filtro.filtro.etapaEliminatoria){
                console.log(filtro.filtro.etapaEliminatoria); 
                console.log(this.lutas[luta].etapaEliminatoria);
                this.lutaVisao.push(this.lutas[luta]);
              }
            }
          }
        }
      }
      console.log(this.lutaVisao);
    }
    
    async presentModal() {
      const modal = await this.modalCtrl1.create({
        component: ModalFiltroPage
      });
      
      await modal.present();
      
      const { data } = await modal.onWillDismiss();
      this.filtraLutas(data);
      
    }
    
    
    
  }
  
  
