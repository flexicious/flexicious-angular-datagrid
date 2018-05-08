import {Component} from '@angular/core';
import {EmployeeService} from './apis/employeeService';
import {DepartmentService} from './apis/departmentService';
import {StateService} from './apis/stateService';
import { SvgStaticService } from './apis/SvgStaticService';

declare var flexiciousNmsp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  constructor(private  EmployeeSrv: EmployeeService,
              private  DepartmentSrv: DepartmentService,
              private  StateSrv: StateService,
              private  SvgSrv: SvgStaticService) {

                window.setTimeout(() => {
                    const grid = document.getElementById('gridContainer')['component'];
                    alert('This is how you can access the grid outside an event handler' + grid.configuration);
                }, 2000);

                this.loadiTunesStyle = this.loadiTunesStyle.bind(this);
  }

  getLabel = (item, col) => {
    const itemIdx = col.getLevel().grid.getDataProvider().indexOf(item);
    const shape = itemIdx % 7 === 0 ? 'triangle' : itemIdx % 2 === 0 ? 'square' : 'circle';
    return this.SvgSrv.svgs[shape];
  }

  onItemRightClick(event) {
    const grid = event.target;
    grid.setSelectedItem(grid.currentCell.rowInfo.rowPositionInfo.rowData);
  }

  onGridCreationComplete(event) {

    var grid = event.target;
    var controller = event.target.delegate;

    controller.DepartmentSrv.list()
      .subscribe(function (data) {
        var filteredArray = flexiciousNmsp.UIUtils
          .filterArray(data, grid.createFilter(), grid, grid.getColumnLevel(), false);
        var stateCol = grid.getColumnByDataField('department.departmentId');
        stateCol.filterComboBoxLabelField = 'departmentName';
        stateCol.filterComboBoxDataField = 'departmentId';
        stateCol.filterComboBoxDataProvider = filteredArray;
        grid.rebuildFilter();
      });

    controller.StateSrv.list()
      .subscribe(function (data) {
        var data2 = [];
        data.forEach(function (a) {
          var t = {label: a, data: a}
          data2.push(t);
        });

        var filteredArray = flexiciousNmsp.UIUtils.filterArray(data2, grid.createFilter(), grid, grid.getColumnLevel(), false);
        var stateCol = grid.getColumnByDataField('stateCode');
        stateCol.filterComboBoxDataProvider = filteredArray;
        grid.rebuildFilter();
      });

    controller.EmployeeSrv.query({pageSize: grid.getPageSize()})
      .subscribe(function (data) {
        grid.setPreservePager(true);
        grid.setDataProvider(data.records);
        grid.setTotalRecords(data.totalRecords);
        grid.validateNow();
      });


    grid.validateNow();
  }

  filterPageSortChangeHandler(evt1) {
    var grid = evt1.target;
    var controller = evt1.target.delegate;

    controller.EmployeeSrv.query(evt1.filter)
      .subscribe(function (data) {
        grid.setPreservePager(true);
        grid.setDataProvider(data.records);
        grid.setTotalRecords(data.totalRecords);
        grid.validateNow();
      });
  }

  getDepartment(item) {
    return item && item.department ? item.department : ''; //labelFunction
  }

  getActive(item) {
    return item.isActive ? 'Yes' : 'No'; //labelFunction
  }

  gridOptions = {
    dataProvider: [],
    delegate: this,
    styles: flexiciousNmsp.UIUtils.getThemeById('redAndBlack').styles
  }

  loadiTunesStyle(event) {
    const grid = document.getElementById('gridContainer')['component'];
    const iPhoneStyles = flexiciousNmsp.UIUtils.getThemeById('iTunes').styles;

    for (const prop in iPhoneStyles) {
      if (prop) {
        flexiciousNmsp.UIUtils.checkSetterAndApply(grid, prop, iPhoneStyles[prop]);
      }
    }
    grid.rebuild();
  }
}
