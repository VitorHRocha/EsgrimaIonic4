import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LutaService } from 'src/app/services/user/luta.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-comportamento-oponente',
  templateUrl: './comportamento-oponente.page.html',
  styleUrls: ['./comportamento-oponente.page.scss'],
})
export class ComportamentoOponentePage implements OnInit {

  conservadora : number;
  inconstante : number;
  inseguro : number;
  pressionado : number;
  provocativa : number;
  passiva  : number;

  constructor(private router     : Router,
              private lutaService: LutaService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.conservadora = 1;
    this.inconstante = 1;
    this.inseguro = 1;
    this.pressionado = 1;
    this.provocativa = 1;
    this.passiva  = 1;
  }
  
  segmentConservadora(event:any){
    this.conservadora = event.detail.value; 

  }
  segmentInconstante(event:any){
    this.inconstante = event.detail.value; 

  }
  segmentInseguro(event:any){
    this.inseguro = event.detail.value; 

  }
  segmentPressionado(event:any){
    this.pressionado = event.detail.value; 

  }
  segmentProvocativa(event:any){
    this.provocativa = event.detail.value; 

  }
  segmentPassiva(event:any){
    this.passiva = event.detail.value; 

  }

  concluir(){

      console.log(this.conservadora);
      console.log(this.inconstante);
      console.log(this.inseguro);
      console.log(this.pressionado);
      console.log(this.provocativa);
      console.log(this.passiva);
      

    this.lutaService.guardaComportamentoOponente(
      this.conservadora,
      this.inconstante,
      this.inseguro,
      this.pressionado,
      this.provocativa, 
      this.passiva)
    this.router.navigate(['/auto-avaliacao'])
  }

  async help(ajuda:string){
    var texto1:string;
    var texto2:string;
    
    switch(ajuda){
      case 'conservadora':
        texto1 = 'Conservador: Agiu sob condições de segurança; não se arriscou.'
        texto2 = "Ousado:Tomou iniciativa; se expos ao risco buscando o sucesso"
        break;
      case 'inconstante':
        texto1 = "Inconstante: Cometeu muitos erros"
        texto2 = "Constante: Cometeu poucos erros"
        break;
      case 'confiante':
        texto1 = "Confiante: Expressão segura; calmo; decidido"
        texto2 = "Inseguro: Expressão intranquila; agitado; vacila; precipitado"
        break;
      case 'pressionado':
        texto1 = "Pressionado: Ficou intimidado; perdeu o controle"
        texto2 = "Controlado: Se manteve sob controle "
        break;
      case 'provocativa':
        texto1 = "Provocativa: Atuou de forma não cortez às vezes desreipeitando até as regras"
        texto2 = "Controlado: Se manteve sob controle"
        break;
      case 'passiva':
        texto1 = "Passiva: Não tomou iniciativa e jogou basicamente no contra-ataque"
        texto2 = "Ativa: Teve iniciativa no combate"
        break;
      default:
        break;
    }
    const alert = await this.alertController.create({
      // header: ,
      // subHeader: ,
      message: texto1,
        
      buttons: ['OK']
      });
    
      await alert.present();
  }
    

}
