import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-subtitulo',
  templateUrl: './subtitulo.component.html',
  styleUrls: ['./subtitulo.component.scss']
})
export class SubtituloComponent implements OnInit {

  nombre:string = ""

  constructor() { }

  ngOnInit(): void {
    this.nombre = `${Math.random()}`
    console.log(this.nombre);
    
  }

}
