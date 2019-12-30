export class City {
    id:number;
    cityName:string;
    provinceId:number;
    body:string;
    sortOrder:number;
    provinceName:string;
}


export class City2 {
    constructor(
       public id:number,
       public cityName:string,
       public provinceId:number,
       public body:string,
       public sortOrder:number,
       public provinceName:string,
    ) {

    }
   
}