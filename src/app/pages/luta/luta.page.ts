import { Component, OnInit } from '@angular/core';
import { LutaService } from 'src/app/services/user/luta.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { and } from '@angular/router/src/utils/collection';
import { IfStmt } from '@angular/compiler';


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
  localCorpoLut1:number;
  localCorpoLut2:number;
  
  localCorpo:Array<number>= [];
  pista: Array<number>= [];
  ataque: Array<number>= [];
  public lutador1;
  public lutador2;
  
  //Variaveis que alterão a logica de funcionamento da pagina
  public lados_invertidos: boolean;
  public toqueduplo: number=0;
  public remessa: boolean = false;

  public movimento_mostrado: number = 1; 
  
  
  // faltas: Array<number>= [];
  // faltaAtual
  
  constructor( public lutaService : LutaService,
    public router:Router,
    public alertCtrl:AlertController) {
      this.movimento=0;
    }
    
    ngOnInit() {
      this.zeraCores();
      this.toqueduplo=0;
      this.lutador1=this.lutaService.getnome1();
      this.lutador2=this.lutaService.getnome2();
    }
    
    // marcaFalta(ladoFalta){
    //   this.zeraCores();
    //   this.pistaAtual = null;
    //   this.localCorpoLut1 = null;
    //   this.localCorpoLut2 = null;
    //   this.ataqueAtual = null;
    //   this.localCorpoAtual = null;
    //   this.toqueduplo = 0;
    
    // }
    
    
    marcalocalCorpo(local){     
      var i;
      var k="localCorpo";
      
      if(this.toqueduplo == 0){
        for(i=1;i<=20;i++){
          
          if(i==local){
            if(local<=10){
              if (this.lados_invertidos) {
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(34, 199, 64, 0.5)');
              }else{
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0.5)');
              }
            }else{
              if (this.lados_invertidos) {
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0.5)');
              }else{
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(34, 199, 64, 0.5)');
              }
            }
          }else{
            document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)');
          }
        }
      }else{
        
        if(local<=10){
          for(i=1;i<=10;i++){
            if(i==local){
              if (this.lados_invertidos) {
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(34, 199, 64, 0.5)');               
              }else{
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0.5)');
              }
            }
            else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)'); 
            }
          }
          this.localCorpoLut1=local;
          if(this.localCorpoLut2 == null){
            this.localCorpoLut2=this.localCorpoAtual;
          }
          
        }else{
          console.log(this.lados_invertidos);
          for(i=11;i<=20;i++){
            if(i==local){
              if (this.lados_invertidos) {          
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(227, 20, 55, 0.5)'); 
              }else{     
                document.getElementById(k.concat(i)).style.setProperty('--background', 'rgba(34, 199, 64, 0.5)'); 
              }
            }
            else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)'); 
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
    
    marcaAtaque(ataqueAtual:number){
      this.ataqueAtual=ataqueAtual;
      var i;
      var k="ataque";
      
      console.log(this.ataqueAtual);
      if(ataqueAtual==7){
        if(this.toqueduplo==1){
          var k="localCorpo";
          for(i=1;i<=20;i++){ 
            document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)');     
          }        
        }
      }
      if(this.ataqueAtual==6){
        
        if(!this.remessa){
          this.remessa = true;  
          console.log(this.remessa);
        }else{
          this.remessa = false;
          this.ataqueAtual = null;
          console.log(this.remessa);
          
        }
      }
      var k="ataque";
      for(i=1;i<=7;i++){
        if(i==ataqueAtual){
          if(ataqueAtual==7){
            if(this.toqueduplo==0){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)');
              document.getElementById(k.concat(i)).style.setProperty('color', 'white');
              this.toqueduplo=1
            }else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)');
              this.toqueduplo=0  
            }
          }else if(ataqueAtual==6){
            console.log(k.concat(i));
            if(this.remessa == true ){ 
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-quartiary)');
              document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-quartiary)');
              document.getElementById(k.concat(i)).style.setProperty('color', 'black');
            }else{
              document.getElementById(k.concat(i)).style.setProperty('color', 'var(--ion-color-quartiary)');
              document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-quartiary)');
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');
              
            }
          }else{
            if(this.remessa == true ){
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)');
              document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-quartiary)');
              document.getElementById(k.concat(i)).style.setProperty('color', 'white'); 
              this.ataqueAtual=10+ataqueAtual;
              console.log(this.ataqueAtual);

            }else{
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-primary)');
              document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-primary)');
              document.getElementById(k.concat(i)).style.setProperty('color', 'white');

            }
          }
          
        }else{
          if(this.remessa == true ){ 
            if(i<6){ 
              document.getElementById(k.concat(i)).style.setProperty('color', 'var(--ion-color-primary)');
              document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-quartiary)');
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');

              
            }else if(i==7){
              document.getElementById(k.concat(i)).style.setProperty('color', 'var(--ion-color-primary)');
              document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');
            }
            
          }else{
            document.getElementById(k.concat(i)).style.setProperty('color', 'var(--ion-color-primary)');
            document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-primary)');
            document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');
          }
        }
      }
      
    }
    
    marcaPista(pistaAtual){
      
      if (this.lados_invertidos) {
        this.pistaAtual = 6 - pistaAtual;
      }else{
        this.pistaAtual = pistaAtual;
      }
      
      var i;
      var k="pista";
      for(i=1;i<=5;i++){
        if(this.pistaAtual==i){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'green');        
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');
          if(i == 1 || i == 5){
            document.getElementById(k.concat(i)).style.setProperty('--background', 'red');
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
          if(this.localCorpoAtual<=10){
            this.pontoLutador2 += 1;
          }else{
            this.pontoLutador1 += 1;
          }
          
          
          this.pistaAtual = null;
          this.localCorpoAtual = null;
          this.ataqueAtual = null;
          
          this.zeraCores();
          this.movimento_mostrado += 1;
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
          
          this.pista[this.movimento]=this.pistaAtual;
          this.localCorpo[this.movimento]=this.localCorpoLut2;
          this.ataque[this.movimento]=5;
          this.movimento++;
          
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
          this.movimento_mostrado += 1;
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
        cssClass: 'concluir-popup',
        header: 'Deseja concluir o jogo?',
        buttons: [
          { 
            text: 'Concluir',
            role: 'cancel',
            handler: () => {
              this.lutaService.updateLutas(this.ataque, this.localCorpo, this.pista)
              this.router.navigate(['/caracteristicas-oponente']);
            }
          }, {
            text: 'Continuar jogo',
            handler: () => {  }
          }
        ]
      });await alert.present();
    }
    
    
    inverte_lado_luta(){
      var nome_auxiliar;
      
      nome_auxiliar = this.lutador1;
      this.lutador1 = this.lutador2;
      this.lutador2 = nome_auxiliar;
      
      this.zeraCores();
      if (this.lados_invertidos) {
        this.lados_invertidos = false;
      }else{
        this.lados_invertidos = true;
      }
      
    }
    
    
    zeraCores(){
      // Volta a cor dos botões do corpo
      var i;
      var k="localCorpo";
      for(i=1;i<=20;i++){ 
        
        document.getElementById(k.concat(i)).style.setProperty('--background', ' var(--ion-color-primary)');
        
      }
      
      //Volta a cor dos botões de ataque
      k="ataque";
      for(i=1;i<=7;i++){
        document.getElementById(k.concat(i)).style.setProperty('color', 'var(--ion-color-primary)');
        document.getElementById(k.concat(i)).style.setProperty('--border-color', 'var(--ion-color-primary)');
        document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');
      }
      
      //Volta a cor dos botões da pista
      k="pista";
      for(i=1;i<=5;i++){
        document.getElementById(k.concat(i)).style.setProperty('--background', 'var(--ion-color-tertiary)');
        if(i == 1 || i == 5){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'red');
        }
        
      }
      
      this.remessa = false;
    }
    
    corrigeUltimoMovimento(){
      this.movimento -= 1;
      if (this.ataque[this.movimento] == 7) {
        this.pista[this.movimento]=  null;
        this.ataque[this.movimento]= null;
        if(this.localCorpo[this.movimento]<=10){
          this.pontoLutador2 += 1;
        }else{
          this.pontoLutador1 += 1;
        }
        this.localCorpo[this.movimento]= null;
        this.movimento -= 1;
        
      }
      this.pista[this.movimento]=  null;
      this.ataque[this.movimento]= null;
      if(this.localCorpo[this.movimento]<=10){
        this.pontoLutador2 += 1;
      }else{
        this.pontoLutador1 += 1;
      }
      this.localCorpo[this.movimento]= null;    

      this.movimento_mostrado -= 1;
    }
    
    
  }
