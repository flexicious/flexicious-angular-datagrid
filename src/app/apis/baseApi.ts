/**
 * Created by iAboShosha on 7/13/17.
 */
import {HttpClient} from "@angular/common/http";


export interface BaseModel {
  id: string;
}

export interface result<T extends BaseModel> {
  records: T[];
  totalRecords: number
}

export class BaseApiService<T extends BaseModel> {
  public baseUrl = '/api';
  public url = "/";

  constructor(protected http: HttpClient) {

  }


  list() {
    return this.http
      .get<T>(this.baseUrl + this.url)
  }

  get(id: string) {
    return this.http
      .get<T>(this.baseUrl + this.url + `/${id}`)
  }

  query(query: any) {

    var args = query.filterExpressions;
    if (args) {
      for (var i in args) {
        delete args[i].filterControl; //we dont want to send a UIComponent to the server - not needed (and cannot serialize!)
      }
    }

    var filter = { //just send the entire filter object for the server to convert to SQL Statement.
      filterDescrption: query.filterDescrption,
      arguments: query.filterExpressions || [],
      pageIndex: query.pageIndex || 0,
      pageSize: query.pageSize || 25,
      sorts: query.sorts
    };


    return this.http
      .post<result<T>>(this.baseUrl + this.url, filter)
  }


}
