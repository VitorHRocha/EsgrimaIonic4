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

  conservador_ousado : number;
  inconstante_constante : number;
  inseguro_confiante : number;
  pressionado_controlado : number;
  provocativa_respeitosa : number;
  passiva_ativa  : number;

  constructor(private router     : Router,
              private lutaService: LutaService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.conservador_ousado = 1;
    this.inconstante_constante = 1;
    this.inseguro_confiante = 1;
    this.pressionado_controlado = 1;
    this.provocativa_respeitosa = 1;
    this.passiva_ativa  = 1;
  }
  
  segmentconservador_ousado(event:any){
    this.conservador_ousado = event.detail.value; 

  }
  segmentinconstante_constante(event:any){
    this.inconstante_constante = event.detail.value; 

  }
  segmentinseguro_confiante(event:any){
    this.inseguro_confiante = event.detail.value; 

  }
  segmentpressionado_controlado(event:any){
    this.pressionado_controlado = event.detail.value; 

  }
  segmentprovocativa_respeitosa(event:any){
    this.provocativa_respeitosa = event.detail.value; 

  }
  segmentpassiva_ativa(event:any){
    this.passiva_ativa = event.detail.value; 

  }

  concluir(){

      console.log(this.conservador_ousado);
      console.log(this.inconstante_constante);
      console.log(this.inseguro_confiante);
      console.log(this.pressionado_controlado);
      console.log(this.provocativa_respeitosa);
      console.log(this.passiva_ativa);
      

    this.lutaService.guardaComportamentoOponente(
      this.conservador_ousado,
      this.inconstante_constante,
      this.inseguro_confiante,
      this.pressionado_controlado,
      this.provocativa_respeitosa, 
      this.passiva_ativa);
    this.router.navigate(['/condicao-pos-luta']);
    // this.router.navigate(['/auto-avaliacao']);
  }

  async help(ajuda:string){
    var texto1:string;
    var texto2:string;
    console.log(ajuda);
    switch(ajuda){
      case 'conservador_ousado':
        texto1 = 'Conservador: Agiu sob condições de segurança; não se arriscou.'
        texto2 = "Ousado:Tomou iniciativa; se expos ao risco buscando o sucesso"
        break;
      case 'inconstante_constante':
        texto1 = "Inconstante: Cometeu muitos erros"
        texto2 = "Constante: Cometeu poucos erros"
        break;
      case 'confiante':
        texto1 = "Inseguro: Expressão intranquila; agitado; vacila; precipitado"
        texto2 = "Confiante: Expressão segura; calmo; decidido"
        break;
      case 'pressionado_controlado':
        texto1 = "Pressionado: Ficou intimidado; perdeu o controle"
        texto2 = "Controlado: Se manteve sob controle "
        break;
      case 'provocativa_respeitosa':
        texto1 = "Provocativa: Atuou de forma não cortez às vezes desreipeitando até as regras"
        texto2 = "Respeitosa: Fair-play"
        break;
      case 'passiva_ativa':
        texto1 = "Passivo: Não tomou iniciativa e jogou basicamente no contra-ataque"
        texto2 = "Ativo: Teve iniciativa no combate"
        break;
      default:
        break;
    }
    console.log(texto1);
    const alert = await this.alertController.create({
      // header: ,
      // subHeader: ,
      message: '<ul><li>'+texto1+'</li></ul>'+'<ul><li>'+texto2+'</li></ul>',
        
      buttons: ['OK']
      });
    
      await alert.present();
  }
    

}
