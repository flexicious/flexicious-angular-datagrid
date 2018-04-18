import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';


import {AppComponent} from './app.component';
import {TreeGridDirective} from "./_directives/treeGrid.directive";
import {EmployeeService} from "./apis/employeeService";
import {DepartmentService} from "./apis/departmentService";
import {StateService} from "./apis/stateService";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    TreeGridDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [

    EmployeeService,
    DepartmentService,
    StateService
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
