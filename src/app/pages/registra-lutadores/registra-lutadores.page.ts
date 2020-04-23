import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';
import { empty } from 'rxjs';


@Component({
  selector: 'app-registra-lutadores',
  templateUrl: './registra-lutadores.page.html',
  styleUrls: ['./registra-lutadores.page.scss'],
})
export class RegistraLutadoresPage implements OnInit {
  
  public regiOpform: FormGroup;
  public loading: any;
  public currentUser: firebase.User;
  public current; 
  public userProfile: any;
  public teste;
  public tipoLuta;

  meuNome: string ="";
  meuClube: string ="";
  nomeOponente: string ="";
  clubeOponente: string ="";

  public valido;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService:ProfileService,
    private lutaService: LutaService,
    public modalCtrl1: ModalController) {
      this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.meuNome = userProfileSnapshot.data().nome;  
      this.meuClube = userProfileSnapshot.data().clube;
      
    });
      
   }
  
  voltar(){
    this.router.navigate(['/user'])
  }
  
  async cadastro(): Promise<void> {
  
     try{
       this.lutaService.guardaLutadores(
           this.tipoLuta, 
           this.meuNome,
           this.meuClube,
           this.nomeOponente,
           this.clubeOponente)
           
         this.router.navigate(['/luta'])
     }catch(error){
       console.dir(error)
     }
   
 }


async presentModal2() {
  const modal = await this.modalCtrl1.create({
    component: ModalPage
  });

  await modal.present();
  
  const { data } = await modal.onWillDismiss();
  console.log(data);

  this.nomeOponente = data.atleta.nome ;
  this.clubeOponente = data.atleta.clube;
  
  if(this.nomeOponente == '' || this.meuNome == '' ){
    this.valido = false ;

  }else{
    this.valido = true ;
  }

  
}
  
  ngOnInit() {
     //document.getElementById("fotoButton1").setAttribute("src",`./assets/img/esgr_mask.jpg`);
     
     document.getElementById("fotoButton2").setAttribute("src",`./assets/img/esgr_mask.jpg`);
    
    
  }
  Treinamento(){
    this.tipoLuta = 'Treinamento';
  }
  Campeonato(){
    this.tipoLuta = 'Campeonato';
  }

}
