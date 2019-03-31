import { Component, OnInit } from '@angular/core';

// const firebase = require('firebase/app');
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Neogrid';

  ngOnInit(): void {

    // *TODO Initialize Firebase with atributes
    const config = {
      apiKey: "AIzaSyA95IIcLb1GQR-9zOWWjGIMmiGlxmeBjQ4",
      authDomain: "app-neogrid-preto.firebaseapp.com",
      databaseURL: "https://app-neogrid-preto.firebaseio.com",
      projectId: "app-neogrid-preto",
      storageBucket: "app-neogrid-preto.appspot.com",
      messagingSenderId: "323635628213"
    };

    firebase.initializeApp(config);

  }
}
