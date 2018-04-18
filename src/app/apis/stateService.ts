import {BaseApiService} from "./baseApi";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {State} from "../models/state";

@Injectable()
export class StateService extends BaseApiService<State> {


  constructor(http: HttpClient) {
    super(http);
    this.url = '/States';
  }

}




