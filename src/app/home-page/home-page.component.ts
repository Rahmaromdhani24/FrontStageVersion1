import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,  // Activer l'autoplay
    autoplayTimeout: 10000,  // Temps en millisecondes entre chaque slide (10s)
    autoplayHoverPause: true,  // Pause l'autoplay quand on survole le carousel
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  }
}