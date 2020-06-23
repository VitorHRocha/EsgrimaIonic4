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

  public confiante: number;
  public disciplinado: number;
  public controlado: number;
  public motivado: number;
  public focado: number;
  public estressado: number;


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
    
    this.confiante = 1;
    this.estressado = 1;
    this.focado = 1;
    this.motivado = 1;
    this.controlado = 1;
    this.disciplinado = 1;
  }

  rangeConfiante(event: any){
    this.confiante = event.detail.value;

  }

  rangeEstressado(event: any){
    this.estressado = event.detail.value;
    
  }
  rangeFocado(event: any){
    this.focado = event.detail.value;
    
  }

  rangeMotivado(event: any){
    this.motivado = event.detail.value;
    
  }
  rangeControlado(event: any){
    this.controlado = event.detail.value;
    
  }
  rangeDisciplinado(event: any){
    this.disciplinado = event.detail.value;
    
  }

  async cadastro(): Promise<void> {

    console.log(this.confiante);
    console.log(this.estressado);
    console.log(this.focado);
    console.log(this.motivado);
    console.log(this.controlado);
    console.log(this.disciplinado);    
   
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
        this.lutaService.getConservadora(),
        this.lutaService.getInconstante(),
        this.lutaService.getInseguro(),
        this.lutaService.getPressionado(),
        this.lutaService.getProvocativa(),
        this.lutaService.getPassiva(),
        this.confiante,
        this.estressado,
        this.focado,
        this.motivado,
        this.controlado,
        this.disciplinado
        )
        
        console.log(this.userProfile.numeroLutas);
        this.lutaService.setLutaAtual(this.userProfile.numeroLutas);
        this.router.navigate(['/relatorio'])
        
      }catch(error){
        console.dir(error)
      }
    }
}
