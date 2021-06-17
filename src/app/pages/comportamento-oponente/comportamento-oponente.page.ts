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
  intimidado_controlado : number;
  provocativa_respeitosa : number;
  passiva_proativo  : number;
  estressado_calmo  : number;
  disperso_alerta  : number;
  taticamenteDisciplinado_taticamenteIndisciplinado  : number;

  constructor(private router     : Router,
              private lutaService: LutaService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.conservador_ousado = 1;
    this.inconstante_constante = 1;
    this.inseguro_confiante = 1;
    this.intimidado_controlado = 1;
    this.provocativa_respeitosa = 1;
    this.passiva_proativo  = 1;
    this.estressado_calmo  = 1;
    this.disperso_alerta  = 1;
    this.taticamenteDisciplinado_taticamenteIndisciplinado  = 1;
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
  segmentintimidado_controlado(event:any){
    this.intimidado_controlado = event.detail.value; 

  }
  segmentprovocativa_respeitosa(event:any){
    this.provocativa_respeitosa = event.detail.value; 

  }
  segmentpassiva_proativa(event:any){
    this.estressado_calmo = event.detail.value; 

  }
  segmentestressado_calmo(event:any){
    this.estressado_calmo = event.detail.value; 

  }
  segmentdisperso_alerta(event:any){
    this.disperso_alerta = event.detail.value; 

  }
  segmenttaticamenteDisciplinado_taticamenteIndisciplinado(event:any){
    this.taticamenteDisciplinado_taticamenteIndisciplinado = event.detail.value; 

  }

  concluir(){

      console.log(this.conservador_ousado);
      console.log(this.inconstante_constante);
      console.log(this.inseguro_confiante);
      console.log(this.intimidado_controlado);
      console.log(this.provocativa_respeitosa);
      console.log(this.passiva_proativo);
      console.log(this.estressado_calmo);
      console.log(this.disperso_alerta);
      console.log(this.taticamenteDisciplinado_taticamenteIndisciplinado);
      

    this.lutaService.guardaComportamentoOponente(
      this.conservador_ousado,
      this.inconstante_constante,
      this.inseguro_confiante,
      this.intimidado_controlado,
      this.provocativa_respeitosa,
      this.passiva_proativo,
      this.estressado_calmo,
      this.disperso_alerta,
      this.taticamenteDisciplinado_taticamenteIndisciplinado,
      );
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
      case 'inseguro_confiante':
        texto1 = "Inseguro: Expressão intranquila; agitado; vacila; precipitado"
        texto2 = "Confiante: Expressão segura; calmo; decidido"
        break;
      case 'intimidado_controlado':
        texto1 = "Intimidado: Em estado de apreensão ou de temor. Constrangido, inibido."
        texto2 = "Controlado: Se manteve sob controle "
        break;
      case 'provocativa_respeitosa':
        texto1 = "Provocativa: Atuou de forma não cortez às vezes desreipeitando até as regras"
        texto2 = "Respeitosa: Fair-play"
        break;
      case 'passiva_proativo':
        texto1 = "Passivo: Não tomou iniciativa e jogou de maneira apática."
        texto2 = "Proativo: Teve iniciativa no combate."
        break;
      case 'estressado_calmo':
        texto1 = "Estressado: Apresentou comportamento inquieto, nervoso, e perturbado."
        texto2 = "Calmo: Manteve-se sob controle."
        break;
      case 'disperso_alerta':
        texto1 = "Disperso: Olhar disperso e distante. Lento para responder às ações."
        texto2 = "Alerta: Manteve-se atento às ações, respondendo normalmente rápido."
        break;
      case 'taticamenteDisciplinado_taticamenteIndisciplinado':
        texto1 = "Taticamente indisciplinado: Ação descoordenadas e aleatórias, sem um padrão."
        texto2 = "Taticamente disciplinado: Ação planejada e sistematizada"
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
    
  voltar(){
    this.router.navigate(['/caracteristicas-oponente'])
  }

}
