import { Component, OnInit } from '@angular/core';

// import { ViewController } from '@ionic/angular';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
  template: `
  <ion-list>
    <ion-list-header>Ionic</ion-list-header>
    <button ion-item (click)="close()">Learn Ionic</button>
    <button ion-item (click)="close()">Documentation</button>
    <button ion-item (click)="close()">Showcase</button>
    <button ion-item (click)="close()">GitHub Repo</button>
  </ion-list>
`
})
export class FiltroPage implements OnInit {

  constructor(
              // public viewCtrl: ViewController
              ) { }

  ngOnInit() {
  }
  close() {
    // this.viewCtrl.dismiss();
  }

}
