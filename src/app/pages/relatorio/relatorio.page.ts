import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LutaService } from 'src/app/services/user/luta.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {
  
  public userProfile: any;
  public lutaAtual;
  public lutas: any; 
  public luta:any;
  public movimentos:any=["ataques" ,"local","arena","ef"];
  public lutaDetalhes: any;
  public lutastatistic: any;
  public lutaEstatistica: any;
  public lutadores:any;
  public lutadoresAtuais:any;
  public meuNome:string;
  public nomeOponente:string;  
  public pontosLutador1;
  public pontosLutador2;
  public totalPontos1=0;
  public totalPontos2=0;
  
  public nomeLutador;
  public visaoPonto=1;
  
  public pontoDetalhado: any;


  voltar(){
    this.router.navigate(['/user'])
  }
  constructor(
    private profileService: ProfileService,
    private lutaService: LutaService,
    public router: Router,
    public alertController: AlertController) {

  }
    
  ngOnInit() {
    // document.getElementById("descricao").style.display = "none";
    // document.getElementById("tabela").style.display = "inline";
    // document.getElementById("Lut2Pt2").style.display = "none";
    // document.getElementById("Lut2Pt1").style.display = "none";
    // document.getElementById("Lut1Pt2").style.display = "none";
    // document.getElementById("Lut1Pt1").style.display = "inline";
      
    this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        if(userProfileSnapshot.data().lutas){
          this.lutas = userProfileSnapshot.data().lutas;
          this.lutadores = userProfileSnapshot.data().lutadores;
          this.escolheLuta();
        }
      }); 
    }
  
  public escolheLuta(){
    this.lutadoresAtuais=this.lutadores[this.lutaService.getLutaAtual()];
    this.luta=this.lutas[this.lutaService.getLutaAtual()];
    var lutadoresNomes = [this.lutadoresAtuais.nome1, this.lutadoresAtuais.nome2];
    this.nomeLutador = this.lutadoresAtuais.nome1;
    this.meuNome = this.lutadoresAtuais.nome1;
    this.nomeOponente  = this.lutadoresAtuais.nome2;
    var Ataques= this.luta.Ataques;
    var LocalCorpo= this.luta.LocalCorpo;
    var Arena= this.luta.Area;
    var Efetividade= this.luta.Efetividade;
    var i;
    console.log(Ataques);
    console.log(this.luta);
    
    this.lutaDetalhes=this.lutaService.formaLuta( lutadoresNomes,Ataques,LocalCorpo,Arena,Efetividade);
    this.lutaEstatistica=this.lutaService.formaLutaEstatistic(lutadoresNomes,Ataques,LocalCorpo,Arena,Efetividade);
          
    this.pontosLutador1 = this.lutaService.getPontosLutador1();
    this.pontosLutador2 = this.lutaService.getPontosLutador2();

    for (i=0;i<this.pontosLutador1.length ;i++ ){
      this.totalPontos2 += this.pontosLutador1[i].quantidadeAcertos;
      console.log(this.pontosLutador1[i])
      console.log(this.totalPontos1);
    }

    for (i=0;i<this.pontosLutador2.length ;i++ ){
      this.totalPontos1 += this.pontosLutador2[i].quantidadeAcertos;
      console.log(this.totalPontos2);
    }
      
    console.log(this.totalPontos1);
    console.log(this.totalPontos2);
    console.log(this.pontosLutador2.length );
    }
        
    // public lutaDetalhada(){
    //   document.getElementById("tabela").style.display = "none";
    //   document.getElementById("descricao").style.display = "inline";
    // }
    
    // public  lutaTabela(){
    //   document.getElementById("descricao").style.display = "none";
    //   document.getElementById("tabela").style.display = "inline";
    // }
        
  // public  trocaLutador(){
  //   if(this.nomeLutador == this.lutadoresAtuais.nome1){
  //     this.nomeLutador = this.lutadoresAtuais.nome2
  //     this.trocaVisaoPonto()
  //   }
  //   else{
  //    this.nomeLutador = this.lutadoresAtuais.nome1
  //     this.trocaVisaoPonto()
  //   }
  // }
    
  // public PontosFeitos(){
  //   this.visaoPonto=1
  //   this.trocaVisaoPonto()
  // }
    
  // public PontosSofridos(){
  //   this.visaoPonto=2
  //   this.trocaVisaoPonto()
  // }
        
    // public trocaVisaoPonto(){
    //   if(this.visaoPonto == 1){
    //     if(this.nomeLutador == this.lutadoresAtuais.nome1){
    //       document.getElementById("Lut2Pt2").style.display = "none";
    //       document.getElementById("Lut2Pt1").style.display = "none";
    //       document.getElementById("Lut1Pt2").style.display = "none";
    //       document.getElementById("Lut1Pt1").style.display = "inline";
    //     }
    //     else{
    //       document.getElementById("Lut2Pt2").style.display = "none";
    //       document.getElementById("Lut2Pt1").style.display = "inline";
    //       document.getElementById("Lut1Pt2").style.display = "none";
    //       document.getElementById("Lut1Pt1").style.display = "none";
    //     }
    //   }
    //   else{
    //     if(this.nomeLutador == this.lutadoresAtuais.nome1){
    //       document.getElementById("Lut2Pt2").style.display = "none";
    //       document.getElementById("Lut2Pt1").style.display = "none";
    //       document.getElementById("Lut1Pt2").style.display = "inline";
    //       document.getElementById("Lut1Pt1").style.display = "none";
    //     }
    //     else{
    //       document.getElementById("Lut2Pt2").style.display = "inline";
    //       document.getElementById("Lut2Pt1").style.display = "none";
    //       document.getElementById("Lut1Pt2").style.display = "none";
    //       document.getElementById("Lut1Pt1").style.display = "none";
    //     }
    //   }
          
    // }
    
    detalhaPontos(pontosDetalhado){
      this.pontoDetalhado = pontosDetalhado
      this.presentAlert();;
    }
        
    async presentAlert() {
      const alert = await this.alertController.create({
        header: this.pontoDetalhado.nomeLocalCorpo,
        subHeader: 'Acertos por tipo de ataque',
        message:
          'Ataque:'+this.pontoDetalhado.tipoAtaques.ataque1+
          '<br> Resposta:'+this.pontoDetalhado.tipoAtaques.ataque2+
          '<br> Contra-Resposta:'+this.pontoDetalhado.tipoAtaques.ataque3+
          '<br> Contra-Ataque:'+this.pontoDetalhado.tipoAtaques.ataque4+
          '<br> Toque duplo:'+this.pontoDetalhado.tipoAtaques.ataque5,
        buttons: ['OK']
        });
      
        await alert.present();
        }
}
