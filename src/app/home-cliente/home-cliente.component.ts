import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  public formulario: FormGroup = new FormGroup({
    assunto: new FormControl(null, [ Validators.required, Validators.minLength(3) ]),
    descricao: new FormControl(null, [ Validators.required, Validators.minLength(3) ]),
    produto: new FormControl(null, [ Validators.required, Validators.minLength(3) ])
  });

  constructor(
    private autenticacaoService: AutenticacaoService,
    private dbService: BdService,
    private router: Router) { }

   ngOnInit() {

    // Email do usu�rio autenticado
    firebase.auth().onAuthStateChanged((user) => {
      this.emailUsuario = user.email;
      console.log('this.emailUsuario', this.emailUsuario);

      // Insert exemplo
      // this.dbService.inserirTicket(new Ticket (1, '', '' , '', ''), this.emailUsuario);

      this.atualizaTickets();
    });
   }
   public gravar():void {

    if (this.formulario.value.assunto != "" && this.formulario.value.descricao != "" && this.formulario.value.produto != "" ) {

      let ticket: Ticket = new Ticket(
        999,
        this.formulario.value.assunto,
        'Aberto',
        '02/04/2019',
        '',
        this.formulario.value.descricao,
        this.formulario.value.produto);

      this.dbService.inserirTicket(ticket ,this.emailUsuario)
        .then((response: string) => {

          console.log('response', response); 
          // this.router.navigate(['/homeCliente']);
          this.atualizaTickets();
        });

    } else {
      alert('Preencha os campos obrigatórios');
    }

    // console.log(this.formulario);
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
