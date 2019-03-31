import { Component, OnInit } from '@angular/core';
import { BdService } from './../bd.service';

@Component({
  selector: 'app-home-analista',
  templateUrl: './home-analista.component.html',
  styleUrls: ['./home-analista.component.css']
})
export class HomeAnalistaComponent implements OnInit {

  constructor(private bdService: BdService) {
    
   }

  ngOnInit() {

    this.atualizaTicketsSuporte();
  }

  public atualizaTicketsSuporte():void{

    this.bdService.consultaTicketSuporte();

  }
}
