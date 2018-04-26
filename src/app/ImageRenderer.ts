import { SvgStaticService } from './apis/SvgStaticService';

declare var flexiciousNmsp: any;

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

        this.popup = new flexiciousNmsp.UIComponent('div');
        this.popup.setWidth(120);
        this.popup.setHeight(30);

        this.popup.domElement.style.background = '#666666';
        this.popup.domElement.style.color = '#fff';
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

        // tslint:disable-next-line:max-line-length
        this.popup.domElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%">' + this.svgSrv.svgs[shape] + '<span>&nbsp;&nbsp;&nbsp;' + shape + '</span></div>';
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

        const cell = this.parent;
        const col = cell.getColumn();

        cell.level.grid.showTooltip(cell, this.popup, cell.rowInfo.getData());
        this.popup.domElement.style.top = (parseFloat(this.popup.domElement.style.top) - cell.height) + 'px';
    };

    ImageRenderer.prototype.onMouseOut = function (evt) {
        this.domElement.style.opacity = 0.4;
        this.domElement.style.zoom = 1;
        this.domElement.style.left = (parseFloat(this.domElement.style.left) + 2) + 'px';
        this.domElement.style.top = (parseFloat(this.domElement.style.top) + 2) + 'px';

        this.parent.level.grid.hideTooltip();
    };
    // tslint:disable-next-line:max-line-length
    // This sets  the inner html, and grid will try to set it. Since we are an input field, IE 8 will complain. So we ignore it since we dont need it anyway.
    ImageRenderer.prototype.setText = function (val) {

    };

}(window));

export default flexiciousNmsp.ItemRenderers_ImageRenderer;
