import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { BdService } from '../../bd.service';
import { Publicacao } from '../publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public emailUsuario: string;
  public publicacoesTime: Publicacao[];

  constructor(private bdService: BdService) { }

  ngOnInit() {

    // Email do usuário autenticado
    firebase.auth().onAuthStateChanged((user) => {

      this.emailUsuario = user.email;

      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {

    this.bdService.consultaPublicacoes(this.emailUsuario)
      .then((publicacoes: Publicacao[]) => {

        this.publicacoesTime = publicacoes;
      });

    // console.log('listaPublicacoes', listaPublicacoes);

  }

}
