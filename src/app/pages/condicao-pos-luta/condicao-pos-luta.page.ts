import { Component, OnInit } from '@angular/core';
import { LutaService, efeitoPratica} from 'src/app/services/user/luta.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-condicao-pos-luta',
  templateUrl: './condicao-pos-luta.page.html',
  styleUrls: ['./condicao-pos-luta.page.scss'],
})
export class CondicaoPosLutaPage implements OnInit {

  public efeitoPratica = new efeitoPratica;

  constructor(
    private lutaService: LutaService,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.efeitoPratica.sonolento_alerta = 1;
    this.efeitoPratica.cansado_vigoroso = 1;
    this.efeitoPratica.inseguro_confiante = 1;
    this.efeitoPratica.preocupado_tranquilo = 1;
    this.efeitoPratica.triste_feliz = 1;
    this.efeitoPratica.desmotivado_motivado = 1;
  }
  segmentsonolento_alerta(event: any) {
    this.efeitoPratica.sonolento_alerta = event.detail.value;

  }
  segmentcansado_vigoroso(event: any) {
    this.efeitoPratica.cansado_vigoroso = event.detail.value;

  }
  segmentinseguro_confiante(event: any) {
    this.efeitoPratica.inseguro_confiante = event.detail.value;

  }
  segmentPreocupado_tranquilo(event: any) {
    this.efeitoPratica.preocupado_tranquilo = event.detail.value;

  }
  segmenttriste_feliz(event: any) {
    this.efeitoPratica.triste_feliz = event.detail.value;

  }
  segmentdesmotivado_motivado(event: any) {
    this.efeitoPratica.desmotivado_motivado = event.detail.value;
  }

  concluir() {
    this.lutaService.setEfeitoPratica(this.efeitoPratica);
    this.router.navigate(['/auto-avaliacao']);
  }

  async help(ajuda:string){
    var texto1:string;
    var texto2:string;
    console.log(ajuda);
    switch(ajuda){
      case 'sonolento_alerta':
        texto1 = 'Conservador: Agiu sob condições de segurança; não se arriscou.'
        texto2 = "Ousado:Tomou iniciativa; se expos ao risco buscando o sucesso"
        break;
      case 'cansado_vigoroso':
        texto1 = "Inconstante: Cometeu muitos erros"
        texto2 = "Constante: Cometeu poucos erros"
        break;
      case 'inseguro_confiante':
        texto1 = "Inseguro: Expressão intranquila; agitado; vacila; precipitado"
        texto2 = "Confiante: Expressão segura; calmo; decidido"
        break;
      case 'preocupado_tranquilo':
        texto1 = "Pressionado: Ficou intimidado; perdeu o controle"
        texto2 = "Controlado: Se manteve sob controle "
        break;
      case 'triste_feliz':
        texto1 = "Provocativa: Atuou de forma não cortez às vezes desreipeitando até as regras"
        texto2 = "Respeitosa: Fair-play"
        break;
      case 'desmotivado_motivado':
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


