///**
// * Created by flexicious on 3/10/16.
// */
import {  Directive, ElementRef, Input } from '@angular/core';

declare var flexiciousNmsp:any;

@Directive({
    selector: '[fd-grid]',
})
export class TreeGridDirective {

    @Input() model;

    constructor(public el:ElementRef) {
    }

    isXiName(str) {
        return str.startsWith('xi');
    }

    getNameFromXiName(str) {
        return str
            .toLowerCase()
            .replace('xi', '')
            .replace(/-\w/g, function (r) {
                return r.charAt(1).toUpperCase()
            });
    }

    getAllNodeAttributes(node) {
        var allAttrs = [];
        for (var i = 0; i < node.attributes.length; i++) {
            var key = node.attributes.item(i);
            if (this.isXiName(key.name)) {
                allAttrs.push(this.getNameFromXiName(key.name) + '="' + key.value + '"')
            }
        }
        return allAttrs.join(' ')
    }

    build(node, nodeName:String = "") {
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
    }

    ngOnInit() {
        this.model.configuration = this.build(this.el.nativeElement, 'grid');
        var grid = new flexiciousNmsp.FlexDataGrid(this.el.nativeElement, this.model)
        this.model.grid = grid;
    }
}

