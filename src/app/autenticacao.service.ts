import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

<<<<<<< HEAD
import { Usuario } from './acesso/usuario.model';
import { Cliente } from './util/cliente.model';
=======
import { UsuarioLogin } from './acesso/usuarioLogin.model';
>>>>>>> f43c488ff14a7abaea2425eefdefc9664a440e1a

import * as firebase from 'firebase';

@Injectable()
export class AutenticacaoService {

    public tokenId: string;
    public usuario: Cliente;
    constructor(private router: Router) {}

    public cadastrarUsuario(usuario: UsuarioLogin): Promise<any> {

        // console.log('Chegamos até o serviço', usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log(resposta);

                // Remover a senha do atributo senha do obj usuário.
                delete usuario.senha;

                // Registrando dados complementares no path 'usuario_detalhe' com o 'nó' email na base64.
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario );
            })
            .catch((error: Error) => {
                console.log('Error:', error);
            });
    }

    public autenticarUsuario(email: string, senha: string): void {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {

                // Token é retornado e armazenado no atributo tokenId da classe.
                firebase.auth().currentUser.getIdToken()
                    .then((IdToken: string) => {

                        this.tokenId = IdToken;
                        // Navegador
                        localStorage.setItem('idTokenInstagram', IdToken);
                        firebase.database().ref(`usuario-detalhe/${btoa(email)}`)
                        .once('value')
                        .then((snapshot: any) => {
                            console.log(snapshot)
                            console.log(snapshot.usuario_detalhe)
                            this.cliente = snapshot.usuario_detalhe;
                                
                        });

                        // Realiza a navegação ara a route 'home'
                        this.router.navigate(['/homeCliente']);
                    });
            })
            .catch((error: Error) => {
                console.log('Erro Autenticação', error);
            });
    }

    public autenticado(): boolean {

        if (this.tokenId === undefined && localStorage.getItem('idTokenInstagram') !== null) {
            this.tokenId = localStorage.getItem('idTokenInstagram');
        }

        // Caso não esteja logado, deve redirecionar o usuário à página de login.
        if (this.tokenId === undefined) {
            this.router.navigate(['/']);
        }

        return this.tokenId !== undefined;
    }

    public sair(): void {

        // Efetuar o método de logout do firebase.
        firebase.auth().signOut()
            .then(() => {
                // Limpar o localStorage no item 'idTokenInstagram'
                localStorage.removeItem('idTokenInstagram');
                this.tokenId = undefined;

                this.router.navigate(['/#']);
            });
    }
}
