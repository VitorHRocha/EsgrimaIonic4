import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';

 


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
    private lutaService: LutaService) { 
      this.profileService
    .getUserProfile() 
    .get()
    .then( userProfileSnapshot => {
      this.meuNome = userProfileSnapshot.data().nome;  
      this.meuClube = userProfileSnapshot.data().clube;
    });
      
  }
  
  ngOnInit() {
    document.getElementById("etapa_campeonato").style.display = "none";
    document.getElementById("etapa_eliminatoria").style.display = "none";
    document.getElementById("raking_oponente_poule").style.display = "none";
    document.getElementById("class_oponente_eliminatoria").style.display = "none";

    // document.getElementById("melhorclass").setAttribute("src",`./assets/icon/arrow-down-circle-outline.svg`);

    this.tipoLuta = "treinamento" ;
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
       this.lutaService.guardaCaracteristicasJogo(
           this.tipoLuta,
           this.etapaCampeonato,
           this.etapaEliminatoria,
           this.rankingOponente,
           this.classOponente)
           
         this.router.navigate(['/luta'])
     }catch(error){
       console.dir(error)
     }
   
 }

   
  //ETAPA CAMPEONATO-------INICIO--------------------------
  segmentTipoJogo(tipoLuta: any){ 
    this.tipoLuta = tipoLuta;
    console.log(tipoLuta);

    var galleries = document.getElementsByClassName("tipo_jogo");
    var len =  galleries.length;
    for(var i=0 ; i<len; i++){
      galleries[i].setAttribute(`color`,"tertiary");
    } 
    
    document.getElementById(tipoLuta).setAttribute(`color`,"primary");

    if(this.tipoLuta == "campeonato"){
      document.getElementById("etapa_campeonato").style.display = "";
      document.getElementById("raking_oponente_poule").style.display = "";
      this.etapaCampeonato = "poule";
      this.rankingOponente = "melhor";
      galleries = document.getElementsByClassName("raking_oponente_poule");
      len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      }

      document.getElementById("melhor_ranqueado").setAttribute(`color`,"primary");
    
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
    this.etapaCampeonato = etapaCampeonato;
    var galleries = document.getElementsByClassName("etapa_campeonato");
    var len =  galleries.length;
    for(var i=0 ; i<len; i++){
      galleries[i].setAttribute(`color`,"tertiary");
    }
    document.getElementById(etapaCampeonato).setAttribute(`color`,"primary");

    if(this.etapaCampeonato == "eliminatoria"){
      document.getElementById("etapa_eliminatoria").style.display = "";
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

      galleries = document.getElementsByClassName("class_oponente_eliminatoria");
      len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      }
      document.getElementById("melhor_classificado").setAttribute(`color`,"primary");

    }else{
      this.rankingOponente = 'melhor';
      this.classOponente   = '';
      document.getElementById("raking_oponente_poule").style.display       = "";
      document.getElementById("class_oponente_eliminatoria").style.display = "none";

      galleries = document.getElementsByClassName("raking_oponente_poule");
      len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      }
      document.getElementById("melhor_ranqueado").setAttribute(`color`,"primary");
    }
  }
  
  segmentEtapaEliminatoria(etapaEliminatoria: any){
    var galleries = document.getElementsByClassName("etapa_eliminatoria");
    var len =  galleries.length;
    for(var i=0 ; i<len; i++){
      galleries[i].setAttribute(`color`,"tertiary");
    }
    document.getElementById(etapaEliminatoria).setAttribute(`color`,"primary");
    this.etapaEliminatoria = etapaEliminatoria;
  }

  //ETAPA CAMPEONATO-------FINAL--------------------------

  //CLASSIFICAÇÃO CAMPEONATO-------INICIO--------------------------
  
  segmentRakingOponentePoule(rankingOponente: any){
    this.rankingOponente = rankingOponente;
    console.log(rankingOponente);
    var galleries = document.getElementsByClassName("raking_oponente_poule");
    var len =  galleries.length;
    for(var i=0 ; i<len; i++){
      galleries[i].setAttribute(`color`,"tertiary");
    }
    rankingOponente = rankingOponente.concat("_ranqueado");
    console.log(rankingOponente);
    document.getElementById(rankingOponente).setAttribute(`color`,"primary");

  }

  segmentClassOponenteEliminatoria(classOponente: any){
    this.classOponente = classOponente;
    var galleries = document.getElementsByClassName("class_oponente_eliminatoria");
    var len =  galleries.length;
    for(var i=0 ; i<len; i++){
      galleries[i].setAttribute(`color`,"tertiary");
    }
    classOponente = classOponente.concat("_classificado");
    console.log(classOponente);
    document.getElementById(classOponente).setAttribute(`color`,"primary");

  }

  //CLASSIFICAÇÃO CAMPEONATO-------FINAL--------------------------
}
