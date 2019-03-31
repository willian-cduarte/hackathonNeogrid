import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { ProgressoService } from './progresso.service';
import { BdService } from './bd.service';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import { TicketsClienteComponent } from './home-cliente/tickets-cliente/tickets-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent,
    HomeClienteComponent,
    TicketsClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AutenticacaoService,
    AutenticacaoGuard,
    BdService,
    ProgressoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
