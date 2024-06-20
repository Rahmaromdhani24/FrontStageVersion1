import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { AvancementService } from '../Services/avancement.service';
@Component({
  selector: 'app-hiss',
  templateUrl: './hiss.component.html',
  styleUrls: ['./hiss.component.css']
})
export class HissComponent implements OnInit {
id : string ="" ; 
showLoader: boolean = true; // Contrôle l'affichage du chargement

  constructor(private ar : ActivatedRoute , public service : AvancementService){}

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    console.log("iddddddddddddddddd"+this.id)
    this.getAvancementsPersonnel() ; 
    setTimeout(() => {
      this.hideLoader();
    }, 3000); // Délai de 3 secondes (ajustez selon vos besoins)
  }
  hideLoader(): void {
    this.showLoader = false;
  }

getAvancementsPersonnel(){
  this.service.getAvancementPersonnel(this.id).subscribe(data => {
    this.service.AvancementsPersonnel = data;
    $(document).ready(function () {
      $('#example').DataTable();
    });
  });
}
transfomerDate(timestamp: number) :string {
  const dateObj = new Date(timestamp);
  const year = dateObj.getUTCFullYear();
  const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); // +1 car les mois vont de 0 à 11
  const day = ('0' + dateObj.getUTCDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
}