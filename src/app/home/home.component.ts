import { Component, OnInit, ViewChild } from '@angular/core';

import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Através do ViewChild conseguimos acessar a classe do comp. filho, no template devemos marcar o elemento filho com o id #publicacoes.
  @ViewChild('publicacoes') public publicacoes: any;

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
  }

  public sair(): void {

    this.autenticacaoService.sair();
  }

  public atualizarTimeLine(event: Event): void {

    // Atualizar as publicações do componente FILHO (publicacoes)
    this.publicacoes.atualizarTimeLine();
  }

}
