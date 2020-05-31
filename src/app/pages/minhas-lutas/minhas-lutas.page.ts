import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from '../../services/user/profile.service';
import { LutaService } from 'src/app/services/user/luta.service';
// import { PopoverController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';



@Component({ 
  selector: 'app-minhas-lutas',
  templateUrl: './minhas-lutas.page.html', 
  styleUrls: ['./minhas-lutas.page.scss'],
})
export class MinhasLutasPage implements OnInit {
  public lutas: any;
  public userProfile: any;

  
  constructor(
    private profileService: ProfileService,
    public router: Router,
    public lutaService:LutaService,
    // public popoverController: PopoverController
    ) {  
     
  }  
  voltar(){
    this.router.navigate(['/user'])
  }
  ngOnInit() {
    this.profileService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
      this.lutas = this.userProfile.lutadores;
      this.ordenaLutas();
    });
 }
  selecionaLuta(lutaSelecionada){

    this.lutaService.setLutaAtual(lutaSelecionada);
    this.router.navigate(['/relatorio']) 
    }

  ordenaLutas(){
  var valor: any;
  var a_data_num: number;
  var b_data_num: number;
  var a_data_string: string;
  var b_data_string: string;
  console.log(this.lutas);
  this.lutas.sort(function(a, b){
      valor =  b.data - a.data ;
      a_data_string = a.data + a.hora;
      b_data_string = b.data + b.hora;
      a_data_string = a_data_string.replace('.','');
      a_data_string = a_data_string.replace('/','');
      b_data_string = b_data_string.replace('.','');
      b_data_string = b_data_string.replace('/','');
      a_data_num = parseInt(a_data_string);
      b_data_num = parseInt(b_data_string);
      valor = b_data_num - a_data_num;
      return valor;
    });

  }
  buscarData(){
  }
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }
 }


