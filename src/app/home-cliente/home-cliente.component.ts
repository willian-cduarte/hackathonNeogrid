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
  public ticketsCliente: Ticket[] = [];

  constructor(private dbService: BdService) {
    
    /*this.itens.push('a');
    this.itens.push('b');
    this.itens.push('c');
    this.itens.push('d');    */
   }

   ngOnInit() {
    
    // Inser exemplo
    // this.dbService.inserirTicket(new Ticket (1, '', '' , ''));

    this.dbService.consultaTickets('app@teste.com')
      .then((resposta: Ticket[]) => {

        this.ticketsCliente = resposta;

        console.log('ticketsCliente', this.ticketsCliente);

      });
   }

    

}
