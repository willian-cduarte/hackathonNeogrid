import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado',[
        style({
          transform: 'translate(-60px, 0px)',
          opacity: 0
        }),
        animate('500ms 0s ease-in-out')
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          transform: 'translate(60px, 0)',
          opacity: 0
        }),
        animate('1500ms 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 1   , opacity: 1, transform: 'translateX(0)' })
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string;
  public estadoPainel: string;

  public cadastroView: boolean;

  constructor() { }

  ngOnInit() {

    this.estadoBanner = 'criado';
    this.estadoPainel = 'criado';

    this.cadastroView = false;
  }

  public exibirPainel(event: string): void {

    this.cadastroView = event === 'cadastro' ? true : false;
  }

  public inicioDaAnimacao(): void {
    // console.log('Inicio da animação.');
  }

  public fimDaAnimacao(): void {
    // console.log('Final da animação');
  }

}
