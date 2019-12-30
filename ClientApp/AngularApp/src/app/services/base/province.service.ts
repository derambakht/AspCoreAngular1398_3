import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from 'src/app/models/common/Combo';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  constructor(private http: HttpClient) { }
  apiUrl = environment.APIUrl + "/province";
  
  getForCombo(): Observable<Combo[]>{
    return this.http.get<Combo[]>(this.apiUrl + "/GetForCombo");
  }

}
