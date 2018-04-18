"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///**
// * Created by flexicious on 3/10/16.
// */
var core_1 = require('@angular/core');
var TreeGridDirective = (function () {
    function TreeGridDirective(el) {
        this.el = el;
    }
    TreeGridDirective.prototype.isXiName = function (str) {
        return str.startsWith('xi');
    };
    TreeGridDirective.prototype.getNameFromXiName = function (str) {
        return str
            .toLowerCase()
            .replace('xi', '')
            .replace(/-\w/g, function (r) {
            return r.charAt(1).toUpperCase();
        });
    };
    TreeGridDirective.prototype.getAllNodeAttributes = function (node) {
        var allAttrs = [];
        for (var i = 0; i < node.attributes.length; i++) {
            var key = node.attributes.item(i);
            if (this.isXiName(key.name)) {
                allAttrs.push(this.getNameFromXiName(key.name) + '="' + key.value + '"');
            }
        }
        return allAttrs.join(' ');
    };
    TreeGridDirective.prototype.build = function (node, nodeName) {
        if (nodeName === void 0) { nodeName = ""; }
        nodeName = nodeName || this.getNameFromXiName(node.nodeName);
        var root = '<' + nodeName + ' ' +
            this.getAllNodeAttributes(node) +
            ' >';
        var children = '';
        if (node.children.length > 0) {
            for (var i = 0; i < node.children.length; i++) {
                children += this.build(node.children[i]);
            }
        }
        var close = '</' + nodeName + '>';
        return root + children + close;
    };
    TreeGridDirective.prototype.ngOnInit = function () {
        this.model.configuration = this.build(this.el.nativeElement, 'grid');
        var grid = new flexiciousNmsp.FlexDataGrid(this.el.nativeElement, this.model);
        this.model.grid = grid;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeGridDirective.prototype, "model", void 0);
    TreeGridDirective = __decorate([
        core_1.Directive({
            selector: '[fd-grid]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeGridDirective);
    return TreeGridDirective;
}());
exports.TreeGridDirective = TreeGridDirective;
//# sourceMappingURL=treeGrid.directive.js.map