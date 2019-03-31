import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AutenticacaoService } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Expor o método EventEmitter para o componentem PAI passadno um parâmetro string.
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    senha: new FormControl(null)
  });

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {

    // Método da classe FILHO dispara outro Evento para o componente Pai que irá perceber pelo EventBiding do componente Filho (TemplatePAI)
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {

    this.autenticacaoService.autenticarUsuario(this.formulario.value.email, this.formulario.value.senha);
  }

}
