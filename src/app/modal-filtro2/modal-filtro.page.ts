import { Component, Injectable, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-page',
  templateUrl: './modal-filtro.page.html', 
  styleUrls: ['./modal-filtro.page.scss'], 
})

@Injectable()
export class ModalFiltro2Page implements OnInit {
  public myFiltro = new filtro;
  filtroEscolhido = true;
  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,) {
  }

  ngOnInit() {
    document.getElementById("etapa_campeonato").style.display = "none";
    document.getElementById("etapa_eliminatoria").style.display = "none";
  }
  radioChangeTipoJogo(tipoJogo:any){
    this.myFiltro.tipoJogo = tipoJogo.detail.value;
    this.filtroEscolhido = false;
    if (this.myFiltro.tipoJogo == 'campeonato'){
      document.getElementById("etapa_campeonato").style.display = "";
    }else if(this.myFiltro.tipoJogo == 'treinamento'){
      this.myFiltro.etapaCampeonato = undefined;
      this.myFiltro.etapaEliminatoria = undefined;
      document.getElementById("etapa_campeonato").style.display = "none";
      document.getElementById("etapa_eliminatoria").style.display = "none";
    }else{
      // this.myFiltro.etapaCampeonato ='';
    }
  }
  radioChangeEtapaCampeonato(etapaCampeonato:any){
    this.myFiltro.etapaCampeonato = etapaCampeonato.detail.value;
    if (this.myFiltro.etapaCampeonato == 'eliminatoria'){
      document.getElementById("etapa_eliminatoria").style.display = "";

    }else if(this.myFiltro.etapaCampeonato == 'poule'){
      this.myFiltro.etapaEliminatoria = undefined;
      document.getElementById("etapa_eliminatoria").style.display = "none";
    }else{
      // this.myFiltro.etapaCampeonato ='';
    }
  }
  radioChangeEtapaEliminatoria(etapaEliminatoria:any){
    this.myFiltro.etapaEliminatoria = etapaEliminatoria.detail.value;
    if(this.myFiltro.etapaEliminatoria === undefined){
      this.myFiltro.etapaEliminatoria = undefined;
    }
  }
  

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optio''nally pass back data  
    this.modalCtrl.dismiss({
      'filtro': this.myFiltro
    });
  }

  limpaFiltro(){
    this.myFiltro.tipoJogo = "limpar";
    this.dismiss();
  }

  voltar(){
    var filtroVazio = new filtro;
    this.myFiltro = filtroVazio;
    this.dismiss();
  }
    
}

class filtro{
  public tipoJogo: string;
  public etapaCampeonato: string;
  public etapaEliminatoria: string;
}
