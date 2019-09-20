import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LutaService } from 'src/app/services/user/luta.service';

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
  
  public pontosLutador1;
  public pontosLutador2;
  public totalPontos1=0;
  public totalPontos2=0;
  
  public nomeLutador;
  public visaoPonto=1;
  
  voltar(){
    this.router.navigate(['/user'])
  }
  constructor(
    private profileService: ProfileService,
    private lutaService: LutaService,
    public router: Router) { }
    
    ngOnInit() {
      document.getElementById("descricao").style.display = "none";
      document.getElementById("tabela").style.display = "inline";
      document.getElementById("Lut2Pt2").style.display = "none";
      document.getElementById("Lut2Pt1").style.display = "none";
      document.getElementById("Lut1Pt2").style.display = "none";
      document.getElementById("Lut1Pt1").style.display = "inline";
      
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
      var Ataques= this.luta.Ataques;
      var LocalCorpo= this.luta.LocalCorpo;
      var Arena= this.luta.Area;
      var Efetividade= this.luta.Efetividade;
      this.lutaDetalhes=this.lutaService.formaLuta(
        lutadoresNomes,Ataques,LocalCorpo,Arena,Efetividade)
        this.lutaEstatistica=this.lutaService.formaLutaEstatistic(
          lutadoresNomes,Ataques,LocalCorpo,Arena,Efetividade);
          
          this.pontosLutador1 = this.lutaService.getPontosLutador1();
          var i;
          for (i=0;i<this.pontosLutador1.lenght ;i++ ){
            this.totalPontos1 += this.pontosLutador1[i].quantidadeAcertos;
          }
          this.pontosLutador2 = this.lutaService.getPontosLutador2();
          for (i=0;i<this.pontosLutador2.length ;i++ ){
            this.totalPontos2 += this.pontosLutador2[i].quantidadeAcertos;
          }
          console.log(this.totalPontos1);
          console.log(this.pontosLutador2.length );
        }
        
        lutaDetalhada(){
          document.getElementById("tabela").style.display = "none";
          document.getElementById("descricao").style.display = "inline";
        }
        lutaTabela(){
          document.getElementById("descricao").style.display = "none";
          document.getElementById("tabela").style.display = "inline";
        }
        
        trocaLutador(){
          if(this.nomeLutador == this.lutadoresAtuais.nome1){
            this.nomeLutador = this.lutadoresAtuais.nome2
            this.trocaVisaoPonto()
          }
          else{
            this.nomeLutador = this.lutadoresAtuais.nome1
            this.trocaVisaoPonto()
          }
        }
        PontosFeitos(){
          this.visaoPonto=1
          this.trocaVisaoPonto()
        }
        PontosSofridos(){
          this.visaoPonto=2
          this.trocaVisaoPonto()
        }
        
        trocaVisaoPonto(){
          if(this.visaoPonto == 1){
            if(this.nomeLutador == this.lutadoresAtuais.nome1){
              
              document.getElementById("Lut2Pt2").style.display = "none";
              document.getElementById("Lut2Pt1").style.display = "none";
              document.getElementById("Lut1Pt2").style.display = "none";
              document.getElementById("Lut1Pt1").style.display = "inline";
            }
            else{
              document.getElementById("Lut2Pt2").style.display = "none";
              document.getElementById("Lut2Pt1").style.display = "inline";
              document.getElementById("Lut1Pt2").style.display = "none";
              document.getElementById("Lut1Pt1").style.display = "none";
            }
            
          }
          else{
            if(this.nomeLutador == this.lutadoresAtuais.nome1){
              
              document.getElementById("Lut2Pt2").style.display = "none";
              document.getElementById("Lut2Pt1").style.display = "none";
              document.getElementById("Lut1Pt2").style.display = "inline";
              document.getElementById("Lut1Pt1").style.display = "none";
            }
            else{
              document.getElementById("Lut2Pt2").style.display = "inline";
              document.getElementById("Lut2Pt1").style.display = "none";
              document.getElementById("Lut1Pt2").style.display = "none";
              document.getElementById("Lut1Pt1").style.display = "none";
            }
            
            
          }
          
        }
        
        
        
        
        
      }
