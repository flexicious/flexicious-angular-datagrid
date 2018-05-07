import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';


import {AppComponent} from './app.component';
import {TreeGridDirective} from "./_directives/treeGrid.directive";
import {EmployeeService} from "./apis/employeeService";
import {DepartmentService} from "./apis/departmentService";
import {StateService} from "./apis/stateService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { SvgStaticService } from './apis/SvgStaticService';
import ImageRenderer from './ImageRenderer';
import DummyThemes from './dummy.theme';


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
    StateService,
    SvgStaticService,
    ImageRenderer,
    DummyThemes
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
