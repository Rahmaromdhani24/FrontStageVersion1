import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { PersonnelServiceService } from '../Services/personnel-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit, OnDestroy {

  private routerSubscription: Subscription;
 poste : string=""
 loading: boolean = true; // Variable pour gérer l'état de chargement
  public constructor(private router: Router ,  public service : PersonnelServiceService) { 
    // Subscribe to router events to handle page navigation
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveNavLink();
      }
    });
  }

  ngAfterViewInit(): void {
   
    console.log("date d'anniversaire " + this.getQualificationPersonnel("192"))
    this.getAllPersonnels() ; 
    console.log("date d'anniversaire " + this.getQualificationPersonnel("100"))
    this.initializeNavbarAnimation();
    $(window).on('resize', this.onWindowResize.bind(this));
    $(".navbar-toggler").on('click', this.onNavbarToggle.bind(this));
    const loaderElement = document.getElementById('loader');
  if (loaderElement) {
    setTimeout(() => {
      loaderElement.style.display = 'none';
    }, 3000);
  } else {
    console.warn('Element with ID "loader" not found.');
  }
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
  getAllPersonnels() {
    this.service.getAllPersonnels().subscribe(data => {
      this.loading = false; // Marquer le chargement comme terminé
      this.service.PersonnelsData = data;
      $(document).ready(function () {
        $('#example').DataTable();
      });
    });
  }



  getQualificationPersonnel(mle: string): string {
      this.service.getQualificationDePersonnel(mle).subscribe(data=>{
        this.poste=data;})
      return  this.poste; 
    } 

    transfomerDate(timestamp: number) :string {
      const dateObj = new Date(timestamp);
      const year = dateObj.getUTCFullYear();
      const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); // +1 car les mois vont de 0 à 11
      const day = ('0' + dateObj.getUTCDate()).slice(-2);
    
      return `${year}-${month}-${day}`;
    }
    parseDateString(dateString: string): Date | null {
      // Vérifiez si la chaîne est dans le format attendu
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateString)) {
        console.error('Date string format is incorrect');
        return null;
      }
    
      // Divisez la chaîne en parties
      const [year, day, month] = dateString.split('-').map(part => parseInt(part, 10));
    
      // Les mois en JavaScript sont de 0 (janvier) à 11 (décembre), il faut donc ajuster
      const date = new Date(year, month - 1, day);
    
      // Vérifiez que la date est valide
      if (isNaN(date.getTime())) {
        console.error('Invalid date');
        return null;
      }
    
      return date;
    }
    calculateAge(dateOfBirthString: string): number {
      const today = new Date();
      const birthDate = new Date(dateOfBirthString);
  
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      // Si le mois actuel est antérieur au mois de naissance ou si c'est le même mois mais le jour actuel est antérieur au jour de naissance
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    }
  
}
