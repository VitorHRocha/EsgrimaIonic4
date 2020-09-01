import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';

@Component({
  selector: 'app-auto-avaliacao',
  templateUrl: './auto-avaliacao.page.html',
  styleUrls: ['./auto-avaliacao.page.scss'],
})
export class AutoAvaliacaoPage implements OnInit {
  
  public userProfile: any;
  public regiOpform: FormGroup;
  public loading: any;
  public currentUser: firebase.User;
  public current; 

  public myConfiante: number;
  public myDisciplinado: number;
  public myControlado: number;
  public myMotivado: number;
  public myFocado: number;
  public myEstressado: number;


  constructor(private router: Router,
              private profileService:ProfileService,
              private lutaService:LutaService) { }

  ngOnInit() {
      this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
    
    this.myConfiante = 1;
    this.myEstressado = 1;
    this.myFocado = 1;
    this.myMotivado = 1;
    this.myControlado = 1;
    this.myDisciplinado = 1;
  }

  rangeConfiante(event: any){
    this.myConfiante = event.detail.value;

  }

  rangeEstressado(event: any){
    this.myEstressado = event.detail.value;
    
  }
  rangeFocado(event: any){
    this.myFocado = event.detail.value;
    
  }

  rangeMotivado(event: any){
    this.myMotivado = event.detail.value;
    
  }
  rangeControlado(event: any){
    this.myControlado = event.detail.value;
    
  }
  rangeDisciplinado(event: any){
    this.myDisciplinado = event.detail.value;
    
  }

  async cadastro(): Promise<void> {

    console.log(this.myConfiante);
    console.log(this.myEstressado);
    console.log(this.myFocado);
    console.log(this.myMotivado);
    console.log(this.myControlado);
    console.log(this.myDisciplinado);    
   
    try{
      this.profileService.updateLutadores(
        this.userProfile.numeroLutas,
        this.lutaService.getTipoJogo(),
        this.lutaService.getEtapaCampenato(),
        this.lutaService.getEtapaEliminatoria(),
        this.lutaService.getRankingOponente(),
        this.lutaService.getClassOponente(),
        this.lutaService.getnome1(),
        this.lutaService.getclube1(),
        this.lutaService.getnome2(),
        this.lutaService.getclube2(),
        this.lutaService.getData(),
        this.lutaService.getHora(),
        this.lutaService.getAlturaRelativa(),
        this.lutaService.getPunho1(),
        this.lutaService.getPunho(),
        this.lutaService.getEmpunhadura(),
        this.lutaService.getTatica(),
        this.lutaService.getNivelTecnico(),
        this.lutaService.getConservadorOusado(),
        this.lutaService.getInconstanteConstante(),
        this.lutaService.getInseguroConfiante(),
        this.lutaService.getPressionadoControlado(),
        this.lutaService.getProvocativaRespeitosa(),
        this.lutaService.getPassivaAtiva(),
        this.myConfiante,
        this.myEstressado,
        this.myFocado,
        this.myMotivado,
        this.myControlado,
        this.myDisciplinado,
        this.lutaService.getEfeitoPratica(),
        )
        
        console.log(this.userProfile.numeroLutas);
        this.lutaService.setLutaAtual(this.userProfile.numeroLutas);
        this.router.navigate(['/relatorio'])
        
      }catch(error){
        console.dir(error)
      }
    }
}
