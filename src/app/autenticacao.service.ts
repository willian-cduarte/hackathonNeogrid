import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './util/usuario.model';
import { UsuarioLogin } from './acesso/usuarioLogin.model';

import * as firebase from 'firebase';

@Injectable()
export class AutenticacaoService {

    public tokenId: string;
    usuario: Usuario;
    constructor(private router: Router) {}

    public cadastrarUsuario(usuarioLogin: UsuarioLogin): Promise<any> {

        // console.log('Chegamos até o serviço', usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuarioLogin.email, usuarioLogin.senha)
            .then((resposta: any) => {
                console.log(resposta);

                // Remover a senha do atributo senha do obj usuário.
                delete usuarioLogin.senha;

                // Registrando dados complementares no path 'usuario_detalhe' com o 'nó' email na base64.
                firebase.database().ref(`usuario_detalhe/${btoa(usuarioLogin.email)}`)
                    .set( usuarioLogin );
            })
            .catch((error: Error) => {
                console.log('Error:', error);
            });
    }

    public autenticarUsuario(email: string, senha: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            let retornoAutenticacao: boolean;

            firebase.auth().signInWithEmailAndPassword(email, senha)
                .then((resposta: any) => {

                    // Token é retornado e armazenado no atributo tokenId da classe.
                    firebase.auth().currentUser.getIdToken()
                        .then((IdToken: string) => {

                        this.tokenId = IdToken;
                        // Navegador
                        localStorage.setItem('idTokenInstagram', IdToken);
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                        .once('value')
                        .then((snapshot: any) => {

                            let usuario = snapshot.val();
                            console.log(usuario)

                            if(usuario.cliente == true){
                                this.router.navigate(['/homeCliente']);
                                console.log('homeCliente')

                            }else{
                                this.router.navigate(['/homeAnalista']);
                                console.log('homeAnalista')

                            } 
			    retornoAutenticacao = true;
                            resolve(retornoAutenticacao);                               
                        });

                        // Realiza a navegação ara a route 'home'
                    });
            })
            .catch((error: Error) => {
                console.log('Erro Autenticação', error);
		retornoAutenticacao = false;
                resolve(retornoAutenticacao);
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
