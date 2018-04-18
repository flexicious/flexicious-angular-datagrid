import {BaseApiService} from "./baseApi";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Department} from "../models/department";

@Injectable()
export class DepartmentService extends BaseApiService<Department> {


  constructor(http: HttpClient) {
    super(http);
    this.url = '/Departments';
  }

}




