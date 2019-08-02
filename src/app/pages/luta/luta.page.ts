import { Component, OnInit } from '@angular/core';
import { LutaService } from 'src/app/services/user/luta.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-luta',
  templateUrl: './luta.page.html',
  styleUrls: ['./luta.page.scss'],
})
export class LutaPage implements OnInit {
  movimento: number=0;
  h:number;
  faltaCompletar: string = '';
  efetividadeAtual:boolean;
  localCorpoAtual: number;
  pistaAtual:number;
  ataqueAtual:number;

  efetividade: Array<boolean>= [];
  localCorpo:Array<number>= [];
  pista: Array<number>= [];
  ataque: Array<number>= [];
  
  
  constructor( public lutaService : LutaService,
    public router:Router,
    public alertCtrl:AlertController) {
    this.movimento=0;
  }
  
  ngOnInit() {

    this.zeraCores();

  }
  
  marcalocalCorpo(local){
    this.localCorpoAtual=local;
    var i;
    var k="localCorpo";
    for(i=1;i<=12;i++){
      
      if(i==local){
        if(local<6){
          document.getElementById(k.concat(i)).style.setProperty('--background', 'blue');
        }else{
          document.getElementById(k.concat(i)).style.setProperty('--background', 'red');
        }
      }else{
        document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.8)');
      }
    }
    
  }
  marcaAtaque(ataqueAtual){
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
        document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
      }
    }
    
  }
  marcaEfetividade(efetividadeAtual){
    this.efetividadeAtual=efetividadeAtual;
    var k="ef";
      if(efetividadeAtual==true){
        document.getElementById("ef1").style.setProperty('--background', 'blue');
        document.getElementById("ef0").style.setProperty('--background', 'rgb(84, 155, 227)');
        
      }else{
        document.getElementById("ef0").style.setProperty('--background', 'blue');
        document.getElementById("ef1").style.setProperty('--background', 'rgb(84, 155, 227)');
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
        }
      
    }
    
    
    
    
  }
  
  
  
  
  
  async proximo(){

    if(this.localCorpoAtual == null || this.pistaAtual == null || this.ataqueAtual == null || this.efetividadeAtual == null ){
     // se um dos campos não tiveren sido completados,
     // monta a string com os itens que faltam
     // e mostra na tela em um alert
     
      this.faltaCompletar = 'Falta completar os campos:<br>'; 
      if(this.localCorpoAtual == null){
        this.faltaCompletar += 'Local do corpo alvejado;<br>'
      }if(this.pistaAtual == null){
        this.faltaCompletar += 'Local na pista onde foi o ponto;<br>'
      }if(this.ataqueAtual == null){
        this.faltaCompletar += 'Qual tipo de ataque;<br>'
      }if(this.efetividadeAtual == null){
        this.faltaCompletar += 'Se foi ponto ou não;<br>'
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
    this.efetividade[this.movimento]=this.efetividadeAtual;
    this.movimento++;
    
    //zera os pontos para começar novamente
    
    this.pistaAtual = null;
    this.localCorpoAtual = null;
    this.ataqueAtual = null;
    this.efetividadeAtual = null;
    this.zeraCores();
    }
  }
  
  Concluir(){ 
    this.lutaService.updateLutas(this.ataque, this.localCorpo, this.pista,this.efetividade)
    this.router.navigate(['/registro-op']);
  }

  voltar(){
    this.router.navigate(['/user']);
  }

  zeraCores(){
    //Volta a cor dos botões do corpo
    var i;
    var k="localCorpo";
    for(i=1;i<=12;i++){ 
      
      document.getElementById(k.concat(i)).style.setProperty('--background', ' rgba(255, 255, 255, 0.8)');
      
    }
    
    //Volta a cor dos botões de ataque
    k="ataque";
    for(i=1;i<=4;i++){
        document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
    }
   
    //Volta a cor dos botões da efetividade
      document.getElementById("ef1").style.setProperty('--background', 'rgb(84, 155, 227)');
      document.getElementById("ef0").style.setProperty('--background', 'rgb(84, 155, 227)');

    //Volta a cor dos botões da pista
    k="pista";
    for(i=1;i<=5;i++){
    
      document.getElementById(k.concat(i)).style.setProperty('--background', 'rgb(84, 155, 227)');
    
    }
  
  }

  
  
}
