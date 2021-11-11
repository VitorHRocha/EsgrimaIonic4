import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor(
    public router: Router) { }

  ngOnInit() {
  }
  voltar(){
    this.router.navigate(['/user'])
  }

}
