import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { UserMenuService } from 'src/app/services/accessRight/user-menu.service';

export interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: MenuItem[] = [
  {
    name: 'داشبورد',
    path: '/'
  },
  {
    name: 'اطلاعات پایه',
    path: '',
    children: [
      { name: 'لیست شهرها', path: '/base' },
      { name: 'استان / شهر', path: '/base/provinces' },
      { name: 'پارامترهای سیستمی', path: '/base/params' },
    ]
  }, {
    name: 'مدیریت فروش',
    path: '',
    children: [
      {
        name: 'لیست محصولات',
        path: '/sale'
      }, {
        name: 'افزودن محصول جدید',
        path: '/sale/products/add'
      },
    ]
  },
  {
    name: 'مدیریت فروش',
    path: '',
    children: [
      {
        name: 'لیست مشتریان',
        path: '/sale'
      }
    ]
  },
  {
    name: 'حسابداری',
    path: '',
    children: [
      {
        name: 'لیست اسناد',
        path: '/vouchers'
      },
      {
        name: 'افزودن سند',
        path: '/vouchers/add'
      },
      {
        name: 'افزودن سند - 2',
        path: '/vouchers/addReactive'
      }
    ]
  },
  {
    name: 'فرم داینامیک',
    path: '/dynamicform'
  },
];


@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  constructor(private userMenuService : UserMenuService) {
    //this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    this.userMenuService.getUserMenu().subscribe(result => {
      console.log(result);
      this.dataSource.data = result;
      this.userMenuService.userMenuItems = result;
    })

    //this.dataSource.data = this.userMenuService.userMenuItems;
  }

  private _transformer = (node: MenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      path: node.path,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;



}
