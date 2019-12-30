import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private uiLoader:NgxUiLoaderService) { }

  ngOnInit() {
  }

  title = "Product List";
  code:number = 123;
  body:string = "test body for Product List";
  version:number;

  setTitle(){
    this.uiLoader.start();
    this.title = "set New Title";
    setTimeout(() => {
      this.uiLoader.stop();
    }, 2000);
  }

}
