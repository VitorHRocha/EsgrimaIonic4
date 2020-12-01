import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';


@Component({
  selector: 'app-caracteristicas-oponente',
  templateUrl: './caracteristicas-oponente.page.html', 
  styleUrls: ['./caracteristicas-oponente.page.scss'], 
})
export class RegistroOpPage implements OnInit {
  public regiOpform: FormGroup;
  public loading: any;
  public currentUser: firebase.User;
  public current; 
  public userProfile: any;
  
  
  altura: string = "";
  agressividade  = "";
  punho: string = "";
  empunhadura: string = "";
  tatica: string = "";
  nivelTecnico: string = "";
  lutadores: any;
  numeroLutas: number;
  
  public valido;
  
  public nomeLut1;
  public nomeLut2;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService:ProfileService,
    private lutaService:LutaService) {
      this.nomeLut1 =  this.lutaService.getnome1();
      this.nomeLut2 =  this.lutaService.getnome2();      
    }
    
    ngOnInit() {
      this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
      this.altura ='menor';
      // this.agressividade  = "";
      this.punho =  "destro";
      this.empunhadura =  "anatomica";
      this.tatica =  "atacante";
      this.nivelTecnico =  "iniciante";
    }
    voltar(){
      this.router.navigate(['/luta'])
    }
    
    
    
    segmentAltura(altura: any){
      
      this.altura = altura ;
      
      var galleries = document.getElementsByClassName("altura");
      var len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      } 
      
      document.getElementById(altura).setAttribute(`color`,"primary");

    }

    segmentPunho(punho: any){
      this.punho = punho ;
      var galleries = document.getElementsByClassName("punho_dominante");
      var len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      } 
      
      document.getElementById(punho).setAttribute(`color`,"primary");
    }
    
    segmentEmpunhadura(empunhadura: any){
      this.empunhadura = empunhadura ;
      var galleries = document.getElementsByClassName("empunhadura");
      var len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      } 
      
      document.getElementById(empunhadura).setAttribute(`color`,"primary");
    }
    
    segmentTaticaPredominante(tatica: any){
      this.tatica = tatica ;
      var galleries = document.getElementsByClassName("tatica_predominante");
      var len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      } 
      
      document.getElementById("tatica_predominante_".concat(tatica)).setAttribute(`color`,"primary");
    }
    
    segmentNivelTecnico(nivelTecnico: any){
      this.nivelTecnico = nivelTecnico ;
      var galleries = document.getElementsByClassName("nivel_tecnico");
      var len =  galleries.length;
      for(var i=0 ; i<len; i++){
        galleries[i].setAttribute(`color`,"tertiary");
      } 
      
      document.getElementById("nivel_tecnico_".concat(nivelTecnico)).setAttribute(`color`,"primary");
    }
    
    liberaCadastro(){
      if(this.altura == '' || this.agressividade == '' || this.punho == '' ){
        this.valido = false;
      }else{
        this.valido = true;
      }
    }
    
    async cadastro(regiOpform: FormGroup): Promise<void> {
      var punho1;
      var altura_relativa;
      var punho;
      
      punho1 = 'Destro';
      
      console.log(altura_relativa);
      console.log(punho1);
      console.log(punho);
      console.log(this.empunhadura);
      console.log(this.tatica);;
      console.log(this.nivelTecnico);
      
      this.lutaService.guardaCaracteristicasOponente(
        this.altura,
        punho1,
        this.punho,
        this.empunhadura,
        this.tatica,
        this.nivelTecnico
        );
        this.lutaService.setLutaAtual(this.userProfile.numeroLutas);
        this.router.navigate(['/comportamento-oponente'])
      }
    }
