import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TemplateComponent } from './template/template.component';
import { TableauuComponent } from './tableauu/tableauu.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { AvEchelonComponent } from './av-echelon/av-echelon.component';
import { HistoriquesPersonnelComponent } from './historiques-personnel/historiques-personnel.component';
import { HissComponent } from './hiss/hiss.component';

const routes: Routes = [

  {path:"" , component:LoginAdminComponent },
  {path:"login" , component:LoginAdminComponent },
  {path:"accueil" , component:AccueilComponent },
  {path:"av" , component:AvEchelonComponent },
  {path:"historiques" , component:HistoriquesComponent },
  {path:"historiquesPersonnel/:id" , component:HissComponent },





  {path:"template" , component:TemplateComponent },
  {path:"bb" , component:TableauuComponent },





  {path:"" , redirectTo:"/login",pathMatch:'full'},
  {path:"**" , component:PageNotFoundComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
