import { Component,OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { LutaService } from 'src/app/services/user/luta.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';

import { ModalController} from '@ionic/angular';
import { ModalFiltro2Page } from '../../modal-filtro2/modal-filtro.page';


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
  myMaoEsq: any;
  myBracoDir: any;
  myMaoDir: any;
  myPernaDir: any;
  myPernaEsq: any;
  myPeDir: any;
  myPeEsq: any;
  opCabeca: any;
  opTronco: any;
  opBracoEsq: any;
  opMaoEsq: any;
  opBracoDir: any;
  opMaoDir: any;
  opPernaDir: any;
  opPernaEsq: any;
  opPeDir: any;
  opPeEsq: any;
  
  public lutaPontosVisao: any;
  
  constructor(
    private profileService: ProfileService,
    private router: Router,
    public modalCtrl1: ModalController,
    public lutaService: LutaService) {
      this.profileService
      .getUserProfile() 
      .get()
      .then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.lutaCabecalho = this.userProfile.lutadores;
        this.lutasPontos = this.userProfile.lutas;
        this.lutaPontosVisao = this.lutasPontos.slice();
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
    public filtraLutas(filtro:any){
      var aux: string;  
      if(filtro.filtro.tipoJogo === undefined){
        return;
      }else if(filtro.filtro.tipoJogo == "limpar"){
        this.lutaPontosVisao= this.lutasPontos.slice();
        this.recalculaEstatisticas();
        return;
      }
      this.lutaPontosVisao = [];
      for (var luta in this.lutaCabecalho){
        if(this.lutaCabecalho[luta].Jogo.tipoJogo == filtro.filtro.tipoJogo){
          if(filtro.filtro.etapaCampeonato === undefined){
            this.lutaPontosVisao.push(this.lutasPontos[luta]);
          }else{
            if(this.lutaCabecalho[luta].Jogo.etapaCampeonato == filtro.filtro.etapaCampeonato){
              if(filtro.filtro.etapaEliminatoria === undefined){
                this.lutaPontosVisao.push(this.lutasPontos[luta]);
              }else if(this.lutaCabecalho[luta].Jogo.etapaEliminatoria == filtro.filtro.etapaEliminatoria){
                this.lutaPontosVisao.push(this.lutasPontos[luta]);
              }
            }
          }
        }
      }
      this.recalculaEstatisticas();
    }
    recalculaEstatisticas(){
      this.computaVitorias();
      this.updatePieChart();
      this.computaPontos();
      this.updateBarChartTipoAtaque();
      this.computaLocalCorpo();
      this.updateBarChartLocalCorpo();
    } 
    
    ///////////////////////////////////////////////////////////////////////////////////////
    //-------------------------------------------GRAFICOS---------------------------------
    ///////////////////////////////////////////////////////////////////////////////////////
    
    computaVitorias() {
      var meusPontos: number;
      var pontosOponentes: number;
      var ponto: any;
      // var lutaPontos:any;
      
      this.vitorias = 0;
      this.derrotas = 0;
      for (var lutaPontos in this.lutaPontosVisao) {
        meusPontos = 0;
        pontosOponentes = 0;
        for (ponto in this.lutaPontosVisao[lutaPontos].LocalCorpo) {
          if (this.lutaPontosVisao[lutaPontos].LocalCorpo[ponto] >= 10) {
            meusPontos += 1;
          } else {
            pontosOponentes += 1;
          }
        }
        if (meusPontos > pontosOponentes) {
          this.vitorias += 1;
        }
        else {
          this.derrotas += 1;
        }
        
      }
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
      for (var lutaPontos in this.lutaPontosVisao) {
        for (var ponto in this.lutaPontosVisao[lutaPontos].LocalCorpo) {
          if (this.lutaPontosVisao[lutaPontos].LocalCorpo[ponto] <= 6) {
            switch (this.lutaPontosVisao[lutaPontos].Ataques[ponto]) {
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
            switch (this.lutaPontosVisao[lutaPontos].Ataques[ponto]) {
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
      this.myMaoEsq = 0;
      this.myBracoDir = 0;
      this.myMaoDir = 0;
      this.myPernaDir = 0;
      this.myPernaEsq = 0;
      this.myPeDir = 0;
      this.myPeEsq = 0;
      this.opCabeca = 0;
      this.opTronco = 0;
      this.opBracoEsq = 0;
      this.opBracoEsq = 0;
      this.opBracoDir = 0;
      this.opBracoDir = 0;
      this.opPernaDir = 0;
      this.opPernaEsq = 0;
      this.opPeDir = 0;
      this.opPeEsq = 0;
      console.log(this.lutaPontosVisao);
      for (var lutaPontos in this.lutaPontosVisao) {
        for (var ponto in this.lutaPontosVisao[lutaPontos].LocalCorpo) {
          console.log(this.lutaPontosVisao[lutaPontos].LocalCorpo);
          console.log(this.lutaPontosVisao[lutaPontos].LocalCorpo[ponto]);
          switch (this.lutaPontosVisao[lutaPontos].LocalCorpo[ponto]) {            
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
            this.myMaoEsq += 1;
            break;
            case 5:
            this.myBracoDir += 1;
            break;
            case 6:
            this.myMaoDir += 1;
            break;
            case 7:
            this.myPernaEsq += 1;
            break;
            case 8:
            this.myPernaDir += 1;
            break;
            case 9:
            this.myPeEsq += 1;
            break;
            case 10:
            this.myPeDir += 1;
            break;
            case 11:
            this.opCabeca += 1;
            break;
            case 12:
            this.opTronco += 1;
            break;
            case 13:
            this.opBracoEsq += 1;
            break;
            case 14:
            this.opMaoEsq += 1;
            break;
            case 15:
            this.opBracoDir += 1;
            break;
            case 16:
            this.opMaoDir += 1;
            break;
            case 17:
            this.opPernaEsq += 1;
            break;
            case 18:
            this.opPernaDir += 1;
            break;
            case 19:
            this.opPeEsq += 1;
            break;
            case 20:
            this.opPeDir += 1;
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
          labels: ['Cabeca','Tronco', 'Braço esquerdo', 'Mão esquerda', 'Braço direito', 'Mão direita', 'Perna esquerda', 'Perna direita', 'Pe esquerdo', 'Pe direito'],
          datasets: [{
            label: ['Pontos feitos'],
            data: [this.myCabeca, this.myTronco, this.myBracoEsq, this.myMaoEsq, this.myBracoDir, this.myMaoDir, this.myPernaEsq, this.myPernaDir, this.myPeEsq, this.myPeDir],
            backgroundColor:  'rgb(37, 199, 22)', //rray should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 1,
            barPercentage: 0.7,
            weight: 100,
          },
          {
            label: ['Pontos sofridos'],
            data: [this.opCabeca, this.opTronco, this.opBracoEsq, this.opMaoEsq, this.opBracoDir, this.opMaoDir, this.opPernaEsq, this.opPernaDir, this.opPeEsq, this.opPeDir],
            backgroundColor:  'rgb(240, 38, 24)', // array should have same number of elements as number of dataset
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
          label: ['Pontos feitos'],
          data: [this.myAtaques, this.myRespostas, this.myContraAtaques, this.myContraRespostas],
          backgroundColor:  ['rgb(37, 199, 22)', 'rgb(37, 199, 22)', 'rgb(37, 199, 22)', 'rgb(37, 199, 22)'],// array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barPercentage: 0.7,
          weight: 100,
        },
        {
          label: ['Pontos sofridos'],
          data: [this.opAtaques, this.opRespostas, this.opContraAtaques, this.opContraRespostas],
          backgroundColor:['rgb(240, 38, 24)', 'rgb(240, 38, 24)', 'rgb(240, 38, 24)', 'rgb(240, 38, 24)'], // array should have same number of elements as number of dataset
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

updateBarChartLocalCorpo(){
  
  this.barLocalCorpo.data.datasets.forEach((datasets) => {
    for(var i=0; i<10; i++){
      datasets.data.pop();
    }
  });


  var idDataset: any;
  for (idDataset in this.barLocalCorpo.data.datasets){
        
    if(idDataset == 0){
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myCabeca);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myTronco);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myBracoEsq);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myMaoEsq);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myBracoDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myMaoDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myPernaDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myPernaEsq);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myPeDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.myPeEsq);
  }else{
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opCabeca);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opTronco);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opMaoEsq);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opBracoEsq);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opBracoDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opMaoDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opPernaDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opPernaEsq);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opPeDir);
    this.barLocalCorpo.data.datasets[idDataset].data.push(this.opPeEsq);
    
    // console.log(datasets);
  }
}
  
  this.barLocalCorpo.update();
}

updateBarChartTipoAtaque(){
  
  this.barTipoAtaque.data.datasets.forEach((datasets) => {
    for(var i=0; i<4; i++){
      datasets.data.pop();
    }
  });
  
  var idDataset: any;
  for (idDataset in this.barTipoAtaque.data.datasets){
    console.log(this.barTipoAtaque.data.datasets[idDataset]);
    
    if(idDataset == 0){
      console.log("aqui");
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.myAtaques);
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.myRespostas); 
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.myContraAtaques);
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.myContraRespostas); 
    }else{
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.opAtaques);
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.opRespostas); 
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.opContraAtaques);
      this.barTipoAtaque.data.datasets[idDataset].data.push(this.opContraRespostas); 
      
    }
    console.log(this.barTipoAtaque.data.datasets[idDataset]);
  }
  
  this.barTipoAtaque.update();
  
}

updatePieChart(){
  for(var i=0; i<2; i++){
    this.pie.data.datasets.forEach((datasets) => {
      datasets.data.pop();     
    });
  }
  
  this.pie.data.datasets.forEach((datasets) => {
    datasets.data.push(this.vitorias);
    datasets.data.push(this.derrotas);
  });
  this.pie.update();
  
  // this.pie.data.datasets.forEach((datasets) => {
  
  // });
  this.pie.update();
  
}

///////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------MODAL---------------------------------
///////////////////////////////////////////////////////////////////////////////////////

async presentModal() {
  const modal = await this.modalCtrl1.create({
    component: ModalFiltro2Page, 
  });
  
  await modal.present();
  
  const { data } = await modal.onWillDismiss();
  this.filtraLutas(data);
  
}

}
