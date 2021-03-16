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
        texto1 = 'Sonolento: Sentimento de baixa energia, dificuldade de pensar.'
        texto2 = "Alerta: Muito atento, elétrico, pensamento rápido"
        break;
      case 'cansado_vigoroso':
        texto1 = "Cansado: Sensação de fadiga e falta de energia"
        texto2 = "Vigoroso: Sensação bem-estar, energizado"
        break;
      case 'inseguro_confiante':
        texto1 = "Inseguro: Medo, incerteza do futuro"
        texto2 = "Confiante: Perspectiva futura positiva "
        break;
      case 'preocupado_tranquilo':
        texto1 = "Preocupado: Sensação de sufocamento, pressão"
        texto2 = "Tranquilo: Sensação de “dever cumprido"
        break;
      case 'frustrado_feliz':
        texto1 = "Frustrado: Sentimento de desamparo"
        texto2 = "Feliz: Sensação de euforia"
        break;
      case 'desmotivado_motivado':
        texto1 = "Desmotivado: A ponto de desistir; frustrado."
        texto2 = "Motivado: Sensação de querer mais; sucesso"
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
    this.router.navigate(['/comportamento-oponente'])
  }

}


