import { Component } from '@angular/core';

@Component({
  selector: 'app-arbitros-pages',
  imports: [],
  templateUrl: './arbitros-pages.html',
  styleUrls: ['./arbitros-pages.scss'],
})
export class ArbitrosPagesComponent {
  arbitros = [
    { nombre: 'Juan Martinez', pais: 'España', añosExperiencia: 1 },
    { nombre: 'Mark Clattenburg', pais: 'Inglaterra', añosExperiencia: 2 },
    { nombre: 'Pierluigi Collina', pais: 'Italia', añosExperiencia: 3 },
  ];

}
