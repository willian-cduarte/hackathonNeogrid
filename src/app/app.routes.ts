import { Routes } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import { HomeAnalistaComponent } from './home-analista/home-analista.component';

import { AutenticacaoGuard } from './autenticacao-guard.service';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'homeCliente', component: HomeClienteComponent, canActivate: [ AutenticacaoGuard ] },
    { path: 'homeAnalista', component: HomeAnalistaComponent, canActivate: [ AutenticacaoGuard ] },

    { path: '**', component: AcessoComponent }
];
