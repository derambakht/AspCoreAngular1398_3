export class User{
    constructor(_id, _firstName, _lastName, _nationalCode, _grade,_salary) {
        this.id = _id;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.nationalCode = _nationalCode;
        this.grade = _grade;
        this.salary = _salary;

    }
    id:number
    firstName:string
    lastName:string
    nationalCode:string
    grade:number
    salary:number
}