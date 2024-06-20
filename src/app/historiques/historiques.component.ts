import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrls: ['./historiques.component.css']
})
export class HistoriquesComponent implements OnInit{
  showLoader: boolean = true; // Contrôle l'affichage du chargement

  constructor() { }

  ngOnInit(): void {
    // Appel à une fonction pour masquer le chargement après quelques secondes
    setTimeout(() => {
      this.hideLoader();
    }, 3000); // Délai de 3 secondes (ajustez selon vos besoins)
  }

  hideLoader(): void {
    this.showLoader = false;
  }

}