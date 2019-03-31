import { Component, OnInit, Input } from '@angular/core';

import { Ticket } from '../../util/ticket.model';

@Component({
  selector: 'app-tickets-cliente',
  templateUrl: './tickets-cliente.component.html',
  styleUrls: ['./tickets-cliente.component.css']
})
export class TicketsClienteComponent implements OnInit {

  @Input('tickets') public ticketsLista: Ticket[];

  constructor() { }

  ngOnInit() {

    console.log('TicketCliente aa', this.ticketsLista);
  }

}
