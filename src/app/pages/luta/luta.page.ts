import { Component, OnInit } from '@angular/core';
import { LutaService } from 'src/app/services/user/luta.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { and } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-luta',
  templateUrl: './luta.page.html',
  styleUrls: ['./luta.page.scss'],
})
export class LutaPage implements OnInit {
  movimento: number=0;
  h:number;
  pontoLutador1: number=0;
  pontoLutador2: number=0;
  
  
  faltaCompletar: string = '';
  localCorpoAtual: number;
  pistaAtual:number;
  ataqueAtual:number;
  toqueduplo: number=0;
  localCorpoLut1:number;
  localCorpoLut2:number;
  
  localCorpo:Array<number>= [];
  pista: Array<number>= [];
  ataque: Array<number>= [];
  public lutador1;
  public lutador2;
  
  
  constructor( public lutaService : LutaService,
    public router:Router,
    public alertCtrl:AlertController) {
      this.movimento=0;
    }
    
    ngOnInit() {
      
      // document.getElementById("lutadores").setAttribute("src",`./assets/img/concatesgrim.png`);
      
      this.zeraCores();
      this.toqueduplo=0;
      this.lutador1=this.lutaService.getnome1();
      this.lutador2=this.lutaService.getnome2();
    }
    
    marcalocalCorpo(local){
      
      var i;
      var k="localCorpo";
      
      if(this.toqueduplo == 0){
        for(i=1;i<=12;i++){
          
          if(i==local){
            if(local<=6){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(34, 199, 64, 0.5)');
            }else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0.5)');
            }
          }else{
            document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.1)');
          }
        }
      }else{
        if(local<=6){
          for(i=1;i<=6;i++){
            if(i==local){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(34, 199, 64, 0.5)');
            }
            else{
              document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.5)');
            }
          }
          this.localCorpoLut1=local;
          if(this.localCorpoLut2 == null){
            this.localCorpoLut2=this.localCorpoAtual;
          }
          
        }else{
          for(i=7;i<=12;i++){
            if(i==local){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0.5)');
            }
            else{
              document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.1)');
            }
          }
          this.localCorpoLut2=local;
          if(this.localCorpoLut1 == null){
            this.localCorpoLut1=this.localCorpoAtual;
          }
        }
        
      }
      this.localCorpoAtual=local;
      
    }
    
    marcaAtaque(ataqueAtual){
      this.ataqueAtual=ataqueAtual;
      var i;
      var k="ataque";
      if(ataqueAtual<5){
        if(this.toqueduplo==1){
          var k="localCorpo";
          for(i=1;i<=12;i++){ 
            
            document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.9)');
            
          }        
        }
      }
      var k="ataque";
      for(i=1;i<=5;i++){
        if(i==ataqueAtual){
          if(ataqueAtual==5){
            if(this.toqueduplo==0){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'black');
              this.toqueduplo=1
            }else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
              this.toqueduplo=0  
            }
          }else{
            
            if(ataqueAtual<6){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'black');
              this.toqueduplo=0  
            }else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0,7)'); 
            }
          }
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
        }
      }
      
    }
    
    marcaPista(pistaAtual){
      this.pistaAtual=pistaAtual;
      var i;
      var k="pista";
      for(i=1;i<=5;i++){
        if(this.pistaAtual==i){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'green');
          
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
          if(i == 1 || i == 5){
            document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0,7)');
          }
        }
        
      }
    }
    
    
    async proximo(){
      if(this.toqueduplo == 0){
        if(this.localCorpoAtual == null || this.pistaAtual == null || this.ataqueAtual == null  ){
          
          /// se um dos campos não tiveren sido completados,
          // monta a string com os itens que faltam
          // e mostra na tela em um alert
          
          this.faltaCompletar = 'Falta completar os campos:<br>'; 
          if(this.localCorpoAtual == null){
            this.faltaCompletar += 'Local do corpo alvejado;<br>'
          }if(this.pistaAtual == null){
            this.faltaCompletar += 'Local na pista onde foi o ponto;<br>'
          }if(this.ataqueAtual == null){
            this.faltaCompletar += 'Qual tipo de ataque;<br>'
          }
          
          const alert = await this.alertCtrl.create({
            message: this.faltaCompletar,
            buttons: [{ text: 'Ok'}],
          });
          await alert.present();
          
        }
        
        else{
          this.faltaCompletar = '';
          // Preenche os campos e adiciona um movimento ao contador    
          this.pista[this.movimento]=this.pistaAtual;
          this.localCorpo[this.movimento]=this.localCorpoAtual;
          this.ataque[this.movimento]=this.ataqueAtual;
          this.movimento++;
          
          console.log(this.localCorpoAtual)
          if(this.localCorpoAtual<=6){
            this.pontoLutador2 += 1;
          }else{
            this.pontoLutador1 += 1;
          }
          
          
          this.pistaAtual = null;
          this.localCorpoAtual = null;
          this.ataqueAtual = null;
          
          this.zeraCores();
        }
      }else{
        if(this.localCorpoLut1 == null ||this.localCorpoLut2 == null || this.pistaAtual == null || this.ataqueAtual == null ){
          
          /// se um dos campos não tiveren sido completados,
          // monta a string com os itens que faltam
          // e mostra na tela em um alert
          
          this.faltaCompletar = 'Falta completar os campos:<br>'; 
          if(this.localCorpoLut1 == null){
            this.faltaCompletar += 'Local do corpo alvejado no lutador 1;<br>'
          }if(this.localCorpoLut2 == null){
            this.faltaCompletar += 'Local do corpo alvejado no lutador 2;<br>'
          }if(this.pistaAtual == null){
            this.faltaCompletar += 'Local na pista onde foi o ponto;<br>'
          }if(this.ataqueAtual == null){
            this.faltaCompletar += 'Qual tipo de ataque;<br>'
          }
          
          const alert = await this.alertCtrl.create({
            message: this.faltaCompletar,
            buttons: [{ text: 'Ok'}],
          });
          await alert.present();
          
        }else{
          this.faltaCompletar = '';
          // Preenche os campos e adiciona um movimento ao contador    
          var i;
          this.pista[this.movimento]=this.pistaAtual;
          this.localCorpo[this.movimento]=this.localCorpoLut1;
          this.ataque[this.movimento]=5;;
          this.movimento++;
          console.log(this.pistaAtual)
          console.log(this.localCorpoLut1)
          
          this.pista[this.movimento]=this.pistaAtual;
          this.localCorpo[this.movimento]=this.localCorpoLut2;
          this.ataque[this.movimento]=5;
          this.movimento++;
          console.log(this.localCorpoLut2)
          
          this.pontoLutador1 += 1;
          this.pontoLutador2 += 1;
          
          //zera os pontos para começar novamente
          
          this.pistaAtual = null;
          this.localCorpoLut1 = null;
          this.localCorpoLut2 = null;
          this.ataqueAtual = null;
          this.localCorpoAtual = null;
          this.toqueduplo = 0;
          
          this.zeraCores();
        }
      }
      
    } 
    
    
    
    
    Concluir(){ 
      
      this.AlertConcluir();
      
    }
    
    voltar(){
      this.AlertVoltar();
    }
    
    async AlertVoltar() {
      const alert = await this.alertCtrl.create({
        header: 'Voltar?',
        message: ' <strong>Tem certeza que deseja abandonar o jogo?<br> Os dados registrados serão perdidos</strong>!!!',
        buttons: [
          {
            text: 'Continuar Jogo',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Abandonar o jogo',
            handler: () => {
              this.router.navigate(['/user']);
            }
          }
        ]
      });await alert.present();
    }
    
    async AlertConcluir() {
      const alert = await this.alertCtrl.create({
        header: 'Concluir jogo?',
        buttons: [
          {
            text: 'Concluir',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.lutaService.updateLutas(this.ataque, this.localCorpo, this.pista)
              this.router.navigate(['/registro-op']);
            }
          }, {
            text: 'Continuar jogo',
            handler: () => {
              
             
            }
          }
        ]
      });await alert.present();
    }
    
    
    
    
    
    zeraCores(){
      //Volta a cor dos botões do corpo
      var i;
      var k="localCorpo";
      for(i=1;i<=12;i++){ 
        
        document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.1)');
        
      }
      
      //Volta a cor dos botões de ataque
      k="ataque";
      for(i=1;i<=5;i++){
        document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
      }
      
      
      //Volta a cor dos botões da pista
      k="pista";
      for(i=1;i<=5;i++){
        
        document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
        if(i == 1 || i == 5){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'red');
        }
        
      }
      
    }
    
    
    
  }
