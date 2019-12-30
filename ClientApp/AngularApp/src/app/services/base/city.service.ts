import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/base/City';
import { FadActionResult } from 'src/app/models/common/FadActionResult';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CityService {

  // apiUrl = 'http://localhost:25565/api/city'
   apiUrl = environment.APIUrl + `/city`;

  constructor(private http: HttpClient) { }

  getAll(page:number = 1): Observable<FadActionResult<City>>{
    return this.http.get<FadActionResult<City>>(this.apiUrl + `?page=${page}`);
  }

  get(id:number):Observable<City> {
    return this.http.get<City>(this.apiUrl + `/${id}`);
  }

  add(model:City): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, model, {headers});
  }

  edit(model:City): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + `/${model.id}`, model, {headers});
  }

  remove(id:number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `/${id}`);
  }
}
