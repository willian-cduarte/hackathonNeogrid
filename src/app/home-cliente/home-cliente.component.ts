import { Component, OnInit } from '@angular/core';

import { Ticket } from './../util/ticket.model';
import { AutenticacaoService } from './../autenticacao.service';
import { BdService } from './../bd.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  public emailUsuario: string;
  public itensTicket: Ticket[] = [];

  constructor(
    private autenticacaoService: AutenticacaoService,
    private dbService: BdService) { }

   ngOnInit() {

    // Email do usuário autenticado
    firebase.auth().onAuthStateChanged((user) => {
      this.emailUsuario = user.email;
      console.log('this.emailUsuario', this.emailUsuario);

      // Insert exemplo
      // this.dbService.inserirTicket(new Ticket (1, '', '' , '', ''), this.emailUsuario);

      this.atualizaTickets();
    });
   }

   public atualizaTickets(): void {

    this.dbService.consultaTickets(this.emailUsuario)
      .then((resposta: Ticket[]) => {

        // alert('apos db consulta');

        this.itensTicket = resposta;

        // this.tickets = 111;

        console.log('ticketsCliente', this.itensTicket);
        console.log('Resposta', resposta);
        // alert(this.itensTicket);
      });
   }

  public sair(): void {

    this.autenticacaoService.sair();
  }
}
