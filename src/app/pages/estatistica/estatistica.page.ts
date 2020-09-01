import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { LutaService } from 'src/app/services/user/luta.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.page.html',
  styleUrls: ['./estatistica.page.scss'],
})
export class EstatisticaPage implements OnInit {
  @ViewChild('pieChart') pieChart;
  pie: any;
  @ViewChild('barChartTipoAtaque') barChartTipoAtaque;
  barTipoAtaque: any;
  @ViewChild('barChartLocalCorpo') barChartLocalCorpo;
  barLocalCorpo: any;


  public lutaCabecalho: any;
  public lutasPontos: any;
  public userProfile: any;

  // Vitoria
  public vitorias: number;
  public derrotas: number;

  // ATAQUES
  myAtaques: any;
  myRespostas: any;
  myContraAtaques: any;
  myContraRespostas: any;
  opAtaques: any;
  opRespostas: any;
  opContraAtaques: any;
  opContraRespostas: any;

  // LocalCorpo
  myCabeca: any;
  myTronco: any;
  myBracoEsq: any;
  myBracoDir: any;
  myPernaDir: any;
  myPernaEsq: any;
  opCabeca: any;
  opTronco: any;
  opBracoEsq: any;
  opBracoDir: any;
  opPernaDir: any;
  opPernaEsq: any;

  constructor(private profileService: ProfileService,
    private router: Router,
    public lutaService: LutaService) {
    this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.lutaCabecalho = this.userProfile.lutadores;
        this.lutasPontos = this.userProfile.lutas;
        this.computaVitorias();
        this.createPieChart();
        this.computaPontos();
        this.createBarChartTipoAtaque();
        this.computaLocalCorpo();
        this.createBarChartLocalCorpo();

      });
  }

  voltar() {
    this.router.navigate(['/user'])
  }

  ngOnInit() {

  }
  computaVitorias() {
    var meusPontos: number;
    var pontosOponentes: number;
    var ponto: any;
    // var lutaPontos:any;

    this.vitorias = 0;
    this.derrotas = 0;
    console.log(this.lutasPontos);
    for (var lutaPontos in this.lutasPontos) {
      meusPontos = 0;
      pontosOponentes = 0;
      for (ponto in this.lutasPontos[lutaPontos].LocalCorpo) {
        if (this.lutasPontos[lutaPontos].LocalCorpo[ponto] >= 6) {
          meusPontos += 1;
        } else {
          pontosOponentes += 1;
        }
      }
      console.log(meusPontos, pontosOponentes)
      if (meusPontos > pontosOponentes) {
        this.vitorias += 1;
      }
      else {
        this.derrotas += 1;
      }

    }
    console.log(this.vitorias, this.derrotas);
  }

  computaPontos() {
    this.myAtaques = 0;
    this.myContraAtaques = 0;
    this.myContraRespostas = 0;
    this.myRespostas = 0;
    this.opAtaques = 0;
    this.opContraAtaques = 0;
    this.opContraRespostas = 0;
    this.opRespostas = 0;
    this.derrotas = 0;
    console.log(this.lutasPontos);
    for (var lutaPontos in this.lutasPontos) {
      for (var ponto in this.lutasPontos[lutaPontos].LocalCorpo) {
        if (this.lutasPontos[lutaPontos].LocalCorpo[ponto] <= 6) {
          switch (this.lutasPontos[lutaPontos].Ataques[ponto]) {
            case 1:
              this.myAtaques += 1;
              break;
            case 2:
              this.myRespostas += 1;
              break;
            case 3:
              this.myContraAtaques += 1;
              break;
            case 4:
              this.myContraRespostas += 1;
              break;
            default:
              break;
          }
        } else {
          switch (this.lutasPontos[lutaPontos].Ataques[ponto]) {
            case 1:
              this.opAtaques += 1;
              break;
            case 2:
              this.opRespostas += 1;
              break;
            case 3:
              this.opContraAtaques += 1;
              break;
            case 4:
              this.opContraRespostas += 1;
              break;
            default:
              break;
          }
        }
      }
    }
  }

  computaLocalCorpo() {
    this.myCabeca = 0;
    this.myTronco = 0;
    this.myBracoEsq = 0;
    this.myBracoDir = 0;
    this.myPernaDir = 0;
    this.myPernaEsq = 0;
    this.opCabeca = 0;
    this.opTronco = 0;
    this.opBracoEsq = 0;
    this.opBracoDir = 0;
    this.opPernaDir = 0;
    this.opPernaEsq = 0;
    for (var lutaPontos in this.lutasPontos) {
      for (var ponto in this.lutasPontos[lutaPontos].LocalCorpo) {
        switch (this.lutasPontos[lutaPontos].LocalCorpo[ponto]) {
          case 1:
            this.myCabeca += 1;
            break;
          case 2:
            this.myTronco += 1;
            break;
          case 3:
            this.myBracoEsq += 1;
            break;
          case 4:
            this.myBracoDir += 1;
            break;
          case 5:
            this.myPernaEsq += 1;
            break;
          case 6:
            this.myPernaDir += 1;
            break;
          case 7:
            this.opCabeca += 1;
            break;
          case 8:
            this.opTronco += 1;
            break;
          case 9:
            this.opBracoEsq += 1;
            break;
          case 10:
            this.opBracoDir += 1;
            break;
          case 11:
            this.opPernaEsq += 1;
            break;
          case 12:
            this.opPernaDir += 1;
            break;
        }
      }
    }
  }

  createPieChart() {
    let ctx = this.pieChart.nativeElement;
    ctx.height = 200;
    this.pie = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Vitorias', 'Derrotas'],
        datasets: [{
          label: ['Vitorias', 'Derrotas'],
          data: [this.vitorias, this.derrotas],
          backgroundColor: ['rgb(37, 199, 22)', 'rgb(240, 38, 24)'], // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          weight: 100,
        }]
      },
      options: {
        legend: {
          labels: {

          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createBarChartLocalCorpo() {
    let ctx = this.barChartLocalCorpo.nativeElement;
    ctx.height = 300;
    this.barLocalCorpo = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cabeca','Tronco', 'Braço esquerdo', 'Braço direito', 'Perna esquerda', 'Perna direita'],
        datasets: [{
          label: ['Cabeca','Tronco', 'Braço esquerdo', 'Braço direito', 'Perna esquerda', 'Perna direita'],
          data: [this.myCabeca, this.myTronco, this.myBracoEsq, this.myBracoDir, this.myPernaEsq, this.myPernaDir],
          backgroundColor: 'rgb(240, 38, 24)', //rray should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barPercentage: 0.7,
          weight: 100,
        },
        {
          label: ['Cabeca','Tronco', 'Braço esquerdo', 'Braço direito', 'Perna esquerda', 'Perna direita'],
          data: [this.opCabeca, this.opTronco, this.opBracoEsq, this.opBracoDir, this.opPernaEsq, this.opPernaDir],
          backgroundColor:  'rgb(37, 199, 22)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barPercentage: 0.7,
          weight: 100,
        }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            // stacked: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createBarChartTipoAtaque() {
    let ctx = this.barChartTipoAtaque.nativeElement;
    ctx.height = 300;
    this.barTipoAtaque = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ataques', 'Respostas', 'Contra-ataques', 'Contra-respostas'],
        datasets: [{
          label: ['Ataques', 'Respostas', 'Contra-ataques', 'Contra-respostas'],
          data: [this.myAtaques, this.myRespostas, this.myContraAtaques, this.myContraRespostas],
          backgroundColor: ['rgb(240, 38, 24)', 'rgb(240, 38, 24)', 'rgb(240, 38, 24)', 'rgb(240, 38, 24)'],// array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barPercentage: 0.7,
          weight: 100,
        },
        {
          label: ['Ataques', 'Respostas', 'Contra-ataques', 'Contra-respostas'],
          data: [this.opAtaques, this.opRespostas, this.opContraAtaques, this.opContraRespostas],
          backgroundColor: ['rgb(37, 199, 22)', 'rgb(37, 199, 22)', 'rgb(37, 199, 22)', 'rgb(37, 199, 22)'], // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barPercentage: 0.7,
          weight: 100,
        }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            // stacked: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
