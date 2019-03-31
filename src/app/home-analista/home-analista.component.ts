import { Component, OnInit } from '@angular/core';
import { BdService } from './../bd.service';

import { AutenticacaoService } from './../autenticacao.service';

@Component({
  selector: 'app-home-analista',
  templateUrl: './home-analista.component.html',
  styleUrls: ['./home-analista.component.css']
})
export class HomeAnalistaComponent implements OnInit {

  constructor(
    private autenticacaoService: AutenticacaoService,
    private bdService: BdService
  ) { }

  ngOnInit() {

    this.atualizaTicketsSuporte();
  }

  public sair(): void {

    this.autenticacaoService.sair();
  }

}
