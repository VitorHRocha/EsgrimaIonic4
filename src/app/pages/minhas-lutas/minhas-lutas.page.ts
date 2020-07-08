import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from '../../services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { ModalFiltroPage } from '../../modal-filtro/modal-filtro.page';
import { FiltroPage } from 'src/app/filtro/filtro.page';
// import { clear } from 'console';
// import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';



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
    });
 }
  selecionaLuta(lutaSelecionada){

    this.lutaService.setLutaAtual(lutaSelecionada);
    this.router.navigate(['/relatorio']) 
    }

  ordenaLutas(listLutas){
  var valor: any;
  var a_data_num: number;
  var b_data_num: number;
  var a_data_string: string;
  var b_data_string: string;
  console.log(this.lutas);
  listLutas.sort(function(a, b){
      valor =  b.data - a.data ;
      a_data_string = a.data + a.hora;
      b_data_string = b.data + b.hora;
      a_data_string = a_data_string.replace('.','');
      a_data_string = a_data_string.replace('/','');
      b_data_string = b_data_string.replace('.','');
      b_data_string = b_data_string.replace('/','');
      a_data_num = parseInt(a_data_string);
      b_data_num = parseInt(b_data_string);
      valor = b_data_num - a_data_num;
      return valor;
    });

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

  public filtraLutas(filtro){
    console.log(this.lutaVisao);
    this.lutaVisao = [];
    console.log(this.lutas);
    console.log(this.lutaVisao);
    // console.log(indice);
    for (var luta in this.lutas){

      console.log(this.lutas[luta]);
      if(this.lutas[luta].tipoJogo == filtro){
        console.log('aqui');
        this.lutaVisao.push(this.lutas[luta]);
      }
    }
    console.log(this.lutaVisao);
 }

async presentModal2() {
  const modal = await this.modalCtrl1.create({
    component: ModalFiltroPage
  });

  await modal.present();
  
  const { data } = await modal.onWillDismiss();
  console.log(data);

}



}


