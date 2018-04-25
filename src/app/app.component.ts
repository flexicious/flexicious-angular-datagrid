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
  }

  getLabel = (item, col) => {
    const itemIdx = col.getLevel().grid.getDataProvider().indexOf(item);
    const shape = itemIdx % 7 === 0 ? 'triangle' : itemIdx % 2 === 0 ? 'square' : 'circle';
    return this.SvgSrv.svgs[shape];
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
  };

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
    delegate: this
  }


}

/**
  * Flexicious
  * Copyright 2011, Flexicious LLC
  */
(function (window) {
  'use strict';
  let ImageRenderer;
  const flxConstants = flexiciousNmsp.Constants;
  /**
  * A ImageRenderer is a custom item renderer, that defines how to use custom cells with logic that you can control
  * @constructor
  * @namespace flexiciousNmsp
  * @extends UIComponent
  */
  ImageRenderer = function () {
    // make sure to call constructor
    flexiciousNmsp.UIComponent.apply(this, ['div']); // second parameter is the tag name for the dom element.
    /**
    * This is a getter/setter for the data property. When the cell is created, it belongs to a row
    * The data property points to the item in the grids dataprovider that is being rendered by this cell.
    * @type {*}
    */
    this.data = null;
    // the add event listener will basically proxy all DomEvents to your code to handle.
    this.addEventListener(this, flxConstants.EVENT_CLICK, this.onClickHandler);
    this.addEventListener(this, flxConstants.EVENT_MOUSE_OVER, this.onHover);
    this.addEventListener(this, flxConstants.EVENT_MOUSE_OUT, this.onMouseOut);

    this.svgSrv = new flexiciousNmsp.ItemRenderers_ImageRenderer.SvgService();
  };
  flexiciousNmsp.ItemRenderers_ImageRenderer = ImageRenderer; // add to name space
  ImageRenderer.SvgService = SvgStaticService;
  ImageRenderer.prototype = new flexiciousNmsp.UIComponent(); // setup hierarchy
  ImageRenderer.prototype.typeName = ImageRenderer.typeName = 'ImageRenderer'; // for quick inspection
  ImageRenderer.prototype.getClassNames = function () {
    // this is a mechanism to replicate the 'is' and 'as' keywords of most other OO programming languages
    return ['ImageRenderer', 'UIComponent'];
  };

  ImageRenderer.prototype.onKeyDown = function (evt) {
    evt.triggerEvent.stopImmediatePropagation();
  };
  ImageRenderer.prototype.setWidth = function (w) {
    flexiciousNmsp.UIComponent.prototype.setWidth.apply(this, [w]);
  };
  /**
  * This is important, because the grid looks for a 'setData' method on the renderer.
  * In here, we intercept the call to setData, and inject our logic to populate the text input.
  * @param val
  */
  ImageRenderer.prototype.setData = function (val) {
    flexiciousNmsp.UIComponent.prototype.setData.apply(this, [val]);
    const cell = this.parent;
    const col = cell.getColumn();
    const itemIdx = col.getLevel().grid.getDataProvider().indexOf(val);
    const shape = itemIdx % 7 === 0 ? 'triangle' : itemIdx % 2 === 0 ? 'square' : 'circle';
    this.domElement.innerHTML = this.svgSrv.svgs[shape];
    this.domElement.style.opacity = 0.4;
    this.domElement.style.left = (parseFloat(this.domElement.style.left) + 2) + 'px';
    this.domElement.style.top = (parseFloat(this.domElement.style.top) + 2) + 'px';
  };
  /**
  * This event is dispatched when the user clicks on the icon. The event is actually a flexicious event, and has a trigger event
  * property that points back to the original domEvent.
  * @param event
  */
  ImageRenderer.prototype.onClickHandler = function (evt) {
    const cell = this.parent;
    const col = cell.getColumn();
    const itemIdx = col.getLevel().grid.getDataProvider().indexOf(this.data);
    const shape = itemIdx % 7 === 0 ? 'triangle' : itemIdx % 2 === 0 ? 'square' : 'circle';
    alert(shape);
  };

  ImageRenderer.prototype.onHover = function (evt) {
    this.domElement.style.opacity = 1;
    this.domElement.style.zoom = 1.2;
    this.domElement.style.left = (parseFloat(this.domElement.style.left) - 2) + 'px';
    this.domElement.style.top = (parseFloat(this.domElement.style.top) - 2) + 'px';
  };

  ImageRenderer.prototype.onMouseOut = function (evt) {
    this.domElement.style.opacity = 0.4;
    this.domElement.style.zoom = 1;
    this.domElement.style.left = (parseFloat(this.domElement.style.left) + 2) + 'px';
    this.domElement.style.top = (parseFloat(this.domElement.style.top) + 2) + 'px';
  };
  // tslint:disable-next-line:max-line-length
  // This sets  the inner html, and grid will try to set it. Since we are an input field, IE 8 will complain. So we ignore it since we dont need it anyway.
  ImageRenderer.prototype.setText = function (val) {

  };

}(window));
