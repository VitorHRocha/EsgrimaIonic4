import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  public userProfile: any;
  lutas: any;
  luta:any;
  movimentos:any=["ataques" ,"local","arena","ef"];
  
  
  
  voltar(){
    this.router.navigate(['/user'])
  }
  constructor(
    private profileService: ProfileService,
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
    console.log("ola");
   this.luta=this.lutas[0];
   var Ataques= this.luta.Ataques;
   var LocalCorpo= this.luta.LocalCorpo;
   var Arena= this.luta.Area;
   var Efetividade= this.luta.Efetividade;
   var i;
   var ataques=1;
  var  local=1;
  var arena=1;
  var ef=1;

   console.log(Ataques[0]);
   console.log(LocalCorpo[0]);
   console.log(Arena[0]);
   console.log(Efetividade[0]);
   for(i=0;i<Ataques.length;i++){
    this.movimentos[i]={ataques: Ataques[i] ,local:LocalCorpo[i],arena:Arena[i],ef:Efetividade[i]};
   }
   

  }






}
