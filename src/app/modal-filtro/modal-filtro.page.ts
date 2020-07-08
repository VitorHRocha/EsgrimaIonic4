import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { AtletasService } from 'src/app/services/global/atletas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { concat } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'], 
})


export class ModalFiltroPage implements OnInit {
  public tipoLuta;
  public etapaCampeonato;
  public etapaEliminatoria;
  
  
  constructor(navParams: NavParams,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,) {
  }

  ngOnInit() {
    document.getElementById("registraAtleta").style.display = "none";
    document.getElementById("listAtleta").style.display = "inline";
  }
  

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data  
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
    
}
