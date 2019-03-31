import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';

// import { Observable, interval, Subject } from 'rxjs';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BdService } from '../../bd.service';
import { ProgressoService } from '../../progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  // Expor o método atualizarTimeLine para o componente PAI (home)
  @Output() public atualizarTimeLine: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null, [ Validators.required, Validators.minLength(3) ])
  });

  public email: string;
  public imagem: any;

  public progressoPublicacao = 'pendente';
  public porcentagemUpload: number;

  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {

    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    });

    // Monitorar através de um Interval ao qual nos subscrevemos o valor das propriedades de status e estado.
    const acompanhamentoUpload = interval(1500);

    const continua = new Subject();

    continua.next(true);

    acompanhamentoUpload
      .pipe(takeUntil(continua)) // Continua até que continua === false
      .subscribe(() => {

        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = (( this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes ) * 100);
        this.porcentagemUpload = Math.round(this.porcentagemUpload);

        if (this.progressoService.status === 'concluido') {
          this.progressoPublicacao = 'concluido';

          // eyms
          this.atualizarTimeLine.emit('atualizar');

          continua.next(false);
        }
    });
  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (event.target as HTMLInputElement).files[0];
  }

}
