import { Component, OnInit, Input } from '@angular/core';

import { Ticket } from '../../util/ticket.model';
import { BdService } from '../../bd.service';

@Component({
  selector: 'app-tickets-cliente',
  templateUrl: './tickets-cliente.component.html',
  styleUrls: ['./tickets-cliente.component.css']
})
export class TicketsClienteComponent implements OnInit {

  @Input('tickets') public ticketsLista: Ticket[];

  public ticketsCliente: Ticket[] = [];

  constructor(private dbService: BdService) { }

  ngOnInit() {

    this.dbService.consultaTickets('app@teste.com')
    .then((resposta: Ticket[]) => {
      this.ticketsCliente = resposta;
      console.log('ticketsCliente', this.ticketsCliente);
    });
   
  }

}
