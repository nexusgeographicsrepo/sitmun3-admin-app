import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/tree";
import * as i2 from "@angular/cdk/drag-drop";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/icon";
function DataTreeComponent_mat_tree_node_1_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 8);
    i0.ɵɵtext(1, " folder ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("aria-label", node_r2.type + "icon");
} }
function DataTreeComponent_mat_tree_node_1_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_1_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const node_r2 = i0.ɵɵnextContext().$implicit; const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.onButtonClicked(node_r2.id, "newFolder"); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "create_new_folder");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function DataTreeComponent_mat_tree_node_1_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_1_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const node_r2 = i0.ɵɵnextContext().$implicit; const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.onButtonClicked(node_r2.id, "newNode"); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "playlist_add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function DataTreeComponent_mat_tree_node_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-tree-node", 3);
    i0.ɵɵlistener("mouseenter", function DataTreeComponent_mat_tree_node_1_Template_mat_tree_node_mouseenter_0_listener() { i0.ɵɵrestoreView(_r14); const node_r2 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.dragHover(node_r2); })("mouseleave", function DataTreeComponent_mat_tree_node_1_Template_mat_tree_node_mouseleave_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.dragHoverEnd(); })("cdkDragStarted", function DataTreeComponent_mat_tree_node_1_Template_mat_tree_node_cdkDragStarted_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.dragStart(); })("cdkDragReleased", function DataTreeComponent_mat_tree_node_1_Template_mat_tree_node_cdkDragReleased_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.dragEnd(); });
    i0.ɵɵelement(1, "button", 4);
    i0.ɵɵtemplate(2, DataTreeComponent_mat_tree_node_1_mat_icon_2_Template, 2, 1, "mat-icon", 5);
    i0.ɵɵtext(3);
    i0.ɵɵtemplate(4, DataTreeComponent_mat_tree_node_1_button_4_Template, 3, 0, "button", 6);
    i0.ɵɵtemplate(5, DataTreeComponent_mat_tree_node_1_button_5_Template, 3, 0, "button", 6);
    i0.ɵɵelementStart(6, "button", 7);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_1_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r14); const node_r2 = ctx.$implicit; const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.onButtonClicked(node_r2.id, "edit"); });
    i0.ɵɵelementStart(7, "mat-icon");
    i0.ɵɵtext(8, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r2 = ctx.$implicit;
    i0.ɵɵproperty("cdkDragData", node_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", node_r2.type === "folder");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", node_r2.name, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r2.type === "folder");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r2.type === "folder");
} }
function DataTreeComponent_mat_tree_node_2_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_2_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24); const node_r19 = i0.ɵɵnextContext().$implicit; const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.onButtonClicked(node_r19.id, "newFolder"); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "create_new_folder");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function DataTreeComponent_mat_tree_node_2_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_2_button_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r27); const node_r19 = i0.ɵɵnextContext().$implicit; const ctx_r25 = i0.ɵɵnextContext(); return ctx_r25.onButtonClicked(node_r19.id, "newNode"); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "playlist_add");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function DataTreeComponent_mat_tree_node_2_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-tree-node", 9);
    i0.ɵɵlistener("mouseenter", function DataTreeComponent_mat_tree_node_2_Template_mat_tree_node_mouseenter_0_listener() { i0.ɵɵrestoreView(_r29); const node_r19 = ctx.$implicit; const ctx_r28 = i0.ɵɵnextContext(); return ctx_r28.dragHover(node_r19); })("mouseleave", function DataTreeComponent_mat_tree_node_2_Template_mat_tree_node_mouseleave_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r30 = i0.ɵɵnextContext(); return ctx_r30.dragHoverEnd(); })("cdkDragStarted", function DataTreeComponent_mat_tree_node_2_Template_mat_tree_node_cdkDragStarted_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r31 = i0.ɵɵnextContext(); return ctx_r31.dragStart(); })("cdkDragReleased", function DataTreeComponent_mat_tree_node_2_Template_mat_tree_node_cdkDragReleased_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.dragEnd(); });
    i0.ɵɵelementStart(1, "button", 10);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r29); const node_r19 = ctx.$implicit; const ctx_r33 = i0.ɵɵnextContext(); return ctx_r33.expansionModel.toggle(node_r19.id); });
    i0.ɵɵelementStart(2, "mat-icon", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-icon", 8);
    i0.ɵɵtext(5, " folder ");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, DataTreeComponent_mat_tree_node_2_button_7_Template, 3, 0, "button", 6);
    i0.ɵɵtemplate(8, DataTreeComponent_mat_tree_node_2_button_8_Template, 3, 0, "button", 6);
    i0.ɵɵelementStart(9, "button", 7);
    i0.ɵɵlistener("click", function DataTreeComponent_mat_tree_node_2_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r29); const node_r19 = ctx.$implicit; const ctx_r34 = i0.ɵɵnextContext(); return ctx_r34.onButtonClicked(node_r19.id, "edit"); });
    i0.ɵɵelementStart(10, "mat-icon");
    i0.ɵɵtext(11, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r19 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cdkDragData", node_r19);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("aria-label", "toggle " + node_r19.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.treeControl.isExpanded(node_r19) ? "expand_more" : "chevron_right", " ");
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("aria-label", node_r19.type + "icon");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", node_r19.name, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r19.type === "folder");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", node_r19.type === "folder");
} }
/**
 * File node data with nested structure.
 * Each node has a name, and a type or a list of children.
 */
export class FileNode {
}
/** Flat node with expandable and level information */
export class FileFlatNode {
    constructor(expandable, name, level, type, id) {
        this.expandable = expandable;
        this.name = name;
        this.level = level;
        this.type = type;
        this.id = id;
    }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has name and type.
 * For a directory, it has name and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class FileDatabase {
    constructor() {
        this.dataChange = new BehaviorSubject([]);
    }
    get data() { return this.dataChange.value; }
    initialize(dataObj) {
        // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
        //     file node as children.
        const data = this.buildFileTree(dataObj, 0);
        // Notify the change.
        this.dataChange.next(data);
    }
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    buildFileTree(arrayTreeNodes, level, parentId = '0') {
        var map = {};
        arrayTreeNodes.forEach((treeNode) => {
            var obj = treeNode;
            obj.children = [];
            obj.type = (treeNode.isFolder) ? "folder" : "node";
            if (!map[obj.id]) {
                map[obj.id] = obj;
            }
            else {
                let previousChildren = map[obj.id].children;
                map[obj.id] = obj;
                map[obj.id].children = previousChildren;
            }
            var parent = obj.parent || 'root';
            if (!map[parent]) {
                map[parent] = {
                    children: []
                };
            }
            map[parent].children.push(obj);
        });
        map['root'].type = 'folder';
        map['root'].name = 'Root';
        map['root'].isFolder = true;
        return map['root'];
    }
}
/** @nocollapse */ FileDatabase.ɵfac = function FileDatabase_Factory(t) { return new (t || FileDatabase)(); };
/** @nocollapse */ FileDatabase.ɵprov = i0.ɵɵdefineInjectable({ token: FileDatabase, factory: FileDatabase.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FileDatabase, [{
        type: Injectable
    }], function () { return []; }, null); })();
/**
 * @title Tree with flat nodes
 */
export class DataTreeComponent {
    constructor(database) {
        this.database = database;
        // expansion model tracks expansion state
        this.expansionModel = new SelectionModel(true);
        this.dragging = false;
        this.expandDelay = 1000;
        this.validateDrop = false;
        this.transformer = (node, level) => {
            if (node.children.length != 0) {
                return new FileFlatNode(!!node.children, node.name, level, node.type, node.id);
            }
            else {
                return new FileFlatNode(!!undefined, node.name, level, node.type, node.id);
            }
        };
        this._getLevel = (node) => node.level;
        this._isExpandable = (node) => node.expandable;
        this._getChildren = (node) => observableOf(node.children);
        this.hasChild = (_, _nodeData) => _nodeData.expandable;
        this.emitNode = new EventEmitter();
        this.createNode = new EventEmitter();
        this.createFolder = new EventEmitter();
        this.emitAllNodes = new EventEmitter();
        this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
        this.treeControl = new FlatTreeControl(this._getLevel, this._isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }
    ngOnInit() {
        if (this.eventNodeUpdatedSubscription) {
            this.eventNodeUpdatedSubscription.subscribe((node) => {
                this.updateNode(node);
            });
        }
        if (this.eventCreateNodeSubscription) {
            this.eventCreateNodeSubscription.subscribe((node) => {
                if (node.isFolder)
                    this.createNewFolder(node);
                else
                    this.createNewNode(node);
            });
        }
        if (this.eventGetAllRowsSubscription) {
            this._eventGetAllRowsSubscription = this.eventGetAllRowsSubscription.subscribe(() => {
                this.emitAllRows();
            });
        }
        this.getAll()
            .subscribe((items) => {
            this.treeData = items;
            this.database.initialize(this.treeData);
            this.database.dataChange.subscribe(data => this.rebuildTreeForData([data]));
        });
    }
    /**
     * This constructs an array of nodes that matches the DOM
     */
    visibleNodes() {
        const result = [];
        function addExpandedChildren(node, expanded) {
            result.push(node);
            if (expanded.indexOf(node.id) != -1) {
                node.children.map((child) => addExpandedChildren(child, expanded));
            }
        }
        this.dataSource.data.forEach((node) => {
            addExpandedChildren(node, this.expansionModel.selected);
        });
        return result;
    }
    findNodeSiblings(arr, id) {
        let result, subResult;
        arr.forEach((item, i) => {
            if (item.id === id) {
                result = arr;
            }
            else if (item.children) {
                subResult = this.findNodeSiblings(item.children, id);
                if (subResult)
                    result = subResult;
            }
        });
        return result;
    }
    /**
     * Handle the drop - here we rearrange the data based on the drop event,
     * then rebuild the tree.
     * */
    drop(event) {
        // console.log('origin/destination', event.previousIndex, event.currentIndex);
        // ignore drops outside of the tree
        if (!event.isPointerOverContainer)
            return;
        // construct a list of visible nodes, this will match the DOM.
        // the cdkDragDrop event.currentIndex jives with visible nodes.
        // it calls rememberExpandedTreeNodes to persist expand state
        const visibleNodes = this.visibleNodes();
        // deep clone the data source so we can mutate it
        const changedData = JSON.parse(JSON.stringify(this.dataSource.data));
        // recursive find function to find siblings of node
        // determine where to insert the node
        const nodeAtDest = visibleNodes[event.currentIndex];
        const newSiblings = this.findNodeSiblings(changedData, nodeAtDest.id);
        if (!newSiblings)
            return;
        const insertIndex = newSiblings.findIndex(s => s.id === nodeAtDest.id);
        // remove the node from its old place
        const node = event.item.data;
        const siblings = this.findNodeSiblings(changedData, node.id);
        const siblingIndex = siblings.findIndex(n => n.id === node.id);
        const nodeToInsert = siblings.splice(siblingIndex, 1)[0];
        if (nodeAtDest.id === nodeToInsert.id)
            return;
        // ensure validity of drop - must be same level
        const nodeAtDestFlatNode = this.treeControl.dataNodes.find((n) => nodeAtDest.id === n.id);
        if (this.validateDrop && nodeAtDestFlatNode.level !== node.level) {
            alert('Items can only be moved within the same level.');
            return;
        }
        // insert node 
        newSiblings.splice(insertIndex, 0, nodeToInsert);
        // rebuild tree with mutated data
        this.rebuildTreeForData(changedData);
    }
    /**
     * Experimental - opening tree nodes as you drag over them
     */
    dragStart() {
        this.dragging = true;
    }
    dragEnd() {
        this.dragging = false;
    }
    dragHover(node) {
        if (this.dragging) {
            clearTimeout(this.expandTimeout);
            this.expandTimeout = setTimeout(() => {
                this.treeControl.expand(node);
            }, this.expandDelay);
        }
    }
    dragHoverEnd() {
        if (this.dragging) {
            clearTimeout(this.expandTimeout);
        }
    }
    /**
     * The following methods are for persisting the tree expand state
     * after being rebuilt
     */
    rebuildTreeForData(data) {
        this.dataSource.data = data;
        this.expansionModel.selected.forEach((id) => {
            const node = this.treeControl.dataNodes.find((n) => n.id === id);
            this.treeControl.expand(node);
        });
    }
    /**
     * Not used but you might need this to programmatically expand nodes
     * to reveal a particular node
     */
    expandNodesById(flatNodes, ids) {
        if (!flatNodes || flatNodes.length === 0)
            return;
        const idSet = new Set(ids);
        return flatNodes.forEach((node) => {
            if (idSet.has(node.id)) {
                this.treeControl.expand(node);
                let parent = this.getParentNode(node);
                while (parent) {
                    this.treeControl.expand(parent);
                    parent = this.getParentNode(parent);
                }
            }
        });
    }
    getParentNode(node) {
        const currentLevel = node.level;
        if (currentLevel < 1) {
            return null;
        }
        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];
            if (currentNode.level < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }
    updateNode(nodeUpdated) {
        const dataToChange = JSON.parse(JSON.stringify(this.dataSource.data));
        const siblings = this.findNodeSiblings(dataToChange, nodeUpdated.id);
        let index = siblings.findIndex(node => node.id === nodeUpdated.id);
        siblings[index] = nodeUpdated;
        this.rebuildTreeForData(dataToChange);
    }
    createNewFolder(newFolder) {
        newFolder.type = "folder";
        const dataToChange = JSON.parse(JSON.stringify(this.dataSource.data));
        if (newFolder.parent === null) {
            dataToChange.push(newFolder);
        }
        else {
            const siblings = this.findNodeSiblings(dataToChange, newFolder.parent);
            let index = siblings.findIndex(node => node.id === newFolder.parent);
            siblings[index].children.push(newFolder);
        }
        this.rebuildTreeForData(dataToChange);
    }
    createNewNode(newNode) {
        newNode.type = "node";
        const dataToChange = JSON.parse(JSON.stringify(this.dataSource.data));
        const siblings = this.findNodeSiblings(dataToChange, newNode.parent);
        let index = siblings.findIndex(node => node.id === newNode.parent);
        siblings[index].children.push(newNode);
        this.rebuildTreeForData(dataToChange);
    }
    onButtonClicked(id, button) {
        const changedData = JSON.parse(JSON.stringify(this.dataSource.data));
        const siblings = this.findNodeSiblings(changedData, id);
        if (button === 'edit') {
            this.emitNode.emit(siblings.find(node => node.id === id));
        }
        else if (button === 'newFolder') {
            this.createFolder.emit(siblings.find(node => node.id === id));
        }
        else if (button === 'newNode') {
            this.createNode.emit(siblings.find(node => node.id === id));
        }
    }
    emitAllRows() {
        const dataToEmit = JSON.parse(JSON.stringify(this.dataSource.data));
        let allRows = this.getChildren(dataToEmit);
        this.emitAllNodes.emit(allRows);
    }
    getChildren(arr) {
        let result = [];
        let subResult;
        arr.forEach((item, i) => {
            if (item.children.length > 0) {
                subResult = this.getChildren(item.children);
                if (subResult)
                    result.push(...subResult);
            }
            result.push(item);
        });
        return result;
    }
}
/** @nocollapse */ DataTreeComponent.ɵfac = function DataTreeComponent_Factory(t) { return new (t || DataTreeComponent)(i0.ɵɵdirectiveInject(FileDatabase)); };
/** @nocollapse */ DataTreeComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DataTreeComponent, selectors: [["app-data-tree"]], inputs: { eventNodeUpdatedSubscription: "eventNodeUpdatedSubscription", eventCreateNodeSubscription: "eventCreateNodeSubscription", eventGetAllRowsSubscription: "eventGetAllRowsSubscription", getAll: "getAll" }, outputs: { createNode: "createNode", createFolder: "createFolder", emitNode: "emitNode", emitAllNodes: "emitAllNodes" }, features: [i0.ɵɵProvidersFeature([FileDatabase])], decls: 3, vars: 3, consts: [["cdkDropList", "", 3, "dataSource", "treeControl", "cdkDropListDropped"], ["matTreeNodeToggle", "", "matTreeNodePadding", "", "cdkDrag", "", 3, "cdkDragData", "mouseenter", "mouseleave", "cdkDragStarted", "cdkDragReleased", 4, "matTreeNodeDef"], ["matTreeNodePadding", "", "cdkDrag", "", 3, "cdkDragData", "mouseenter", "mouseleave", "cdkDragStarted", "cdkDragReleased", 4, "matTreeNodeDef", "matTreeNodeDefWhen"], ["matTreeNodeToggle", "", "matTreeNodePadding", "", "cdkDrag", "", 3, "cdkDragData", "mouseenter", "mouseleave", "cdkDragStarted", "cdkDragReleased"], ["mat-icon-button", "", "disabled", ""], ["class", "type-icon", 4, "ngIf"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 3, "click"], [1, "type-icon"], ["matTreeNodePadding", "", "cdkDrag", "", 3, "cdkDragData", "mouseenter", "mouseleave", "cdkDragStarted", "cdkDragReleased"], ["mat-icon-button", "", "matTreeNodeToggle", "", 3, "click"], [1, "mat-icon-rtl-mirror"]], template: function DataTreeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "mat-tree", 0);
        i0.ɵɵlistener("cdkDropListDropped", function DataTreeComponent_Template_mat_tree_cdkDropListDropped_0_listener($event) { return ctx.drop($event); });
        i0.ɵɵtemplate(1, DataTreeComponent_mat_tree_node_1_Template, 9, 5, "mat-tree-node", 1);
        i0.ɵɵtemplate(2, DataTreeComponent_mat_tree_node_2_Template, 12, 7, "mat-tree-node", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("dataSource", ctx.dataSource)("treeControl", ctx.treeControl);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("matTreeNodeDefWhen", ctx.hasChild);
    } }, directives: [i1.MatTree, i2.CdkDropList, i1.MatTreeNodeDef, i1.MatTreeNode, i1.MatTreeNodeToggle, i1.MatTreeNodePadding, i2.CdkDrag, i3.MatButton, i4.NgIf, i5.MatIcon], styles: [".mat-tree-node[_ngcontent-%COMP%]{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:move;user-select:none}.mat-tree-node.cdk-drag-preview[_ngcontent-%COMP%]{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-tree-node.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drop-list-dragging[_ngcontent-%COMP%]   .mat-tree-node[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .2s cubic-bezier(0,0,.2,1)}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DataTreeComponent, [{
        type: Component,
        args: [{
                selector: 'app-data-tree',
                templateUrl: 'data-tree.component.html',
                styleUrls: ['data-tree.component.scss'],
                providers: [FileDatabase]
            }]
    }], function () { return [{ type: FileDatabase }]; }, { createNode: [{
            type: Output
        }], createFolder: [{
            type: Output
        }], emitNode: [{
            type: Output
        }], emitAllNodes: [{
            type: Output
        }], eventNodeUpdatedSubscription: [{
            type: Input
        }], eventCreateNodeSubscription: [{
            type: Input
        }], eventGetAllRowsSubscription: [{
            type: Input
        }], getAll: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvbWFpbi9hbmd1bGFyLWxpYnJhcnkvcHJvamVjdHMvc2l0bXVuLWZyb250ZW5kLWd1aS9zcmMvbGliLyIsInNvdXJjZXMiOlsiZGF0YS10cmVlL2RhdGEtdHJlZS5jb21wb25lbnQudHMiLCJkYXRhLXRyZWUvZGF0YS10cmVlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7SUNBeEQsbUNBQ0M7SUFBQSx3QkFDRDtJQUFBLGlCQUFXOzs7SUFGK0MsbURBQXNDOzs7O0lBSWhHLGlDQUNDO0lBRHFDLGtRQUFrQyxXQUFXLEtBQUU7SUFDcEYsZ0NBQVU7SUFBQSxpQ0FBaUI7SUFBQSxpQkFBVztJQUN2QyxpQkFBUzs7OztJQUNULGlDQUNDO0lBRHFDLHFRQUFrQyxTQUFTLEtBQUU7SUFDbEYsZ0NBQVU7SUFBQSw0QkFBWTtJQUFBLGlCQUFXO0lBQ2xDLGlCQUFTOzs7O0lBYlYsd0NBR0M7SUFGQSx3UEFBOEIsd01BQUEsNk1BQUEsNk1BQUE7SUFFOUIsNEJBQTBDO0lBQzFDLDRGQUNDO0lBRUQsWUFDQTtJQUFBLHdGQUNDO0lBRUQsd0ZBQ0M7SUFFRCxpQ0FDQztJQUR1Qiw2T0FBa0MsTUFBTSxLQUFFO0lBQ2pFLGdD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ZUFBeUM7UUFBekMsaURBQXlDOztrREQrRTVDLGlCQUFpQjtjQU43QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFdBQVcsRUFBRSwwQkFBMEI7Z0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDMUI7c0NBeUI4QixZQUFZLFVBdkIvQixVQUFVO2tCQUFuQixNQUFNO1lBQ0csWUFBWTtrQkFBckIsTUFBTTtZQUNHLFFBQVE7a0JBQWpCLE1BQU07WUFDRyxZQUFZO2tCQUFyQixNQUFNO1lBQ0UsNEJBQTRCO2tCQUFwQyxLQUFLO1lBQ0csMkJBQTJCO2tCQUFuQyxLQUFLO1lBQ0csMkJBQTJCO2tCQUFuQyxLQUFLO1lBZUcsTUFBTTtrQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmxhdFRyZWVDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RyZWUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRUcmVlRmxhdERhdGFTb3VyY2UsIE1hdFRyZWVGbGF0dGVuZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90cmVlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ2RrRHJhZ0Ryb3AgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEZpbGUgbm9kZSBkYXRhIHdpdGggbmVzdGVkIHN0cnVjdHVyZS5cclxuICogRWFjaCBub2RlIGhhcyBhIG5hbWUsIGFuZCBhIHR5cGUgb3IgYSBsaXN0IG9mIGNoaWxkcmVuLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZpbGVOb2RlIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNoaWxkcmVuOiBGaWxlTm9kZVtdO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICB0eXBlOiBhbnk7XHJcbn1cclxuXHJcbi8qKiBGbGF0IG5vZGUgd2l0aCBleHBhbmRhYmxlIGFuZCBsZXZlbCBpbmZvcm1hdGlvbiAqL1xyXG5leHBvcnQgY2xhc3MgRmlsZUZsYXROb2RlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBleHBhbmRhYmxlOiBib29sZWFuLFxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBsZXZlbDogbnVtYmVyLFxyXG4gICAgcHVibGljIHR5cGU6IGFueSxcclxuICAgIHB1YmxpYyBpZDogc3RyaW5nXHJcbiAgKSB7IH1cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogRmlsZSBkYXRhYmFzZSwgaXQgY2FuIGJ1aWxkIGEgdHJlZSBzdHJ1Y3R1cmVkIEpzb24gb2JqZWN0IGZyb20gc3RyaW5nLlxyXG4gKiBFYWNoIG5vZGUgaW4gSnNvbiBvYmplY3QgcmVwcmVzZW50cyBhIGZpbGUgb3IgYSBkaXJlY3RvcnkuIEZvciBhIGZpbGUsIGl0IGhhcyBuYW1lIGFuZCB0eXBlLlxyXG4gKiBGb3IgYSBkaXJlY3RvcnksIGl0IGhhcyBuYW1lIGFuZCBjaGlsZHJlbiAoYSBsaXN0IG9mIGZpbGVzIG9yIGRpcmVjdG9yaWVzKS5cclxuICogVGhlIGlucHV0IHdpbGwgYmUgYSBqc29uIG9iamVjdCBzdHJpbmcsIGFuZCB0aGUgb3V0cHV0IGlzIGEgbGlzdCBvZiBgRmlsZU5vZGVgIHdpdGggbmVzdGVkXHJcbiAqIHN0cnVjdHVyZS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbGVEYXRhYmFzZSB7XHJcbiAgZGF0YUNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RmlsZU5vZGVbXT4oW10pO1xyXG4gIGdldCBkYXRhKCk6IEZpbGVOb2RlW10geyByZXR1cm4gdGhpcy5kYXRhQ2hhbmdlLnZhbHVlOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoZGF0YU9iaikge1xyXG5cclxuICAgIC8vIEJ1aWxkIHRoZSB0cmVlIG5vZGVzIGZyb20gSnNvbiBvYmplY3QuIFRoZSByZXN1bHQgaXMgYSBsaXN0IG9mIGBGaWxlTm9kZWAgd2l0aCBuZXN0ZWRcclxuICAgIC8vICAgICBmaWxlIG5vZGUgYXMgY2hpbGRyZW4uXHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy5idWlsZEZpbGVUcmVlKGRhdGFPYmosIDApO1xyXG5cclxuICAgIC8vIE5vdGlmeSB0aGUgY2hhbmdlLlxyXG4gICAgdGhpcy5kYXRhQ2hhbmdlLm5leHQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgZmlsZSBzdHJ1Y3R1cmUgdHJlZS4gVGhlIGB2YWx1ZWAgaXMgdGhlIEpzb24gb2JqZWN0LCBvciBhIHN1Yi10cmVlIG9mIGEgSnNvbiBvYmplY3QuXHJcbiAgICogVGhlIHJldHVybiB2YWx1ZSBpcyB0aGUgbGlzdCBvZiBgRmlsZU5vZGVgLlxyXG4gICAqL1xyXG4gIGJ1aWxkRmlsZVRyZWUoYXJyYXlUcmVlTm9kZXM6IGFueVtdLCBsZXZlbDogbnVtYmVyLCBwYXJlbnRJZDogc3RyaW5nID0gJzAnKTogRmlsZU5vZGVbXSB7XHJcbiAgICB2YXIgbWFwID0ge307XHJcbiAgICBhcnJheVRyZWVOb2Rlcy5mb3JFYWNoKCh0cmVlTm9kZSkgPT4ge1xyXG4gICAgICB2YXIgb2JqID0gdHJlZU5vZGU7XHJcbiAgICAgIG9iai5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICBvYmoudHlwZT0gKHRyZWVOb2RlLmlzRm9sZGVyKT8gXCJmb2xkZXJcIiA6IFwibm9kZVwiO1xyXG5cclxuICAgICAgaWYoIW1hcFtvYmouaWRdKSB7bWFwW29iai5pZF0gPSBvYmo7fVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGxldCBwcmV2aW91c0NoaWxkcmVuPSBtYXBbb2JqLmlkXS5jaGlsZHJlblxyXG4gICAgICAgIG1hcFtvYmouaWRdID0gb2JqO1xyXG4gICAgICAgIG1hcFtvYmouaWRdLmNoaWxkcmVuPXByZXZpb3VzQ2hpbGRyZW5cclxuICAgICAgfVxyXG4gICAgICB2YXIgcGFyZW50ID0gb2JqLnBhcmVudCB8fCAncm9vdCc7XHJcbiAgICAgIGlmICghbWFwW3BhcmVudF0pIHtcclxuICAgICAgICBtYXBbcGFyZW50XSA9IHtcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgbWFwW3BhcmVudF0uY2hpbGRyZW4ucHVzaChvYmopO1xyXG4gICAgfSk7XHJcbiAgICBtYXBbJ3Jvb3QnXS50eXBlPSdmb2xkZXInO1xyXG4gICAgbWFwWydyb290J10ubmFtZT0nUm9vdCc7XHJcbiAgICBtYXBbJ3Jvb3QnXS5pc0ZvbGRlcj10cnVlO1xyXG5cclxuICAgIHJldHVybiBtYXBbJ3Jvb3QnXTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAdGl0bGUgVHJlZSB3aXRoIGZsYXQgbm9kZXNcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtdHJlZScsXHJcbiAgdGVtcGxhdGVVcmw6ICdkYXRhLXRyZWUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWydkYXRhLXRyZWUuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtGaWxlRGF0YWJhc2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVHJlZUNvbXBvbmVudCB7XHJcbiAgQE91dHB1dCgpIGNyZWF0ZU5vZGU6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIEBPdXRwdXQoKSBjcmVhdGVGb2xkZXI6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIEBPdXRwdXQoKSBlbWl0Tm9kZTogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQE91dHB1dCgpIGVtaXRBbGxOb2RlczogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQElucHV0KCkgZXZlbnROb2RlVXBkYXRlZFN1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZSA8YW55PiA7XHJcbiAgQElucHV0KCkgZXZlbnRDcmVhdGVOb2RlU3Vic2NyaXB0aW9uOiBPYnNlcnZhYmxlIDxhbnk+IDtcclxuICBASW5wdXQoKSBldmVudEdldEFsbFJvd3NTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGFueT4gO1xyXG4gIHByaXZhdGUgX2V2ZW50Tm9kZVVwZGF0ZWRTdWJzY3JpcHRpb246IGFueTtcclxuICBwcml2YXRlIF9ldmVudENyZWF0ZU5vZGVTdWJzY3JpcHRpb246IGFueTtcclxuICBwcml2YXRlIF9ldmVudEdldEFsbFJvd3NTdWJzY3JpcHRpb246IGFueTtcclxuICB0cmVlQ29udHJvbDogRmxhdFRyZWVDb250cm9sPEZpbGVGbGF0Tm9kZT47XHJcbiAgdHJlZUZsYXR0ZW5lcjogTWF0VHJlZUZsYXR0ZW5lcjxGaWxlTm9kZSwgRmlsZUZsYXROb2RlPjtcclxuICBkYXRhU291cmNlOiBNYXRUcmVlRmxhdERhdGFTb3VyY2U8RmlsZU5vZGUsIEZpbGVGbGF0Tm9kZT47XHJcbiAgLy8gZXhwYW5zaW9uIG1vZGVsIHRyYWNrcyBleHBhbnNpb24gc3RhdGVcclxuICBleHBhbnNpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxzdHJpbmc+KHRydWUpO1xyXG4gIGRyYWdnaW5nID0gZmFsc2U7XHJcbiAgZXhwYW5kVGltZW91dDogYW55O1xyXG4gIGV4cGFuZERlbGF5ID0gMTAwMDtcclxuICB2YWxpZGF0ZURyb3AgPSBmYWxzZTtcclxuICB0cmVlRGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGRhdGFiYXNlOiBGaWxlRGF0YWJhc2UpIHtcclxuICAgIHRoaXMuZW1pdE5vZGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU5vZGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUZvbGRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuZW1pdEFsbE5vZGVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy50cmVlRmxhdHRlbmVyID0gbmV3IE1hdFRyZWVGbGF0dGVuZXIodGhpcy50cmFuc2Zvcm1lciwgdGhpcy5fZ2V0TGV2ZWwsXHJcbiAgICAgIHRoaXMuX2lzRXhwYW5kYWJsZSwgdGhpcy5fZ2V0Q2hpbGRyZW4pO1xyXG4gICAgdGhpcy50cmVlQ29udHJvbCA9IG5ldyBGbGF0VHJlZUNvbnRyb2w8RmlsZUZsYXROb2RlPih0aGlzLl9nZXRMZXZlbCwgdGhpcy5faXNFeHBhbmRhYmxlKTtcclxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUcmVlRmxhdERhdGFTb3VyY2UodGhpcy50cmVlQ29udHJvbCwgdGhpcy50cmVlRmxhdHRlbmVyKTtcclxuIFxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKXtcclxuXHJcbiAgICBpZih0aGlzLmV2ZW50Tm9kZVVwZGF0ZWRTdWJzY3JpcHRpb24pXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZXZlbnROb2RlVXBkYXRlZFN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoXHJcbiAgICAgICAgKG5vZGUpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZXZlbnRDcmVhdGVOb2RlU3Vic2NyaXB0aW9uKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmV2ZW50Q3JlYXRlTm9kZVN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoXHJcbiAgICAgICAgKG5vZGUpID0+IHtcclxuICAgICAgICAgIGlmKG5vZGUuaXNGb2xkZXIpIHRoaXMuY3JlYXRlTmV3Rm9sZGVyKG5vZGUpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLmNyZWF0ZU5ld05vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRHZXRBbGxSb3dzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50R2V0QWxsUm93c1N1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRHZXRBbGxSb3dzU3Vic2NyaXB0aW9uLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0QWxsUm93cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5nZXRBbGwoKVxyXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcclxuICAgICAgdGhpcy50cmVlRGF0YSA9IGl0ZW1zO1xyXG4gICAgICB0aGlzLmRhdGFiYXNlLmluaXRpYWxpemUodGhpcy50cmVlRGF0YSk7XHJcbiAgICAgIHRoaXMuZGF0YWJhc2UuZGF0YUNoYW5nZS5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLnJlYnVpbGRUcmVlRm9yRGF0YShbZGF0YV0pKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHRyYW5zZm9ybWVyID0gKG5vZGU6IEZpbGVOb2RlLCBsZXZlbDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZihub2RlLmNoaWxkcmVuLmxlbmd0aCE9MCl7XHJcbiAgICAgIHJldHVybiBuZXcgRmlsZUZsYXROb2RlKCEhbm9kZS5jaGlsZHJlbiwgbm9kZS5uYW1lLCBsZXZlbCwgbm9kZS50eXBlLCBub2RlLmlkKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gbmV3IEZpbGVGbGF0Tm9kZSghIXVuZGVmaW5lZCwgbm9kZS5uYW1lLCBsZXZlbCwgbm9kZS50eXBlLCBub2RlLmlkKTtcclxuICAgIH1cclxuICBcclxuICB9XHJcbiAgcHJpdmF0ZSBfZ2V0TGV2ZWwgPSAobm9kZTogRmlsZUZsYXROb2RlKSA9PiBub2RlLmxldmVsO1xyXG4gIHByaXZhdGUgX2lzRXhwYW5kYWJsZSA9IChub2RlOiBGaWxlRmxhdE5vZGUpID0+IG5vZGUuZXhwYW5kYWJsZTtcclxuICBwcml2YXRlIF9nZXRDaGlsZHJlbiA9IChub2RlOiBGaWxlTm9kZSk6IE9ic2VydmFibGU8RmlsZU5vZGVbXT4gPT4gb2JzZXJ2YWJsZU9mKG5vZGUuY2hpbGRyZW4pO1xyXG4gIGhhc0NoaWxkID0gKF86IG51bWJlciwgX25vZGVEYXRhOiBGaWxlRmxhdE5vZGUpID0+IF9ub2RlRGF0YS5leHBhbmRhYmxlO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjb25zdHJ1Y3RzIGFuIGFycmF5IG9mIG5vZGVzIHRoYXQgbWF0Y2hlcyB0aGUgRE9NXHJcbiAgICovXHJcbiAgdmlzaWJsZU5vZGVzKCk6IEZpbGVOb2RlW10ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRXhwYW5kZWRDaGlsZHJlbihub2RlOiBGaWxlTm9kZSwgZXhwYW5kZWQ6IHN0cmluZ1tdKSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xyXG4gICAgICBpZiAoZXhwYW5kZWQuaW5kZXhPZihub2RlLmlkKSAhPSAtMSkge1xyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gYWRkRXhwYW5kZWRDaGlsZHJlbihjaGlsZCwgZXhwYW5kZWQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5kYXRhU291cmNlLmRhdGEuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICBhZGRFeHBhbmRlZENoaWxkcmVuKG5vZGUsIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0ZWQpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcblxyXG4gICBmaW5kTm9kZVNpYmxpbmdzKGFycjogQXJyYXk8YW55PiwgaWQ6IHN0cmluZyk6IEFycmF5PGFueT4ge1xyXG4gICAgbGV0IHJlc3VsdCwgc3ViUmVzdWx0O1xyXG4gICAgYXJyLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gYXJyO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdWJSZXN1bHQgPSB0aGlzLmZpbmROb2RlU2libGluZ3MoaXRlbS5jaGlsZHJlbiwgaWQpO1xyXG4gICAgICAgIGlmIChzdWJSZXN1bHQpIHJlc3VsdCA9IHN1YlJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgdGhlIGRyb3AgLSBoZXJlIHdlIHJlYXJyYW5nZSB0aGUgZGF0YSBiYXNlZCBvbiB0aGUgZHJvcCBldmVudCxcclxuICAgKiB0aGVuIHJlYnVpbGQgdGhlIHRyZWUuXHJcbiAgICogKi9cclxuICBkcm9wKGV2ZW50OiBDZGtEcmFnRHJvcDxzdHJpbmdbXT4pIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvcmlnaW4vZGVzdGluYXRpb24nLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xyXG5cclxuICAgIC8vIGlnbm9yZSBkcm9wcyBvdXRzaWRlIG9mIHRoZSB0cmVlXHJcbiAgICBpZiAoIWV2ZW50LmlzUG9pbnRlck92ZXJDb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAvLyBjb25zdHJ1Y3QgYSBsaXN0IG9mIHZpc2libGUgbm9kZXMsIHRoaXMgd2lsbCBtYXRjaCB0aGUgRE9NLlxyXG4gICAgLy8gdGhlIGNka0RyYWdEcm9wIGV2ZW50LmN1cnJlbnRJbmRleCBqaXZlcyB3aXRoIHZpc2libGUgbm9kZXMuXHJcbiAgICAvLyBpdCBjYWxscyByZW1lbWJlckV4cGFuZGVkVHJlZU5vZGVzIHRvIHBlcnNpc3QgZXhwYW5kIHN0YXRlXHJcbiAgICBjb25zdCB2aXNpYmxlTm9kZXMgPSB0aGlzLnZpc2libGVOb2RlcygpO1xyXG5cclxuICAgIC8vIGRlZXAgY2xvbmUgdGhlIGRhdGEgc291cmNlIHNvIHdlIGNhbiBtdXRhdGUgaXRcclxuICAgIGNvbnN0IGNoYW5nZWREYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFTb3VyY2UuZGF0YSkpO1xyXG5cclxuICAgIC8vIHJlY3Vyc2l2ZSBmaW5kIGZ1bmN0aW9uIHRvIGZpbmQgc2libGluZ3Mgb2Ygbm9kZVxyXG5cclxuXHJcbiAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gaW5zZXJ0IHRoZSBub2RlXHJcbiAgICBjb25zdCBub2RlQXREZXN0ID0gdmlzaWJsZU5vZGVzW2V2ZW50LmN1cnJlbnRJbmRleF07XHJcbiAgICBjb25zdCBuZXdTaWJsaW5ncyA9IHRoaXMuZmluZE5vZGVTaWJsaW5ncyhjaGFuZ2VkRGF0YSwgbm9kZUF0RGVzdC5pZCk7XHJcbiAgICBpZiAoIW5ld1NpYmxpbmdzKSByZXR1cm47XHJcbiAgICBjb25zdCBpbnNlcnRJbmRleCA9IG5ld1NpYmxpbmdzLmZpbmRJbmRleChzID0+IHMuaWQgPT09IG5vZGVBdERlc3QuaWQpO1xyXG5cclxuICAgIC8vIHJlbW92ZSB0aGUgbm9kZSBmcm9tIGl0cyBvbGQgcGxhY2VcclxuICAgIGNvbnN0IG5vZGUgPSBldmVudC5pdGVtLmRhdGE7XHJcbiAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMuZmluZE5vZGVTaWJsaW5ncyhjaGFuZ2VkRGF0YSwgbm9kZS5pZCk7XHJcbiAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBzaWJsaW5ncy5maW5kSW5kZXgobiA9PiBuLmlkID09PSBub2RlLmlkKTtcclxuICAgIGNvbnN0IG5vZGVUb0luc2VydDogRmlsZU5vZGUgPSBzaWJsaW5ncy5zcGxpY2Uoc2libGluZ0luZGV4LCAxKVswXTtcclxuICAgIGlmIChub2RlQXREZXN0LmlkID09PSBub2RlVG9JbnNlcnQuaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyBlbnN1cmUgdmFsaWRpdHkgb2YgZHJvcCAtIG11c3QgYmUgc2FtZSBsZXZlbFxyXG4gICAgY29uc3Qgbm9kZUF0RGVzdEZsYXROb2RlID0gdGhpcy50cmVlQ29udHJvbC5kYXRhTm9kZXMuZmluZCgobikgPT4gbm9kZUF0RGVzdC5pZCA9PT0gbi5pZCk7XHJcbiAgICBpZiAodGhpcy52YWxpZGF0ZURyb3AgJiYgbm9kZUF0RGVzdEZsYXROb2RlLmxldmVsICE9PSBub2RlLmxldmVsKSB7XHJcbiAgICAgIGFsZXJ0KCdJdGVtcyBjYW4gb25seSBiZSBtb3ZlZCB3aXRoaW4gdGhlIHNhbWUgbGV2ZWwuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbnNlcnQgbm9kZSBcclxuICAgIG5ld1NpYmxpbmdzLnNwbGljZShpbnNlcnRJbmRleCwgMCwgbm9kZVRvSW5zZXJ0KTtcclxuXHJcbiAgICAvLyByZWJ1aWxkIHRyZWUgd2l0aCBtdXRhdGVkIGRhdGFcclxuICAgIHRoaXMucmVidWlsZFRyZWVGb3JEYXRhKGNoYW5nZWREYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cGVyaW1lbnRhbCAtIG9wZW5pbmcgdHJlZSBub2RlcyBhcyB5b3UgZHJhZyBvdmVyIHRoZW1cclxuICAgKi9cclxuICBkcmFnU3RhcnQoKSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuICB9XHJcbiAgZHJhZ0VuZCgpIHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuICB9XHJcbiAgZHJhZ0hvdmVyKG5vZGU6IEZpbGVGbGF0Tm9kZSkge1xyXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwYW5kVGltZW91dCk7XHJcbiAgICAgIHRoaXMuZXhwYW5kVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudHJlZUNvbnRyb2wuZXhwYW5kKG5vZGUpO1xyXG4gICAgICB9LCB0aGlzLmV4cGFuZERlbGF5KTtcclxuICAgIH1cclxuICB9XHJcbiAgZHJhZ0hvdmVyRW5kKCkge1xyXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwYW5kVGltZW91dCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIGZvciBwZXJzaXN0aW5nIHRoZSB0cmVlIGV4cGFuZCBzdGF0ZVxyXG4gICAqIGFmdGVyIGJlaW5nIHJlYnVpbHRcclxuICAgKi9cclxuXHJcbiAgcmVidWlsZFRyZWVGb3JEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3RlZC5mb3JFYWNoKChpZCkgPT4ge1xyXG4gICAgICBjb25zdCBub2RlID0gdGhpcy50cmVlQ29udHJvbC5kYXRhTm9kZXMuZmluZCgobikgPT4gbi5pZCA9PT0gaWQpO1xyXG4gICAgICB0aGlzLnRyZWVDb250cm9sLmV4cGFuZChub2RlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm90IHVzZWQgYnV0IHlvdSBtaWdodCBuZWVkIHRoaXMgdG8gcHJvZ3JhbW1hdGljYWxseSBleHBhbmQgbm9kZXNcclxuICAgKiB0byByZXZlYWwgYSBwYXJ0aWN1bGFyIG5vZGVcclxuICAgKi9cclxuICBwcml2YXRlIGV4cGFuZE5vZGVzQnlJZChmbGF0Tm9kZXM6IEZpbGVGbGF0Tm9kZVtdLCBpZHM6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAoIWZsYXROb2RlcyB8fCBmbGF0Tm9kZXMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICBjb25zdCBpZFNldCA9IG5ldyBTZXQoaWRzKTtcclxuICAgIHJldHVybiBmbGF0Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICBpZiAoaWRTZXQuaGFzKG5vZGUuaWQpKSB7XHJcbiAgICAgICAgdGhpcy50cmVlQ29udHJvbC5leHBhbmQobm9kZSk7XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50Tm9kZShub2RlKTtcclxuICAgICAgICB3aGlsZSAocGFyZW50KSB7XHJcbiAgICAgICAgICB0aGlzLnRyZWVDb250cm9sLmV4cGFuZChwYXJlbnQpO1xyXG4gICAgICAgICAgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlKHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGFyZW50Tm9kZShub2RlOiBGaWxlRmxhdE5vZGUpOiBGaWxlRmxhdE5vZGUgfCBudWxsIHtcclxuICAgIGNvbnN0IGN1cnJlbnRMZXZlbCA9IG5vZGUubGV2ZWw7XHJcbiAgICBpZiAoY3VycmVudExldmVsIDwgMSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnRyZWVDb250cm9sLmRhdGFOb2Rlcy5pbmRleE9mKG5vZGUpIC0gMTtcclxuICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpID49IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBjdXJyZW50Tm9kZSA9IHRoaXMudHJlZUNvbnRyb2wuZGF0YU5vZGVzW2ldO1xyXG4gICAgICBpZiAoY3VycmVudE5vZGUubGV2ZWwgPCBjdXJyZW50TGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudE5vZGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTm9kZShub2RlVXBkYXRlZClcclxuICB7XHJcbiAgICBjb25zdCBkYXRhVG9DaGFuZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YVNvdXJjZS5kYXRhKSlcclxuICAgIGNvbnN0IHNpYmxpbmdzID0gdGhpcy5maW5kTm9kZVNpYmxpbmdzKGRhdGFUb0NoYW5nZSwgbm9kZVVwZGF0ZWQuaWQpO1xyXG4gICAgbGV0IGluZGV4PSBzaWJsaW5ncy5maW5kSW5kZXgobm9kZSA9PiBub2RlLmlkID09PSBub2RlVXBkYXRlZC5pZClcclxuICAgIHNpYmxpbmdzW2luZGV4XT1ub2RlVXBkYXRlZDtcclxuICAgIHRoaXMucmVidWlsZFRyZWVGb3JEYXRhKGRhdGFUb0NoYW5nZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlTmV3Rm9sZGVyKG5ld0ZvbGRlcilcclxuICB7XHJcbiAgICBuZXdGb2xkZXIudHlwZT1cImZvbGRlclwiO1xyXG4gICAgY29uc3QgZGF0YVRvQ2hhbmdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFTb3VyY2UuZGF0YSkpXHJcbiAgICBpZihuZXdGb2xkZXIucGFyZW50ID09PSBudWxsKSB7ZGF0YVRvQ2hhbmdlLnB1c2gobmV3Rm9sZGVyKX1cclxuICAgIGVsc2V7XHJcbiAgICAgIGNvbnN0IHNpYmxpbmdzID0gdGhpcy5maW5kTm9kZVNpYmxpbmdzKGRhdGFUb0NoYW5nZSwgbmV3Rm9sZGVyLnBhcmVudCk7XHJcbiAgICAgIGxldCBpbmRleD0gc2libGluZ3MuZmluZEluZGV4KG5vZGUgPT4gbm9kZS5pZCA9PT0gbmV3Rm9sZGVyLnBhcmVudCk7XHJcbiAgICAgIHNpYmxpbmdzW2luZGV4XS5jaGlsZHJlbi5wdXNoKG5ld0ZvbGRlcilcclxuICAgIH1cclxuICAgIHRoaXMucmVidWlsZFRyZWVGb3JEYXRhKGRhdGFUb0NoYW5nZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlTmV3Tm9kZShuZXdOb2RlKVxyXG4gIHtcclxuICAgIG5ld05vZGUudHlwZT1cIm5vZGVcIjtcclxuICAgIGNvbnN0IGRhdGFUb0NoYW5nZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhU291cmNlLmRhdGEpKVxyXG4gICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLmZpbmROb2RlU2libGluZ3MoZGF0YVRvQ2hhbmdlLCBuZXdOb2RlLnBhcmVudCk7XHJcbiAgICBsZXQgaW5kZXg9IHNpYmxpbmdzLmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQgPT09IG5ld05vZGUucGFyZW50KTtcclxuICAgIHNpYmxpbmdzW2luZGV4XS5jaGlsZHJlbi5wdXNoKG5ld05vZGUpXHJcbiAgICBcclxuXHJcbiAgICB0aGlzLnJlYnVpbGRUcmVlRm9yRGF0YShkYXRhVG9DaGFuZ2UpO1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgb25CdXR0b25DbGlja2VkKGlkLCBidXR0b246IHN0cmluZylcclxuICB7XHJcbiAgICBjb25zdCBjaGFuZ2VkRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhU291cmNlLmRhdGEpKVxyXG4gICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLmZpbmROb2RlU2libGluZ3MoY2hhbmdlZERhdGEsIGlkKTtcclxuICAgIGlmKGJ1dHRvbiA9PT0nZWRpdCcpICB7dGhpcy5lbWl0Tm9kZS5lbWl0KCBzaWJsaW5ncy5maW5kKG5vZGUgPT4gbm9kZS5pZCA9PT0gaWQpKTt9XHJcbiAgICBlbHNlIGlmKGJ1dHRvbiA9PT0gJ25ld0ZvbGRlcicpIHt0aGlzLmNyZWF0ZUZvbGRlci5lbWl0KCBzaWJsaW5ncy5maW5kKG5vZGUgPT4gbm9kZS5pZCA9PT0gaWQpKTt9XHJcbiAgICBlbHNlIGlmKGJ1dHRvbiA9PT0gJ25ld05vZGUnKSB7dGhpcy5jcmVhdGVOb2RlLmVtaXQoIHNpYmxpbmdzLmZpbmQobm9kZSA9PiBub2RlLmlkID09PSBpZCkpO31cclxuXHJcbiAgfVxyXG5cclxuICBlbWl0QWxsUm93cygpXHJcbiAge1xyXG4gICAgY29uc3QgZGF0YVRvRW1pdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhU291cmNlLmRhdGEpKVxyXG4gICAgbGV0IGFsbFJvd3MgPSB0aGlzLmdldENoaWxkcmVuKGRhdGFUb0VtaXQpOyBcclxuICAgIHRoaXMuZW1pdEFsbE5vZGVzLmVtaXQoYWxsUm93cyk7XHJcbiAgfVxyXG5cclxuICBnZXRDaGlsZHJlbihhcnIpXHJcbiAge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgbGV0IHN1YlJlc3VsdDtcclxuICAgIGFyci5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgc3ViUmVzdWx0ID0gdGhpcy5nZXRDaGlsZHJlbihpdGVtLmNoaWxkcmVuKTtcclxuICAgICAgICBpZiAoc3ViUmVzdWx0KSByZXN1bHQucHVzaCguLi5zdWJSZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG5cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iLCI8bWF0LXRyZWUgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIFt0cmVlQ29udHJvbF09XCJ0cmVlQ29udHJvbFwiIGNka0Ryb3BMaXN0IChjZGtEcm9wTGlzdERyb3BwZWQpPVwiZHJvcCgkZXZlbnQpXCI+XHJcblx0PG1hdC10cmVlLW5vZGUgKm1hdFRyZWVOb2RlRGVmPVwibGV0IG5vZGVcIiBtYXRUcmVlTm9kZVRvZ2dsZSBtYXRUcmVlTm9kZVBhZGRpbmcgY2RrRHJhZyBbY2RrRHJhZ0RhdGFdPVwibm9kZVwiXHJcblx0XHQobW91c2VlbnRlcik9XCJkcmFnSG92ZXIobm9kZSlcIiAobW91c2VsZWF2ZSk9XCJkcmFnSG92ZXJFbmQoKVwiIChjZGtEcmFnU3RhcnRlZCk9XCJkcmFnU3RhcnQoKVwiXHJcblx0XHQoY2RrRHJhZ1JlbGVhc2VkKT1cImRyYWdFbmQoKVwiPlxyXG5cdFx0PGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gZGlzYWJsZWQ+PC9idXR0b24+XHJcblx0XHQ8bWF0LWljb24gKm5nSWY9XCJub2RlLnR5cGUgPT09J2ZvbGRlcidcIiBjbGFzcz1cInR5cGUtaWNvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibm9kZS50eXBlICsgJ2ljb24nXCI+XHJcblx0XHRcdGZvbGRlclxyXG5cdFx0PC9tYXQtaWNvbj5cclxuXHRcdHt7bm9kZS5uYW1lfX1cclxuXHRcdDxidXR0b24gKm5nSWY9XCJub2RlLnR5cGUgPT09J2ZvbGRlcidcIiAoY2xpY2spPVwib25CdXR0b25DbGlja2VkKG5vZGUuaWQsICduZXdGb2xkZXInKVwiIG1hdC1pY29uLWJ1dHRvbj5cclxuXHRcdFx0PG1hdC1pY29uPmNyZWF0ZV9uZXdfZm9sZGVyPC9tYXQtaWNvbj5cclxuXHRcdDwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiAqbmdJZj1cIm5vZGUudHlwZSA9PT0nZm9sZGVyJ1wiIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrZWQobm9kZS5pZCwgJ25ld05vZGUnKVwiIG1hdC1pY29uLWJ1dHRvbj5cclxuXHRcdFx0PG1hdC1pY29uPnBsYXlsaXN0X2FkZDwvbWF0LWljb24+XHJcblx0XHQ8L2J1dHRvbj5cclxuXHRcdDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrZWQobm9kZS5pZCwgJ2VkaXQnKVwiPlxyXG5cdFx0XHQ8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XHJcblx0XHQ8L2J1dHRvbj5cclxuXHQ8L21hdC10cmVlLW5vZGU+XHJcblxyXG5cdDxtYXQtdHJlZS1ub2RlICptYXRUcmVlTm9kZURlZj1cImxldCBub2RlO3doZW46IGhhc0NoaWxkXCIgbWF0VHJlZU5vZGVQYWRkaW5nIGNka0RyYWcgW2Nka0RyYWdEYXRhXT1cIm5vZGVcIlxyXG5cdFx0KG1vdXNlZW50ZXIpPVwiZHJhZ0hvdmVyKG5vZGUpXCIgKG1vdXNlbGVhdmUpPVwiZHJhZ0hvdmVyRW5kKClcIiAoY2RrRHJhZ1N0YXJ0ZWQpPVwiZHJhZ1N0YXJ0KClcIlxyXG5cdFx0KGNka0RyYWdSZWxlYXNlZCk9XCJkcmFnRW5kKClcIj5cclxuXHRcdDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFRyZWVOb2RlVG9nZ2xlIChjbGljayk9XCJleHBhbnNpb25Nb2RlbC50b2dnbGUobm9kZS5pZClcIlxyXG5cdFx0XHRbYXR0ci5hcmlhLWxhYmVsXT1cIid0b2dnbGUgJyArIG5vZGUubmFtZVwiPlxyXG5cdFx0XHQ8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbi1ydGwtbWlycm9yXCI+XHJcblx0XHRcdFx0e3t0cmVlQ29udHJvbC5pc0V4cGFuZGVkKG5vZGUpID8gJ2V4cGFuZF9tb3JlJyA6ICdjaGV2cm9uX3JpZ2h0J319XHJcblx0XHRcdDwvbWF0LWljb24+XHJcblx0XHQ8L2J1dHRvbj5cclxuXHRcdDxtYXQtaWNvbiBjbGFzcz1cInR5cGUtaWNvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibm9kZS50eXBlICsgJ2ljb24nXCI+XHJcblx0XHRcdGZvbGRlclxyXG5cdFx0PC9tYXQtaWNvbj5cclxuXHRcdHt7bm9kZS5uYW1lfX1cclxuXHRcdDxidXR0b24gKm5nSWY9XCJub2RlLnR5cGUgPT09J2ZvbGRlcidcIiAoY2xpY2spPVwib25CdXR0b25DbGlja2VkKG5vZGUuaWQsICduZXdGb2xkZXInKVwiIG1hdC1pY29uLWJ1dHRvbj5cclxuXHRcdFx0PG1hdC1pY29uPmNyZWF0ZV9uZXdfZm9sZGVyPC9tYXQtaWNvbj5cclxuXHRcdDwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiAqbmdJZj1cIm5vZGUudHlwZSA9PT0nZm9sZGVyJ1wiIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrZWQobm9kZS5pZCwgJ25ld05vZGUnKVwiIG1hdC1pY29uLWJ1dHRvbj5cclxuXHRcdFx0PG1hdC1pY29uPnBsYXlsaXN0X2FkZDwvbWF0LWljb24+XHJcblx0XHQ8L2J1dHRvbj5cclxuXHRcdDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrZWQobm9kZS5pZCwgJ2VkaXQnKVwiPlxyXG5cdFx0XHQ8bWF0LWljb24+ZWRpdDwvbWF0LWljb24+XHJcblx0XHQ8L2J1dHRvbj5cclxuXHQ8L21hdC10cmVlLW5vZGU+XHJcbjwvbWF0LXRyZWU+Il19