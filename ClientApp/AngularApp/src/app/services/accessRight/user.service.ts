import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "src/app/models/accessRight/User";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.APIUrl + "/User";

  getAll():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  add(model: any): Observable<any> {
    
    return this.http.post(this.apiUrl, model, {
      reportProgress: true,
      observe: "events" //دنبال کردن و مشاهده کردن ایونت
    });
  }
}
