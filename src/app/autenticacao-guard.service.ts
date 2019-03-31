import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

import { AutenticacaoService } from './autenticacao.service';

// Estratégia de Guarda de Rotas que permite que consigamos definir se uma Rota pode ou não ser acessada.
// No mapa de rotas, devemos declarar o Array de classes que devem implementar CanActivate para definir se a rota pode ou não ser acessada.
@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacaoService: AutenticacaoService) {}

    public canActivate(): boolean {

        return this.autenticacaoService.autenticado();
    }
}
