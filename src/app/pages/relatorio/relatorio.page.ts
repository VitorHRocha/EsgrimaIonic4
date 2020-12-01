import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LutaService, efeitoPratica } from 'src/app/services/user/luta.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {
  @ViewChild('radarChartPerfilAdversario') radarChartPerfilAdversario;
  radarPerfilAdversario: any;
  @ViewChild('radarChartAvaliarAdversario') radarChartAvaliarAdversario;
  radarAvaliarAdversario: any;
  @ViewChild('radarChartAutoAvaliar') radarChartAutoAvaliar;
  radarAutoAvaliar: any;
  @ViewChild('radarChartEfeitoPratica') radarChartEfeitoPratica;
  radarEfeitoPratica: any;
  @ViewChild('barChartPontuacaoGeral') barChartPontuacaoGeral;
  barPontuacaoGeral: any;

  public userProfile: any;
  public lutaAtual;
  public lutas: any;
  public luta: any;
  public movimentos: any = ["ataques", "local", "arena", "ef"];
  public lutaDetalhes: any;
  public lutastatistic: any;
  public lutaEstatistica: any;
  public lutadores: any;
  public lutadoresAtuais: any;
  public meuNome: string;
  public nomeOponente: string;
  public pontosLutador1;
  public pontosLutador2;
  public totalPontos1 = 0;
  public totalPontos2 = 0;

  public nomeLutador;
  public visaoPonto = 1;

  // //Perfil adversario
  // public altura: any;
  // public preferencia: any;
  // public empunhadura: any;
  // public tatica: any;
  // public rankingOponente: any;
  // public nivelTecnico: any;

  //Pontuação Geral
  mediaAutoAvaliacao;
  mediaEfeitoPratica;
  mediaAvaliarAdversario;


  // Avaliação do Adversário

  conservador_ousado: any;
  inconstante_constante: any;
  inseguro_confiante: any;
  pressionado_controlado: any;
  provocativa_respeitosa: any;
  passiva_ativa: any;

  conservador_ousado_geral: any;
  inconstante_constante_geral: any;
  inseguro_confiante_geral: any;
  pressionado_controlado_geral: any;
  provocativa_respeitosa_geral: any;
  passiva_ativa_geral: any;

  //Auto Avaliação

  myConfiante: any;
  myEstressado: any;
  myFocado: any;
  myMotivado: any;
  myControlado: any;
  myDisciplinado: any;

  myConfiante_geral: any;
  myEstressado_geral: any;
  myFocado_geral: any;
  myMotivado_geral: any;
  myControlado_geral: any;
  myDisciplinado_geral: any;

  //Efeito pratica
  efeitoPratica = new efeitoPratica;
  efeitoPratica_geral = new efeitoPratica;
  _geral

  //Vetor cores da visão geral
  colorBarGeral = new Array(3);


  public pontoDetalhado: any;

  voltar() {
    this.router.navigate(['/minhas-lutas'])
  }

  constructor(
    private profileService: ProfileService,
    private lutaService: LutaService,
    public router: Router,
    public alertController: AlertController) {

  }

  ngOnInit() {

    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        if (userProfileSnapshot.data().lutas) {
          this.meuNome = userProfileSnapshot.data().nome;
          this.lutas = userProfileSnapshot.data().lutas;
          this.lutadores = userProfileSnapshot.data().lutadores;
          this.escolheLuta();
          this.zeraPontos();
          this.computaAvaliarAdversario();
          this.createRadarChartAvaliarAdversario();
          this.computaAutoAvaliacao();
          this.createRadarChartAutoAvaliar();
          this.computaEfeitoPratica();
          this.createRadarChartEfeitoPratica();
          this.computaPontuacaoGeral();
          this.createbarChartPontuacaoGeral();
        }
      });
      document.getElementById("estatisticas").style.display = "none";

  }

  public alteraFormatoRelatorio(formatoRelatorio: string){
    if (formatoRelatorio == "estatisticas"){
      document.getElementById("estatisticas").style.display = "";
      document.getElementById("tabela").style.display = "none";
      
      document.getElementById("botao_estatisticas").setAttribute( `color`,"primary") ;
      document.getElementById("botao_pontos").setAttribute( `color`,"tertiary") ;
      
    }else{
      document.getElementById("estatisticas").style.display = "none";
      document.getElementById("tabela").style.display = "";
      document.getElementById("botao_estatisticas").setAttribute( `color`,"tertiary") ;
      document.getElementById("botao_pontos").setAttribute( `color`,"primary") ;
    
    }
  }

  public zeraPontos() {
    this.myConfiante_geral = 0;
    this.myEstressado_geral = 0;
    this.myFocado_geral = 0;
    this.myMotivado_geral = 0;
    this.myControlado_geral = 0;
    this.myDisciplinado_geral = 0;

    this.conservador_ousado_geral = 0;
    this.inconstante_constante_geral = 0;
    this.inseguro_confiante_geral = 0;
    this.pressionado_controlado_geral = 0;
    this.provocativa_respeitosa_geral = 0;
    this.passiva_ativa_geral = 0;


    this.efeitoPratica_geral.sonolento_alerta = 0;
    this.efeitoPratica_geral.cansado_vigoroso = 0;
    this.efeitoPratica_geral.inseguro_confiante = 0;
    this.efeitoPratica_geral.preocupado_tranquilo = 0;
    this.efeitoPratica_geral.triste_feliz = 0;
    this.efeitoPratica_geral.desmotivado_motivado = 0;

  }

  public escolheLuta() {
    this.lutadoresAtuais = this.lutadores[this.lutaService.getLutaAtual()];
    this.luta = this.lutas[this.lutaService.getLutaAtual()];
    var lutadoresNomes = [this.lutadoresAtuais.nome1, this.lutadoresAtuais.nome2];
    this.nomeLutador = this.lutadoresAtuais.nome1;
    
    this.nomeOponente = this.lutadoresAtuais.Perfil_Adversario.nome2;
    var Ataques = this.luta.Ataques;
    var LocalCorpo = this.luta.LocalCorpo;
    var Arena = this.luta.Area;
    var Efetividade = this.luta.Efetividade;
    var i;
    console.log(Ataques);
    console.log(this.luta);

    this.lutaDetalhes = this.lutaService.formaLuta(lutadoresNomes, Ataques, LocalCorpo, Arena, Efetividade);
    this.lutaEstatistica = this.lutaService.formaLutaEstatistic(lutadoresNomes, Ataques, LocalCorpo, Arena, Efetividade);

    this.pontosLutador1 = this.lutaService.getPontosLutador1();
    this.pontosLutador2 = this.lutaService.getPontosLutador2();

    for (i = 0; i < this.pontosLutador1.length; i++) {
      this.totalPontos2 += this.pontosLutador1[i].quantidadeAcertos;
      console.log(this.pontosLutador1[i])
      console.log(this.totalPontos1);
    } 

    for (i = 0; i < this.pontosLutador2.length; i++) {
      this.totalPontos1 += this.pontosLutador2[i].quantidadeAcertos;
      console.log(this.totalPontos2);
    }

    console.log(this.totalPontos1);
    console.log(this.totalPontos2);
    console.log(this.pontosLutador2.length);
  }

  detalhaPontos(pontosDetalhado) {
    this.pontoDetalhado = pontosDetalhado
    this.presentAlert();;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.pontoDetalhado.nomeLocalCorpo,
      subHeader: 'Acertos por tipo de ataque',
      message:
        'Ataque:' + this.pontoDetalhado.tipoAtaques.ataque1 +
        '<br> Resposta:' + this.pontoDetalhado.tipoAtaques.ataque2 +
        '<br> Contra-Resposta:' + this.pontoDetalhado.tipoAtaques.ataque3 +
        '<br> Contra-Ataque:' + this.pontoDetalhado.tipoAtaques.ataque4 +
        '<br> Toque duplo:' + this.pontoDetalhado.tipoAtaques.ataque5,
      buttons: ['OK']
    });

    await alert.present();
  }

  // computaCaracteristicasAdversario() {
  //   this.altura_relativa = this.lutadoresAtuais.conservador_ousado;
  //   this.inconstante_constante = this.lutadoresAtuais.inconstante_constante;
  //   this.inseguro_confiante = this.lutadoresAtuais.inseguro_confiante;
  //   this.pressionado_controlado = this.lutadoresAtuais.pressionado_controlado;
  //   this.provocativa_respeitosa = this.lutadoresAtuais.provocativa_respeitosa;
  //   this.passiva_ativa = this.lutadoresAtuais.passiva_ativa;

  // }

  computaAvaliarAdversario() {
    console.log(this.lutadoresAtuais);

    this.conservador_ousado = this.lutadoresAtuais.Avaliacao_Adversario.conservador_ousado;
    this.inconstante_constante = this.lutadoresAtuais.Avaliacao_Adversario.inconstante_constante;
    this.inseguro_confiante = this.lutadoresAtuais.Avaliacao_Adversario.inseguro_confiante;
    this.pressionado_controlado = this.lutadoresAtuais.Avaliacao_Adversario.pressionado_controlado;
    this.provocativa_respeitosa = this.lutadoresAtuais.Avaliacao_Adversario.provocativa_respeitosa;
    this.passiva_ativa = this.lutadoresAtuais.Avaliacao_Adversario.passiva_ativa;

    for (var indiceLutador in this.lutadores) {
      this.conservador_ousado_geral += this.lutadores[indiceLutador].Avaliacao_Adversario.conservador_ousado;
      this.inconstante_constante_geral += this.lutadores[indiceLutador].Avaliacao_Adversario.inconstante_constante;
      this.inseguro_confiante_geral += this.lutadores[indiceLutador].Avaliacao_Adversario.inseguro_confiante;
      this.pressionado_controlado_geral += this.lutadores[indiceLutador].Avaliacao_Adversario.pressionado_controlado;
      this.provocativa_respeitosa_geral += this.lutadores[indiceLutador].Avaliacao_Adversario.provocativa_respeitosa;
      this.passiva_ativa_geral += this.lutadores[indiceLutador].Avaliacao_Adversario.passiva_ativa;
    }
    this.conservador_ousado_geral /= this.lutadores.length;
    this.inconstante_constante_geral /= this.lutadores.length;
    this.inseguro_confiante_geral /= this.lutadores.length;
    this.pressionado_controlado_geral /= this.lutadores.length;
    this.provocativa_respeitosa_geral /= this.lutadores.length;
    this.passiva_ativa_geral /= this.lutadores.length;

  }

  computaEfeitoPratica() {
    this.efeitoPratica.sonolento_alerta = this.lutadoresAtuais.Efeito_Pratica.sonolento_alerta;
    this.efeitoPratica.cansado_vigoroso = this.lutadoresAtuais.Efeito_Pratica.cansado_vigoroso;
    this.efeitoPratica.inseguro_confiante = this.lutadoresAtuais.Efeito_Pratica.inseguro_confiante;
    this.efeitoPratica.preocupado_tranquilo = this.lutadoresAtuais.Efeito_Pratica.preocupado_tranquilo;
    this.efeitoPratica.triste_feliz = this.lutadoresAtuais.Efeito_Pratica.triste_feliz;
    this.efeitoPratica.desmotivado_motivado = this.lutadoresAtuais.Efeito_Pratica.desmotivado_motivado;

    for (var indiceLutador in this.lutadores) {
      this.efeitoPratica_geral.sonolento_alerta += this.lutadores[indiceLutador].Efeito_Pratica.sonolento_alerta;
      this.efeitoPratica_geral.cansado_vigoroso += this.lutadores[indiceLutador].Efeito_Pratica.cansado_vigoroso;
      this.efeitoPratica_geral.inseguro_confiante += this.lutadores[indiceLutador].Efeito_Pratica.inseguro_confiante;
      this.efeitoPratica_geral.preocupado_tranquilo += this.lutadores[indiceLutador].Efeito_Pratica.preocupado_tranquilo;
      this.efeitoPratica_geral.triste_feliz += this.lutadores[indiceLutador].Efeito_Pratica.triste_feliz;
      this.efeitoPratica_geral.desmotivado_motivado += this.lutadores[indiceLutador].Efeito_Pratica.desmotivado_motivado;
    }

    this.efeitoPratica_geral.sonolento_alerta /= this.lutadores.length;
    this.efeitoPratica_geral.cansado_vigoroso /= this.lutadores.length;
    this.efeitoPratica_geral.inseguro_confiante /= this.lutadores.length;
    this.efeitoPratica_geral.preocupado_tranquilo /= this.lutadores.length;
    this.efeitoPratica_geral.triste_feliz /= this.lutadores.length;
    this.efeitoPratica_geral.desmotivado_motivado /= this.lutadores.length;

  }

  computaAutoAvaliacao() {

    this.myConfiante = this.lutadoresAtuais.Auto_Avaliacao.confiante;
    this.myEstressado = this.lutadoresAtuais.Auto_Avaliacao.estressado;
    this.myFocado = this.lutadoresAtuais.Auto_Avaliacao.focado;
    this.myMotivado = this.lutadoresAtuais.Auto_Avaliacao.motivado;
    this.myControlado = this.lutadoresAtuais.Auto_Avaliacao.controlado;
    this.myDisciplinado = this.lutadoresAtuais.Auto_Avaliacao.disciplinado;

    for (var indiceLutador in this.lutadores) {
      this.myConfiante_geral += this.lutadores[indiceLutador].Auto_Avaliacao.confiante;
      this.myEstressado_geral += this.lutadores[indiceLutador].Auto_Avaliacao.estressado;
      this.myFocado_geral += this.lutadores[indiceLutador].Auto_Avaliacao.focado;
      this.myMotivado_geral += this.lutadores[indiceLutador].Auto_Avaliacao.motivado;
      this.myControlado_geral += this.lutadores[indiceLutador].Auto_Avaliacao.controlado;
      this.myDisciplinado_geral += this.lutadores[indiceLutador].Auto_Avaliacao.disciplinado;
    }
    console.log(this.myDisciplinado_geral);
    console.log(this.lutadores.length);
    this.myConfiante_geral /= this.lutadores.length;
    this.myEstressado_geral /= this.lutadores.length;
    this.myFocado_geral /= this.lutadores.length;
    this.myMotivado_geral /= this.lutadores.length;
    this.myControlado_geral /= this.lutadores.length;
    this.myDisciplinado_geral /= this.lutadores.length;
    console.log(this.myDisciplinado_geral);


  }

  computaPontuacaoGeral() {
    this.mediaAutoAvaliacao = this.calculaMediaAutoAvaliacao();
    this.mediaEfeitoPratica = this.calculaMediaEfeitoPratica();
    this.mediaAvaliarAdversario = this.calculaMediaAvaliarAdversario();

  }

  calculaMediaAutoAvaliacao(): any {
    var valormedio;
    valormedio = (this.myConfiante +
      this.myEstressado +
      this.myFocado +
      this.myMotivado +
      this.myControlado +
      this.myDisciplinado) / 6;

    if (valormedio < 1.6) {

      this.colorBarGeral[0] = '#ff0000';

    } else if (valormedio < 2.2) {
      this.colorBarGeral[0] = '#ffff00';

    } else {
      this.colorBarGeral[0] = '#00f716';

    }

    return valormedio;

  }

  calculaMediaEfeitoPratica(): any {
    var valormedio;
    valormedio = (this.efeitoPratica.sonolento_alerta +
      this.efeitoPratica.cansado_vigoroso +
      this.efeitoPratica.inseguro_confiante +
      this.efeitoPratica.preocupado_tranquilo +
      this.efeitoPratica.triste_feliz +
      this.efeitoPratica.desmotivado_motivado) / 6;

    if (valormedio < 1.6) {

      this.colorBarGeral[2] = '#ff0000';
    } else if (valormedio < 2.2) {

      this.colorBarGeral[2] = '#ffff00';
    } else {

      this.colorBarGeral[2] = '#00f716';
    }

    return valormedio;
  }

  calculaMediaAvaliarAdversario(): any {
    var valormedio;
    valormedio = (this.conservador_ousado +
      this.inconstante_constante +
      this.inseguro_confiante +
      this.pressionado_controlado +
      this.provocativa_respeitosa +
      this.passiva_ativa) / 6;
    if (valormedio < 1.6) {

      this.colorBarGeral[1] = '#ff0000';
    } else if (valormedio < 2.2) {

      this.colorBarGeral[1] = '#ffff00';
    } else {

      this.colorBarGeral[1] = '#00f716';
    }

    return valormedio;
  }

  // createRadarChartPerfilAdversario() {
  //   let ctx = this.radarPerfilAdversario.nativeElement;
  //   ctx.height = 200;
  //   this.radarPerfilAdversario = new Chart(ctx, {
  //     type: 'radar',
  //     data: {
  //       labels: ['Vitorias', 'Derrotas'],
  //       datasets: [{
  //         label: ['Vitorias', 'Derrotas'],
  //         data: [this.vitorias, this.derrotas],
  //         backgroundColor: ['rgb(37, 199, 22)', 'rgb(240, 38, 24)'], // array should have same number of elements as number of dataset
  //         borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
  //         borderWidth: 1,
  //         weight: 100,
  //       }]
  //     },
  //     options: {
  //       legend: {
  //         labels: {

  //         }
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }

  createRadarChartAvaliarAdversario() {
    let ctx = this.radarChartAvaliarAdversario.nativeElement;
    ctx.height = 200;
    console.log(this.conservador_ousado, this.inconstante_constante, this.inseguro_confiante, this.pressionado_controlado, this.provocativa_respeitosa, this.passiva_ativa);
    this.radarAvaliarAdversario = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['ousado', 'constante', 'confiante', 'controlado', 'respeitosa', 'ativa'],
        datasets: [
          {
            label: ['Avaliação do adversario atual'],
            data: [this.conservador_ousado, this.inconstante_constante, this.inseguro_confiante, this.pressionado_controlado, this.provocativa_respeitosa, this.passiva_ativa],
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            weight: 100,
          },
          {
            label: ['Avaliação media do adversario'],
            data: [this.conservador_ousado_geral, this.inconstante_constante_geral, this.inseguro_confiante_geral, this.pressionado_controlado_geral, this.provocativa_respeitosa_geral, this.passiva_ativa_geral],
            borderColor: 'rgb(240, 252, 0)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            weight: 100,
          }
        ]
      },
      options: {

        scales: {
          yAxes: [{
            ticks: {
              max: 3,
              min: 0,
              stepSize: 0.5,
              suggestedMin: 1,
              suggestedMax: 3,
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  createRadarChartAutoAvaliar() {
    let ctx = this.radarChartAutoAvaliar.nativeElement;
    ctx.height = 200;
    this.radarAutoAvaliar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Confiante', 'Estressado', 'Focado', 'Motivado', 'Controlado', 'Disciplinado'],
        datasets: [
          {
            label: ['Auto avaliação do jogo'],
            data: [this.myConfiante, this.myEstressado, this.myFocado, this.myMotivado, this.myControlado, this.myDisciplinado],
            // backgroundColor: ['rgb(37, 199, 22)', 'rgb(240, 38, 24)'], // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            weight: 100,
          },
          {
            label: ['Auto avaliação media'],
            data: [this.myConfiante_geral, this.myEstressado_geral, this.myFocado_geral, this.myMotivado_geral, this.myControlado_geral, this.myDisciplinado_geral],
            // backgroundColor: ['rgb(37, 199, 22)', 'rgb(240, 38, 24)'], // array should have same number of elements as number of dataset
            borderColor: 'rgb(240, 252, 0)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            weight: 100,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              max: 3,
              min: 0,
              stepSize: 0.5,
              suggestedMin: 1,
              suggestedMax: 3,
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  createRadarChartEfeitoPratica() {

    let ctx = this.radarChartEfeitoPratica.nativeElement;
    ctx.height = 200;
    this.radarEfeitoPratica = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['alerta', 'vigoroso', 'confiante', 'tranquilo', 'feliz', 'motivado'],
        datasets: [
          {
            label: ['Efeitos da pratica do jogo atual'],
            data: [this.efeitoPratica.sonolento_alerta, this.efeitoPratica.cansado_vigoroso, this.efeitoPratica.inseguro_confiante, this.efeitoPratica.preocupado_tranquilo, this.efeitoPratica.triste_feliz, this.efeitoPratica.desmotivado_motivado],
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            weight: 100,
          },
          {
            label: ['Media dos efeitos da pratica'],
            data: [this.efeitoPratica_geral.sonolento_alerta, this.efeitoPratica_geral.cansado_vigoroso, this.efeitoPratica_geral.inseguro_confiante, this.efeitoPratica_geral.preocupado_tranquilo, this.efeitoPratica_geral.triste_feliz, this.efeitoPratica_geral.desmotivado_motivado],
            borderColor: 'rgb(240, 252, 0)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            weight: 100,
          }
        ]
      },
      options: {

        scales: {
          yAxes: [{
            ticks: {
              max: 3,
              min: 0,
              stepSize: 0.5,
              suggestedMin: 1,
              suggestedMax: 3,
              beginAtZero: true,
            }
          }]
        }

      }
    });
  }

  createbarChartPontuacaoGeral() {
    console.log(this.colorBarGeral);
    let ctx = this.barChartPontuacaoGeral.nativeElement;
    ctx.height = 200;
    this.barPontuacaoGeral = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Auto Avaliacao', 'Avaliar Adversario', 'Efeito Pratica'],
        datasets: [{
          label: ['Pontuação geral'],
          data: [this.mediaAutoAvaliacao, this.mediaAvaliarAdversario, this.mediaEfeitoPratica],
          backgroundColor: this.colorBarGeral,
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          weight: 100,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              
              beginAtZero: true,

            }
          }]
        }
      }
    });
  }


}
