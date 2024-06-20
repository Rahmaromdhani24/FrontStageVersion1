import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { AvancementService } from '../Services/avancement.service';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-av-echelon',
  templateUrl: './av-echelon.component.html',
  styleUrls: ['./av-echelon.component.css']
})
export class AvEchelonComponent implements AfterViewInit, OnDestroy {

  private routerSubscription: Subscription;
  serverDate: Date | undefined;
  selectedDatee :string=""
  test : boolean=false ; 
  public constructor(private router: Router ,  public service :AvancementService , private http: HttpClient) { 
    // Subscribe to router events to handle page navigation
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveNavLink();
      }
    });
  }

  ngAfterViewInit(): void {
  this.getByDatePicker() ; 
  this.getAllAvancementsCeMois();
    this.initializeNavbarAnimation();
    $(window).on('resize', this.onWindowResize.bind(this));
    $(".navbar-toggler").on('click', this.onNavbarToggle.bind(this));
  }

  ngOnDestroy(): void {
    // Clean up to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    $(window).off('resize', this.onWindowResize);
    $(".navbar-toggler").off('click', this.onNavbarToggle);
  }

  private initializeNavbarAnimation(): void {
    const test = (): void => {
      const tabsNewAnim = $('#navbarSupportedContent');
      const selectorNewAnim = $('#navbarSupportedContent').find('li').length;
      const activeItemNewAnim = tabsNewAnim.find('.active');
      const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
      const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
      const itemPosNewAnimTop = activeItemNewAnim.position();
      const itemPosNewAnimLeft = activeItemNewAnim.position();
      $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
      $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        const activeWidthNewAnimHeight = $(this).innerHeight();
        const activeWidthNewAnimWidth = $(this).innerWidth();
        const itemPosNewAnimTop = $(this).position();
        const itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
          "top": itemPosNewAnimTop.top + "px",
          "left": itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
      });
    };

    $(document).ready(() => {
      setTimeout(test);
    });

    this.updateActiveNavLink();
  }

  private onWindowResize(): void {
    setTimeout(() => {
      this.initializeNavbarAnimation();
    }, 500);
  }

  private onNavbarToggle(): void {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(() => {
      this.initializeNavbarAnimation();
    });
  }

  private updateActiveNavLink(): void {
    const path = window.location.pathname.split("/").pop() || 'index.html';
    const target = $(`#navbarSupportedContent ul li a[href="${path}"]`);
    $('#navbarSupportedContent ul li').removeClass('active');
    target.parent().addClass('active');
  }
  deconnexion(){
    this.router.navigate(['/login']); 
  }
  getAllAvancements() {
    this.service.getAllAvancements().subscribe(data => {
      this.service.AvancementsData = data;
      $(document).ready(function () {
        $('#example1').DataTable();
      });
    });
  }

  getCurrentDateFormatted(): string {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Mois de 0 à 11, on ajoute 1 pour avoir de 1 à 12
    let day = date.getDate();
  
    if (day > 15) {
      // Si le jour est supérieur à 15, on doit afficher le premier jour du mois avant
      month += 1;
      if (month === 0) {
        // Si le mois devient 0, cela signifie qu'on est en janvier, donc on passe à décembre de l'année précédente
        month = 12; // Décembre
        year -= 1; // Année précédente
      }
    }
  
    // Formater le mois et le jour en chaînes avec padding
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = '01'; // Toujours le premier jour du mois
  console.log("date d'aujord'huiiii"+`${year}-${formattedMonth}-${formattedDay}`)
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  
  getAllAvancementsCeMois() {
    
    this.service.getAvDeCeMois(this.getCurrentDateFormatted()).subscribe(data => {
      this.service.AvancementsData = data;
      $(document).ready(function () {
        $('#example1').DataTable();
      });
    });
  }
   transformerDate(timestamp: number) :string {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear(); // Utiliser getFullYear() pour l'année locale
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Utiliser getMonth() pour le mois local
    const day = ('0' + dateObj.getDate()).slice(-2); // Utiliser getDate() pour le jour local
  
    return `${year}-${month}-${day}`;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    
    if (selectedDate) {
      this.test = true ; 
      const year = selectedDate.getFullYear();
      const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
      const day = ('0' + selectedDate.getDate()).slice(-2);
      const transformedDate = `${year}-${month}-${day}`;
      this.selectedDatee = transformedDate ;
    
      console.log("Date choisie transformée : " + transformedDate);
      this.getByDatePicker() ; 

    } else {
      console.log("Aucune date sélectionnée.");
      // logique pour gérer le cas où aucune date n'est sélectionnée
    }
  }
  getByDatePicker(){
    this.service.getAvDeCeMois(this.selectedDatee).subscribe(data => {
      this.service.AvancementsData = data;
      $(document).ready(function () {
        $('#example2').DataTable();
      });
    });
  }
  
  
}
