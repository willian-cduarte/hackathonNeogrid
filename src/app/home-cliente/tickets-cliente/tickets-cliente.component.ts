import { Component, OnInit, Input } from '@angular/core';

import { Ticket } from '../../util/ticket.model';

@Component({
  selector: 'app-tickets-cliente',
  templateUrl: './tickets-cliente.component.html',
  styleUrls: ['./tickets-cliente.component.css']
})
export class TicketsClienteComponent implements OnInit {

  @Input('itensTicket') public itensTicket: string;
  // @Input('idPedidoCompra') public idPedidoCompra: number;


  constructor() { }

  ngOnInit() {

    console.log('TicketCliente PPPPPP', this.itensTicket);
    // alert(this.itensTicket);
  }

}
