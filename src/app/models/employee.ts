import {BaseModel} from "../apis/baseApi";

export class Employee implements BaseModel {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  stateCode: string;
  hireDate: string;
  annualSalary: number;
  isActive: boolean;
  department: any;

}
