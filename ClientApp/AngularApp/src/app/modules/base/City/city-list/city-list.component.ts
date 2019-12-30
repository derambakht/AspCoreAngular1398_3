import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/base/city.service';
import { City } from 'src/app/models/base/City';
import { FadActionResult } from 'src/app/models/common/FadActionResult';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  result:FadActionResult<City> = new FadActionResult<City>(); 
  pages:Array<number>;
  page:number = 1;

  constructor(private cityService:CityService,
    private activeRoute:ActivatedRoute,
    private router:Router,
    private notificationService: NotificationsService) {}

    ngOnInit(){
       this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data) => {
            this.page = +this.activeRoute.snapshot.queryParams.page
            this.cityService.getAll(this.page).subscribe(data => {
              this.result = data;

              //تبدیل یه عدد به آرایه ای با طول آن عدد
              this.pages = Array(parseInt(this.result.pages.toString())).fill(0).map((x,i)=>i);
            })
        });

        if(this.activeRoute.snapshot.queryParams.page)
        {
          this.page = +this.activeRoute.snapshot.queryParams.page;
        }
      this.cityService.getAll(this.page).subscribe(data => {
        this.result = data;
        this.pages = Array(parseInt(this.result.pages.toString())).fill(0).map((x,i)=>i);1
      })
    }

    removeItem(id:number){
      if(window.confirm('در صورت حذف قابل بازیابی نمی باشد')) {
        this.cityService.remove(id).subscribe(q => {
          this.result.data = this.result.data.filter(q => q.id != id);
          this.notificationService.success("آیتم مورد نظر حذف شد");
        })
      }
    }
}
