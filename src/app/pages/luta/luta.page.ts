import { Component, OnInit } from '@angular/core';
import { LutaService } from 'src/app/services/user/luta.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-luta',
  templateUrl: './luta.page.html',
  styleUrls: ['./luta.page.scss'],
})
export class LutaPage implements OnInit {
  movimento: number=0;
  h:number;
  efetividadeAtual:boolean;
  areaAtual: number;
  arenaAtual:number;
  ataqueAtual:number;

  efetividade: Array<boolean>= [];
  area:Array<number>= [];
  arena: Array<number>= [];
  ataque: Array<number>= [];
  
  
  constructor( public lutaService : LutaService,
    public router:Router) {
    this.movimento=0;
  }
  
  ngOnInit() {
  }
  
  Area(local){
    this.areaAtual=local;
    var i;
    var k="area";
    for(i=1;i<=12;i++){
      
      if(i==local){
        if(local<6){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'blue');
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'red');
        }
      }else{
        document.getElementById(k.concat(i)).style.setProperty('--background', 'green');
      }
    }
    
  }
  Ataque(ataqueAtual){
    this.ataqueAtual=ataqueAtual;
    var i;
    var k="ataque";
    for(i=1;i<=4;i++){
      if(i==ataqueAtual){
        if(ataqueAtual<6){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'black');
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'red'); 
        }
      }else{
        document.getElementById(k.concat(i)).style.setProperty('--background', 'green');
      }
    }
    
  }
  Efetividade(efetividadeAtual){
    this.efetividadeAtual=efetividadeAtual;
     var k="ef";
        if(efetividadeAtual==true){
          document.getElementById("ef1").style.setProperty('--background', 'blue');
        }else{
          document.getElementById("ef0").style.setProperty('--background', 'blue');
        }
      
    }
  
  Arena(arenaAtual){
    this.arenaAtual=arenaAtual;
    var i;
    var k="zona";
    for(i=1;i<=5;i++){
      
      
        if(this.arenaAtual==i){
          
          document.getElementById(k.concat(i)).style.setProperty('--background', 'green');
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'blue');
        }
      
    }
    
    
    
    
  }
  
  
  
  
  
  proximo(){
    if(this.areaAtual == 0 || this.arenaAtual == 0 || this.ataqueAtual == 0 || this.efetividadeAtual == null ){

    }
    else{
    
      
    this.arena[this.movimento]=this.arenaAtual;
    this.area[this.movimento]=this.areaAtual;
    this.ataque[this.movimento]=this.ataqueAtual;
    this.efetividade[this.movimento]=this.efetividadeAtual;
    
    for(this.h=0;this.h<this.movimento;this.h++){
    console.log(this.area[this.h]);
    console.log(this.arena[this.h]);
   
    console.log(this.ataque[this.h]);
    console.log(this.efetividade[this.h]); 
    
    }  this.movimento++;
    
    
  }
}
  Concluir(){ 
    this.lutaService.updateLutas(this.ataque, this.area, this.arena,this.efetividade)
    this.router.navigate(['/registro-op']);
  }
  voltar(){
    this.router.navigate(['/user']);
  }
  
  
  
  
}
