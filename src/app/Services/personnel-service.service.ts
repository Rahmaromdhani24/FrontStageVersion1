import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelServiceService {
  PersonnelsData :any=[];
  constructor(private http: HttpClient) { }

  private urlGetAllPersonnels = "http://localhost:8281/api/personnel/all" ;
  getAllPersonnels(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllPersonnels}`)
  }

  private urlGetPersonnelByMle = 'http://localhost:8281/api/personnel';
  getPersonnel(id : number): Observable<number> {
  return this.http.get<number>(`${this.urlGetPersonnelByMle}/${id}`);}

  private urlGetQualificationDePersonnel = 'http://localhost:8281/api/personnel/poste';
  getQualificationDePersonnel(mle : string): Observable<string> {
    return this.http.get<string>(`${this.urlGetQualificationDePersonnel}/${mle}`);}
  
}
