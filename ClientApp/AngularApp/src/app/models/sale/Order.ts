import { OrderDetails } from './OrderDetails';

export class Order {
    id:number;
    orderNumber:number;
    title:string;
    orderDetailsList:OrderDetails[] = [];
}