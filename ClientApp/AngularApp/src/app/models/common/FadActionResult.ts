export class FadActionResult<T>
{
    isSuccess:boolean
    data:Array<T>
    totalCount:number
    currentPage:number
    message:string
    pages:number
}