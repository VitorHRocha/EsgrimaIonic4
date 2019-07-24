import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LutaService } from 'src/app/services/user/luta.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  public userProfile: any;
  public lutaAtual;
  public lutas: any; 
  public luta:any;
  public movimentos:any=["ataques" ,"local","arena","ef"];
  public lutaDetalhes: any;
  public lutastatistic: any;
  public lutaTab: any;
  
  
  
  voltar(){
    this.router.navigate(['/user'])
  }
  constructor(
    private profileService: ProfileService,
    private lutaService: LutaService,
   public router: Router) { }

  ngOnInit() {
    
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      if(userProfileSnapshot.data().lutas){
      this.lutas = userProfileSnapshot.data().lutas;
      this.escolheLuta();

    }
    });
  }
  public escolheLuta(){
  this.lutaAtual=this.lutaService.getLutaAtual();
   this.luta=this.lutas[this.lutaAtual];
   var Ataques= this.luta.Ataques;
   var LocalCorpo= this.luta.LocalCorpo;
   var Arena= this.luta.Area;
   var Efetividade= this.luta.Efetividade;
   var i;
  this.lutaDetalhes=this.lutaService.formaLuta(
    Ataques,LocalCorpo,Arena,Efetividade)

  
    this.lutaTab=this.lutaService.formaLutaEstatistic(
      Ataques,LocalCorpo,Arena,Efetividade);
      console.log('AQ');

  for(i=0;i<6;i++){

    console.log(this.lutaTab.quantidadeAcertos[i]);
 
  }
}
}
