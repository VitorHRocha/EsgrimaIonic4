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
  public etapaCampeonato;
  public etapaEliminatoria;

  //Ranking do oponente para etapa de poule 
  public rankingOponente;
  //Classificação do oponente para etapa de eliminatoria 
  public classOponente;

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
  
  ngOnInit() {
    document.getElementById("fotoButton2").setAttribute("src",`./assets/img/esgr_mask.jpg`);
    document.getElementById("etapa_campeonato").style.display = "none";
    document.getElementById("etapa_eliminatoria").style.display = "none";
    document.getElementById("raking_oponente_poule").style.display = "none";
    document.getElementById("class_oponente_eliminatoria").style.display = "none";
    
    this.etapaCampeonato   = "";
    this.etapaEliminatoria = "";
    this.rankingOponente   = "";
    this.classOponente     = "";  
  }
  
  voltar(){
    this.router.navigate(['/user'])
  }
  
  async cadastro(): Promise<void> {
  
     try{
       this.lutaService.guardaLutadores(
           this.tipoLuta,
           this.etapaCampeonato,
           this.etapaEliminatoria,
           this.rankingOponente,
           this.classOponente, 
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
  
  //ETAPA CAMPEONATO-------INICIO--------------------------
  segmentTipoJogo(tipoLuto: any){ 
    this.tipoLuta = tipoLuto.detail.value;
    if(this.tipoLuta == "campeonato"){
      document.getElementById("etapa_campeonato").style.display = "";
      this.etapaCampeonato = "poule";
      document.getElementById("etapa_campeonato").setAttribute("value","poule");
      this.rankingOponente = "melhor";
      document.getElementById("raking_oponente_poule").style.display = "";
      document.getElementById("raking_oponente_poule").setAttribute("value","melhor");
    
    }else{
      document.getElementById("etapa_campeonato").style.display            = "none";
      document.getElementById("etapa_eliminatoria").style.display          = "none";
      document.getElementById("raking_oponente_poule").style.display       = "none";
      document.getElementById("class_oponente_eliminatoria").style.display = "none";
      this.etapaCampeonato   = "";
      this.etapaEliminatoria = "";
      this.rankingOponente   = "";
      this.classOponente     = "";

    }
  }

  segmentEtapaCampeonato(etapaCampeonato: any){
    this.etapaCampeonato = etapaCampeonato.detail.value;
    if(this.etapaCampeonato == "eliminatoria"){
      document.getElementById("etapa_eliminatoria").style.display = "";
      document.getElementById("etapa_eliminatoria").setAttribute("value","64");
      this.etapaEliminatoria = "64";
      
    }else{
      document.getElementById("etapa_eliminatoria").style.display = "none";
      this.etapaEliminatoria = "";  
    }

    if(this.etapaCampeonato == "eliminatoria"){
      this.rankingOponente = '';
      this.classOponente   = 'melhor';
      document.getElementById("raking_oponente_poule").style.display       = "none";
      document.getElementById("class_oponente_eliminatoria").style.display = "";
    }else{
      this.rankingOponente = 'melhor';
      this.classOponente   = '';
      document.getElementById("raking_oponente_poule").style.display       = "";
      document.getElementById("class_oponente_eliminatoria").style.display = "none";
    }
  }
  
  segmentEtapaEliminatoria(etapaEliminatoria: CustomEvent){
    this.etapaEliminatoria = etapaEliminatoria.detail.value;
  }

  //ETAPA CAMPEONATO-------FINAL--------------------------

  //CLASSIFICAÇÃO CAMPEONATO-------INICIO--------------------------
  
  segmentRakingOponentePoule(rankingOponente: any){
    this.rankingOponente = rankingOponente.detail.value;
  }

  segmentClassOponenteEliminatoria(classOponente: any){
    this.classOponente = classOponente.detail.value;
  }

  //CLASSIFICAÇÃO CAMPEONATO-------FINAL--------------------------
}
