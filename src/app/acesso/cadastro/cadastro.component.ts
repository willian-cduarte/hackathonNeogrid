import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioLogin } from '../UsuarioLogin.model';

import { AutenticacaoService } from '../../autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  // Expor o método EventEmitter para o componentem PAI passadno um parâmetro string.
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  // Inserir aqui no FormControl os Validators desejados para cada input do ReactiveForm
  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required, Validators.email ]),
    nomeCompleto: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(120) ]),
    nomeUsuario: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(30) ]),
    senha: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {

    // Método da classe FILHO dispara outro Evento para o componente Pai que irá perceber pelo EventBiding do componente Filho (TemplatePAI)
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {

    const usuarioLogin: UsuarioLogin = new UsuarioLogin(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.senha
    );

    console.log(UsuarioLogin);

    this.autenticacaoService.cadastrarUsuario(usuarioLogin)
      .then(() => { this.exibirPainelLogin(); });
  }

}
