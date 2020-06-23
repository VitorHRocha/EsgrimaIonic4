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
    
    // marcaAlt(altAtual){
    //   this.altura=altAtual;
    //   var i;
    //   var k="alt";
    //   for(i=1;i<=3;i++){ 
    //     if(i == altAtual){
    //       document.getElementById(k.concat(i)).style.setProperty('--background', 'black');
    //     }else{
    //       document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
    //     }
    //   }        
    //   this.liberaCadastro();
    // }
    
  //   marcaPunhoOponente(punho){
  //     this.punho=punho;
  //     var i;
  //     var k="punhLut2";
  //     for(i=1;i<=2;i++){ 
  //       if(i == punho){
  //         document.getElementById(k.concat(i)).style.setProperty('--background', 'black');
  //       }else{
  //         document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
  //       }
  //     }        
  //     this.liberaCadastro();
  //   }

  //   marcaAgressividade(agressividade){
  //     this.agressividade = agressividade;
  //     var i;
  //  var k="agressividade";
  //     for(i=1;i<=2;i++){ 
  //       if(i == agressividade){
  //         document.getElementById(k.concat(i)).style.setProperty('--background', 'black');
  //       }else{
  //         document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
  //       }
  //     }        
  //     this.liberaCadastro();
  //   }

    
    
    segmentAltura(altura: any){
      this.altura = altura.detail.value;
    }
    segmentPunho(punho: any){
      this.punho = punho.detail.value;
    }
    segmentEmpunhadura(empunhadura: any){
      this.empunhadura = empunhadura.detail.value;
    }
    segmentTaticaPredominante(tatica: any){
      this.tatica = tatica.detail.value;
    }
    segmentNivelTecnico(nivelTecnico: any){
      this.nivelTecnico = nivelTecnico.detail.value;
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

      // if(this.punho == '1'){
      //   punho= 'Destro';

      // }else{
      //   punho= 'Canhoto';
      // }

      // if(this.altura == '1'){
      //   altura_relativa = 'Maior';

      // }
      // else{
      //   if(this.altura == '2'){
      //   altura_relativa = 'Parecida';
      //   }else{
      //   altura_relativa = 'Menor';
      //   }
      // }

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
