import { Component, OnInit } from '@angular/core';

import { Ticket } from './../util/ticket.model';
import { BdService } from './../bd.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  // public itens: String[] = [];
  // public tickets: number = 0;
  public itensTicket: Ticket[] = [];

  constructor(private dbService: BdService) { }

   ngOnInit() {

    // Insert exemplo
    // this.dbService.inserirTicket(new Ticket (1, '', '' , '', ''));

    this.dbService.consultaTickets('app@teste.com')
      .then((resposta: Ticket[]) => {

        // alert('apos db consulta');

        this.itensTicket = resposta;

        // this.tickets = 111;

        console.log('ticketsCliente', this.itensTicket);
        console.log('Resposta', resposta);
        // alert(this.itensTicket);

      });
   }
}
