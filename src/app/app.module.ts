import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AccueilComponent } from './accueil/accueil.component';
import { TemplateComponent } from './template/template.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TableauuComponent } from './tableauu/tableauu.component';
import { AvEchelonComponent } from './av-echelon/av-echelon.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HistoriquesPersonnelComponent } from './historiques-personnel/historiques-personnel.component';
import { HissComponent } from './hiss/hiss.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginAdminComponent,
    AccueilComponent,
    TemplateComponent,
    PageNotFoundComponent,
    TableauuComponent,
    AvEchelonComponent,
    HistoriquesComponent,
    HistoriquesPersonnelComponent,
    HissComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  ,
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
