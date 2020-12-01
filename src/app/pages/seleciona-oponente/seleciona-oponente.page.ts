import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LutaService } from 'src/app/services/user/luta.service';
import { ModalPage } from '../../modal/modal.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleciona-oponente',
  templateUrl: './seleciona-oponente.page.html',
  styleUrls: ['./seleciona-oponente.page.scss'],
})

export class SelecionaOponentePage implements OnInit {

  meuNome: string ="";
  meuClube: string ="";
  nomeOponente: string ="";
  clubeOponente: string ="";
  valido: boolean;

  constructor(
    public modalCtrl1: ModalController,
    private lutaService: LutaService, 
    private profileService: ProfileService,
    public router: Router) {
      this.profileService
      .getUserProfile() 
      .get()
      .then( userProfileSnapshot => {
        this.meuNome = userProfileSnapshot.data().nome;  
        this.meuClube = userProfileSnapshot.data().clube;
      });
      
    this.nomeOponente = "Nome";
    this.clubeOponente = "Clube";
     }
  
  ngOnInit() {
  }

  async presentModal2() {
    const modal = await this.modalCtrl1.create({
      component: ModalPage
    });

    await modal.present();
    
    const { data } = await modal.onWillDismiss();

    if(data.atleta.nome == '' || data.atleta.clube == '' ){
      this.valido = false ;
      console.log(this.valido);

    }else{
      this.valido = true ;
      this.nomeOponente = data.atleta.nome ;
      this.clubeOponente = data.atleta.clube;
      console.log(this.valido);
    }  
  }

  async cadastro(): Promise<void> {
  
    try{
      this.lutaService.guardaOponente(
          this.meuNome,
          this.meuClube,
          this.nomeOponente,
          this.clubeOponente)

        this.router.navigate(['/registra-lutadores'])
    }catch(error){
      console.dir(error)
    }
  
}
}
