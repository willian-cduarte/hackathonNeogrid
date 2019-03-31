import { Component, OnInit } from '@angular/core';
import { BdService } from './../bd.service';
import { Ticket } from './../util/ticket.model';

import { AutenticacaoService } from './../autenticacao.service';

@Component({
  selector: 'app-home-analista',
  templateUrl: './home-analista.component.html',
  styleUrls: ['./home-analista.component.css']
})
export class HomeAnalistaComponent implements OnInit {

  public itensTicket: Ticket[] = [];

  constructor(
    private autenticacaoService: AutenticacaoService,
    private bdService: BdService
  ) { }

  ngOnInit() {

    // Implementação pendente
    // this.atualizaTicketsSuporte();
  }

  public atualizaTicketsSuporte(): void{
    this.bdService.consultaTicketsSuporte()
    .then((resposta: Ticket[]) => {

      this.itensTicket = resposta;
      console.log('Resposta', resposta);
      console.log( this.itensTicket);
    });
 }


  public sair(): void {

    this.autenticacaoService.sair();
  }

  

}
