import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = "https://jsonplaceholder.ir/";

  constructor(private _http: HttpClient) { }

  getAllPost() : Observable<any> {
    const postAPI = this.apiUrl + "posts"; 

    return this._http.get<[]>(
      postAPI, { observe: 'response' });
  }
}
