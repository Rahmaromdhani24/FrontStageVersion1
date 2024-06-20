import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvancementService {

  AvancementsData :any=[];
  AvancementsPersonnel : any=[] ; 
  constructor(private http: HttpClient) { }

  private urlGetAllAvancements = "http://localhost:8281/api/avancement/all" ;
  getAllAvancements(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllAvancements}`)
  }

  private urlGetAvancementByMle = 'http://localhost:8281/api/avancement';
  getAvancementPersonnel(mle : string): Observable<any> {
  return this.http.get<any>(`${this.urlGetAvancementByMle}/${mle}`);}

  private urlGetAvancementCeMois = 'http://localhost:8281/api/avancement/avancementsCeMois';
  getAvDeCeMois(date : string): Observable<any> {
    const params = new HttpParams().set('dateString' , date) ; 
    return this.http.get<any>(`${this.urlGetAvancementCeMois}` , {params});}
  
}
