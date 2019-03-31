import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { ProgressoService } from './progresso.service';
import { Publicacao } from './home/publicacao.model';
import { Ticket } from './util/ticket.model';
import { reject } from 'q';

@Injectable()
export class BdService {

    constructor(private progressoService: ProgressoService) {}

    public inserirTicket(ticket: Ticket, email: string): Promise<string> {

        return new Promise((resolve, reject) => {

            // Altenção inserido manual.
            let ticketInsertTeste: Ticket = ticket;

            console.log('inserirTicket: ', email);

            // ALTERAR NÃO ESQUECER
            firebase.database().ref(`ticket/${btoa(email)}`)
                .push( { ticketInsertTeste } )
                .then((resposta: any) => {
                    console.log('insert database');
                    console.log(resposta);
                    resolve('Ticket cadastrado');
                });
        });

    }

    public consultaTicketsSuporte(): Promise<Ticket[]>{
       
            return new Promise((resolve, reject) => {

                firebase.database().ref(`ticket`)
                    .once('value')
                    .then((snapshot: any) => {
    
                        const ticketsList: Array<Ticket> = [];
    
                        snapshot.forEach((childSnapshot: any) => {
                            let ticket: Ticket = childSnapshot.val();
    
                            ticket.key = childSnapshot.key;
    
                            ticketsList.push(ticket);
                        });
                        resolve(ticketsList);
                    });
            });
    }

     
    public consultaTickets(email: string): Promise<Ticket[]> {

        console.log('consultaTickets', email);

        let ticketArray: Ticket[] = [];

        return new Promise((resolve, reject) => {

            firebase.database().ref(`ticket/${btoa(email)}`)
                .once('value')
                .then((snapshot: any) => {

                    const ticketsList: Array<Ticket> = [];

                    snapshot.forEach((childSnapshot: any) => {
                        let ticket: Ticket = childSnapshot.val();

                        ticket.key = childSnapshot.key;

                        ticketsList.push(ticket);
                    });

                    ticketsList.forEach((ticket: any) => {
                        ticketArray.push(ticket.ticketInsertTeste);
                    })
                    resolve(ticketArray);
                });
        });
    }

    // Excluir publicar
    public publicar(publicacao: any): void {

        let nomeImagem: string;

        // Envio de detalhes da publicação para o Firebase Database
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo } )
            .then((resposta: any) => {

                // Nome de imagem recebe o nome do documento gravado no Firebase(Database)
                nomeImagem = resposta.key;

                // Ao finalizar o envio dos detalhes da postagem, dispara o envio da imagem,
                // utilizando o Key como nome do arquivo de imagem do storage.

                // Envio de arquivo para o Firebase Storage
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // Acompanhamento do progresso upload
                        (snapshot: any) => {

                            // console.log('Snapshot', snapshot);
                            this.progressoService.status = 'andamento';
                            this.progressoService.estado = snapshot;
                        },
                        (error) => {
                            // console.log('Error Upload', error);
                            this.progressoService.status = 'erro';
                        },
                        () => {
                            // Finalização do upload
                            // console.log('Upload finalizado');
                            this.progressoService.status = 'concluido';
                        }
                    );

            });
    }

    public consultaPublicacoes(email: string): Promise<Publicacao[]> {

        return new Promise((resolve, reject) => {

            // Recuperando os dados do Firebase Database
            firebase.database().ref(`publicacoes/${btoa(email)}`)
            .orderByValue()
            .once('value')
            .then((snapshot: any): Publicacao[] => {

                    const publicacoes: Array<Publicacao> = [];
                    // console.log('snapshot', snapshot.val());

                    snapshot.forEach((childSnapshot: any) => {
                        const publicacao: Publicacao = childSnapshot.val();
                        publicacao.key = childSnapshot.key;

                        publicacoes.push(publicacao);
                    });

                    // Inverter lista para apresentar do mais recente para o mais antigo.
                    return publicacoes.reverse();
            })
            .then((publicacoesOrdenadas: Publicacao[]) => {

                publicacoesOrdenadas.forEach((publicacao: Publicacao) => {

                    // Consultar a URL da imagem, pois as imagens do storage só são acessíveis através da URL com o TOKEN.
                    firebase.storage().ref()
                    .child(`imagens/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url: string) => {

                        // console.log('URL', url);
                        publicacao.urlImagem = url;

                        // Consultar o nome do usuário que fez a publicação
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                            .once('value')
                            .then((snapshot: any) => {

                                publicacao.nomeUsuario = snapshot.val().nome_completo;
                            });
                    });
                });

                resolve(publicacoesOrdenadas);
            });
        }); // return
    }
}

/*
// console.log('childSnapshot', childSnapshot.val());

const publicacao: Publicacao = childSnapshot.val();

// Consultar a URL da imagem, pois as imagens do storage só são acessíveis através da URL com o TOKEN.
firebase.storage().ref()
    .child(`imagens/${childSnapshot.key}`)
    .getDownloadURL()
    .then((url: string) => {

        // console.log('URL', url);
        publicacao.urlImagem = url;

        // Consultar o nome do usuário que fez a publicação
        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
            .once('value')
            .then((snapshot: any) => {

                // console.log('Snapshot UsuarioDetalhe', snapshot.val());

                publicacao.nomeUsuario = snapshot.val().nome_completo;

                // Array de Publicações
                publicacoes.push(publicacao);
            });
    });
*/
