import { Component ,  AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { Personnel } from '../Models/Personnel';

@Component({
  selector: 'app-tableauu',
  templateUrl: './tableauu.component.html',
  styleUrls: ['./tableauu.component.css']
})
export class TableauuComponent implements OnInit  {
  personnels: Personnel[] = []; // Assurez-vous que personnels est typé en tant que tableau de Personnel

  constructor(private router: Router, public service: PersonnelServiceService) { }

  ngOnInit(): void {
    this.getAllPersonnels();
  }

  getAllPersonnels() {
    this.service.getAllPersonnels().subscribe(data => {
      this.service.PersonnelsData = data;
      this.personnels = data; // Assignez les données à personnels pour l'affichage dans le tableau
      $(document).ready(function () {
        $('#example').DataTable();
      });
    });
  }
}

