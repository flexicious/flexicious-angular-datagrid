import {BaseApiService} from "./baseApi";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../models/employee";

@Injectable()
export class EmployeeService extends BaseApiService<Employee> {

  constructor(http: HttpClient) {
    super(http);
    this.url = '/Employee';
  }

}




