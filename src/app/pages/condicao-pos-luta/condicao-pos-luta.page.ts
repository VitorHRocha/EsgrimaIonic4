import { Component, OnInit } from '@angular/core';
import { LutaService, efeitoPratica} from 'src/app/services/user/luta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condicao-pos-luta',
  templateUrl: './condicao-pos-luta.page.html',
  styleUrls: ['./condicao-pos-luta.page.scss'],
})
export class CondicaoPosLutaPage implements OnInit {

  public efeitoPratica = new efeitoPratica;

  constructor(
    private lutaService: LutaService,
    private router: Router
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

}


