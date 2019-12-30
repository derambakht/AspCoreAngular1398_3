import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/base/City';
import { CityService } from 'src/app/services/base/city.service';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvinceService } from 'src/app/services/base/province.service';
import { Combo } from 'src/app/models/common/Combo';

@Component({
  selector: 'app-city-info',
  templateUrl: './city-info.component.html',
  styleUrls: ['./city-info.component.css']
})
export class CityInfoComponent implements OnInit {
  city:City = new City();
  provinces:Combo[];
  id:number = null;
  editMode:boolean = false;
  page:number = 1;
  constructor(private cityService:CityService, 
    private provinceService: ProvinceService,
    private notification: NotificationsService,
    private router: Router, 
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    //نحوه خواندن query strings
    if(this.activeRoute.snapshot.queryParams.page)
    {
      this.page = this.activeRoute.snapshot.queryParams.page;
    }

      //نحوه خواندن parameters
      // const id = +this.activeRoute.snapshot.params.id;

    this.provinceService.getForCombo().subscribe(result => {
      this.provinces = result;
      console.log(this.provinces);
    });

    if(this.activeRoute.snapshot.params.id){
      this.id = +this.activeRoute.snapshot.params.id;
      this.cityService.get(this.id).subscribe(result => {
        this.editMode = true;
        this.city = result;
      })
    } 
  }

  saveData(){
    if(this.editMode)
    {
      //update
      this.city.id = this.id;
      this.cityService.edit(this.city).subscribe(response => {
        this.notification.success("اطلاعات بروزرسانی شد");
        this.router.navigate(["/base/cities"], { queryParams: { page: this.page } });
      });
    } else {
      //insert
      this.cityService.add(this.city).subscribe(response => {
        this.notification.success("شهر جدید ثبت شد");
        this.router.navigate(["/base/cities"]);
      });
    }
    
  }
}
