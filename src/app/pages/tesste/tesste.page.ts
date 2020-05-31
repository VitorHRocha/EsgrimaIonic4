import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesste',
  templateUrl: './tesste.page.html',
  styleUrls: ['./tesste.page.scss'],
})
export class TesstePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  altura(altura:any ){
    console.log(altura)

  }

}
