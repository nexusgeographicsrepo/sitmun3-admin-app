(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ag-grid-community/all-modules'), require('@ngx-translate/core'), require('rxjs'), require('@angular/material/dialog'), require('@angular/forms'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser/animations'), require('@angular/router'), require('@sitmun/frontend-core'), require('@angular/common/locales/ca'), require('@angular/common/locales/es'), require('@ag-grid-community/angular'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/menu'), require('@ngx-translate/http-loader')) :
    typeof define === 'function' && define.amd ? define('@sitmun/frontend-gui', ['exports', '@angular/core', '@ag-grid-community/all-modules', '@ngx-translate/core', 'rxjs', '@angular/material/dialog', '@angular/forms', '@angular/common', '@angular/common/http', '@angular/platform-browser/animations', '@angular/router', '@sitmun/frontend-core', '@angular/common/locales/ca', '@angular/common/locales/es', '@ag-grid-community/angular', '@angular/material/button', '@angular/material/icon', '@angular/material/menu', '@ngx-translate/http-loader'], factory) :
    (factory((global.sitmun = global.sitmun || {}, global.sitmun['frontend-gui'] = {}),global.ng.core,null,null,global.rxjs,global.ng.material.dialog,global.ng.forms,global.ng.common,global.ng.common.http,global.ng.platformBrowser.animations,global.ng.router,null,global.ng.common.locales.ca,global.ng.common.locales.es,null,global.ng.material.button,global.ng.material.icon,global.ng.material.menu,null));
}(this, (function (exports,core,allModules,core$1,rxjs,dialog,forms,common,http,animations,router,frontendCore,localeCa,localeEs,angular,button,icon,menu,httpLoader) { 'use strict';

    localeCa = localeCa && localeCa.hasOwnProperty('default') ? localeCa['default'] : localeCa;
    localeEs = localeEs && localeEs.hasOwnProperty('default') ? localeEs['default'] : localeEs;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DataGridComponent = (function () {
        function DataGridComponent(translate) {
            var _this = this;
            this.translate = translate;
            this.modules = allModules.AllCommunityModules;
            this.statusColumn = false;
            this.changesMap = new Map();
            this.modificationChange = false;
            this.undoNoChanges = false;
            this.translate = translate;
            this.remove = new core.EventEmitter();
            this.new = new core.EventEmitter();
            this.sendChanges = new core.EventEmitter();
            this.getSelectedRows = new core.EventEmitter();
            this.changeCounter = 0;
            this.previousChangeCounter = 0;
            this.redoCounter = 0;
            this.gridOptions = {
                defaultColDef: {
                    sortable: true,
                    flex: 1,
                    filter: true,
                    editable: true,
                    cellStyle: { backgroundColor: '#FFFFFF' },
                },
                columnTypes: {
                    dateColumn: {
                        filter: 'agDateColumnFilter',
                        filterParams: {
                            comparator: /**
                             * @param {?} filterLocalDateAtMidnight
                             * @param {?} cellValue
                             * @return {?}
                             */ function (filterLocalDateAtMidnight, cellValue) {
                                /** @type {?} */
                                var dateCellValue = new Date(cellValue);
                                /** @type {?} */
                                var dateFilter = new Date(filterLocalDateAtMidnight);
                                if (dateCellValue.getTime() < dateFilter.getTime()) {
                                    return -1;
                                }
                                else if (dateCellValue.getTime() > dateFilter.getTime()) {
                                    return 1;
                                }
                                else {
                                    return 0;
                                }
                            },
                        },
                        suppressMenu: true
                    }
                },
                rowSelection: 'multiple',
                singleClickEdit: true,
                // suppressHorizontalScroll: true,
                localeTextFunc: function (key, defaultValue) {
                    /** @type {?} */
                    var data = _this.translate.instant(key);
                    return data === key ? defaultValue : data;
                }
            };
        }
        /**
         * @return {?}
         */
        DataGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.eventRefreshSubscription) {
                    this._eventRefreshSubscription = this.eventRefreshSubscription.subscribe(function () {
                        _this.getElements();
                    });
                }
                if (this.eventGetSelectedRowsSubscription) {
                    this._eventGetSelectedRowsSubscription = this.eventGetSelectedRowsSubscription.subscribe(function () {
                        _this.emitSelectedRows();
                    });
                }
            };
        /**
         * @param {?} params
         * @return {?}
         */
        DataGridComponent.prototype.onGridReady = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                if (this.singleSelection) {
                    this.gridOptions.rowSelection = 'single';
                }
                this.params = params;
                this.gridApi = params.api;
                this.gridColumnApi = params.columnApi;
                this.getElements();
                this.gridApi.sizeColumnsToFit();
                try {
                    for (var _a = __values(this.columnDefs), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var col = _b.value;
                        if (col.field === 'estat') {
                            this.statusColumn = true;
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                var e_1, _c;
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.emitSelectedRows = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var selectedNodes = this.gridApi.getSelectedNodes();
                /** @type {?} */
                var selectedData = selectedNodes.map(function (node) { return node.data; });
                this.getSelectedRows.emit(selectedData);
            };
        /**
         * @param {?} columnkeys
         * @return {?}
         */
        DataGridComponent.prototype.getColumnKeysAndHeaders = /**
         * @param {?} columnkeys
         * @return {?}
         */
            function (columnkeys) {
                /** @type {?} */
                var header = [];
                if (this.columnDefs.length == 0) {
                    return '';
                }
                /** @type {?} */
                var allColumnKeys = this.gridOptions.columnApi.getAllDisplayedColumns();
                console.log(allColumnKeys);
                allColumnKeys.forEach(function (element) {
                    if (element.userProvidedColDef.headerName !== '') {
                        columnkeys.push(element.userProvidedColDef.field);
                        header.push(element.userProvidedColDef.headerName);
                    }
                });
                return header.join(",");
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.exportData = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var columnkeys = [];
                /** @type {?} */
                var customHeader = '';
                customHeader = this.getColumnKeysAndHeaders(columnkeys);
                console.log(this.gridApi);
                /** @type {?} */
                var params = {
                    onlySelected: true,
                    columnKeys: columnkeys,
                    customHeader: customHeader,
                    skipHeader: true
                };
                this.gridApi.exportDataAsCsv(params);
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.quickSearch = /**
         * @return {?}
         */
            function () {
                this.gridApi.setQuickFilter(this.searchValue);
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.getElements = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.getAll()
                    .subscribe(function (items) {
                    _this.rowData = items;
                    setTimeout(function () { _this.gridApi.sizeColumnsToFit(); }, 30);
                    _this.gridApi.setRowData(_this.rowData);
                    console.log(_this.rowData);
                });
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.removeData = /**
         * @return {?}
         */
            function () {
                this.gridApi.stopEditing(false);
                /** @type {?} */
                var selectedNodes = this.gridApi.getSelectedNodes();
                /** @type {?} */
                var selectedData = selectedNodes.map(function (node) { return node.data; });
                this.remove.emit(selectedData);
                if (this.statusColumn) {
                    /** @type {?} */
                    var selectedRows = selectedNodes.map(function (node) { return node.rowIndex; });
                    try {
                        for (var selectedRows_1 = __values(selectedRows), selectedRows_1_1 = selectedRows_1.next(); !selectedRows_1_1.done; selectedRows_1_1 = selectedRows_1.next()) {
                            var id = selectedRows_1_1.value;
                            this.gridApi.getRowNode(id).data.estat = 'Eliminat';
                        }
                    }
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (selectedRows_1_1 && !selectedRows_1_1.done && (_a = selectedRows_1.return))
                                _a.call(selectedRows_1);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                    this.gridOptions.api.refreshCells();
                }
                this.gridOptions.api.deselectAll();
                var e_2, _a;
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.newData = /**
         * @return {?}
         */
            function () {
                this.gridApi.stopEditing(false);
                this.new.emit(-1);
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.applyChanges = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var itemsChanged = [];
                this.gridApi.stopEditing(false);
                try {
                    for (var _a = __values(this.changesMap.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var key = _b.value;
                        itemsChanged.push(this.gridApi.getRowNode(key).data);
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                this.sendChanges.emit(itemsChanged);
                this.changesMap.clear();
                this.changeCounter = 0;
                this.previousChangeCounter = 0;
                this.redoCounter = 0;
                this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
                this.gridApi.redrawRows();
                var e_3, _c;
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.deleteChanges = /**
         * @return {?}
         */
            function () {
                for (var i = 0; i < this.changeCounter; i++) {
                    this.gridApi.undoCellEditing();
                }
                this.changesMap.clear();
                this.previousChangeCounter = 0;
                this.changeCounter = 0;
                this.redoCounter = 0;
                this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
                this.gridApi.redrawRows();
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.onFilterModified = /**
         * @return {?}
         */
            function () {
                this.deleteChanges();
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.undo = /**
         * @return {?}
         */
            function () {
                this.gridApi.stopEditing(false);
                this.gridApi.undoCellEditing();
                this.changeCounter -= 1;
                this.redoCounter += 1;
            };
        /**
         * @return {?}
         */
        DataGridComponent.prototype.redo = /**
         * @return {?}
         */
            function () {
                this.gridApi.stopEditing(false);
                this.gridApi.redoCellEditing();
                this.changeCounter += 1;
                this.redoCounter -= 1;
            };
        /**
         * @param {?} e
         * @return {?}
         */
        DataGridComponent.prototype.onCellEditingStopped = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (this.modificationChange) {
                    this.changeCounter++;
                    this.redoCounter = 0;
                    this.onCellValueChanged(e);
                    this.modificationChange = false;
                }
            };
        /**
         * @param {?} params
         * @return {?}
         */
        DataGridComponent.prototype.onCellValueChanged = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                this.params = params;
                if (this.changeCounter > this.previousChangeCounter) {
                    if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                        if (!this.changesMap.has(params.node.id)) {
                            /** @type {?} */
                            var addMap = new Map();
                            addMap.set(params.colDef.field, 1);
                            this.changesMap.set(params.node.id, addMap);
                        }
                        else {
                            if (!this.changesMap.get(params.node.id).has(params.colDef.field)) {
                                this.changesMap.get(params.node.id).set(params.colDef.field, 1);
                            }
                            else {
                                /** @type {?} */
                                var currentChanges = this.changesMap.get(params.node.id).get(params.colDef.field);
                                this.changesMap.get(params.node.id).set(params.colDef.field, (currentChanges + 1));
                            }
                        }
                        this.paintCells(params, this.changesMap); //We paint the row of the edited cell
                        this.previousChangeCounter++; //We match the current previousChangeCounter with changeCounter
                    }
                }
                else if (this.changeCounter < this.previousChangeCounter) {
                    /** @type {?} */
                    var currentChanges = -1;
                    if (this.changesMap.has(params.node.id)) {
                        currentChanges = this.changesMap.get(params.node.id).get(params.colDef.field);
                    }
                    if (currentChanges === 1) {
                        //Once the undo it's done, cell is in his initial status
                        this.changesMap.get(params.node.id).delete(params.colDef.field);
                        if (this.changesMap.get(params.node.id).size === 0) {
                            // No more modifications in this row
                            this.changesMap.delete(params.node.id);
                            /** @type {?} */
                            var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                            // We paint it white
                            this.gridApi.redrawRows({ rowNodes: [row] });
                        }
                        else {
                            this.paintCells(params, this.changesMap);
                        }
                    }
                    else if (currentChanges > 1) {
                        //We can't do else because we can be doing an undo without changes
                        this.changesMap.get(params.node.id).set(params.colDef.field, (currentChanges - 1));
                        this.paintCells(params, this.changesMap); //Not initial state -> green background
                    }
                    this.previousChangeCounter--; //We decrement previousChangeCounter because we have done undo
                }
                else {
                    // Control of modifications without changes
                    if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                        this.modificationChange = true;
                    }
                    else {
                        if (this.changesMap.has(params.node.id)) {
                            if (!this.undoNoChanges) {
                                this.gridApi.undoCellEditing(); // Undo to delete the change without changes internally
                                this.undoNoChanges = true;
                                this.paintCells(params, this.changesMap); //The cell has modifications yet -> green background
                            }
                            else {
                                this.undoNoChanges = false;
                            }
                        }
                        else {
                            //With the internally undo will enter at this function, so we have to control when done the undo or not
                            if (!this.undoNoChanges) {
                                this.gridApi.undoCellEditing(); // Undo to delete the change internally
                                this.undoNoChanges = true;
                            }
                            else {
                                this.undoNoChanges = false;
                            }
                        }
                    }
                }
            };
        /**
         * @param {?} api
         * @param {?} colId
         * @return {?}
         */
        DataGridComponent.prototype.getColumnIndexByColId = /**
         * @param {?} api
         * @param {?} colId
         * @return {?}
         */
            function (api, colId) {
                return api.getAllColumns().findIndex(function (col) { return col.getColId() === colId; });
            };
        /**
         * @param {?} params
         * @param {?} changesMap
         * @return {?}
         */
        DataGridComponent.prototype.paintCells = /**
         * @param {?} params
         * @param {?} changesMap
         * @return {?}
         */
            function (params, changesMap) {
                /** @type {?} */
                var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                this.changeCellStyleColumns(params, changesMap, '#E8F1DE');
                this.gridApi.redrawRows({ rowNodes: [row] });
                this.changeCellStyleColumns(params, changesMap, '#FFFFFF');
                // We will define cellStyle white to future modifications (like filter)
            };
        /**
         * @param {?} params
         * @param {?} changesMap
         * @param {?} color
         * @return {?}
         */
        DataGridComponent.prototype.changeCellStyleColumns = /**
         * @param {?} params
         * @param {?} changesMap
         * @param {?} color
         * @return {?}
         */
            function (params, changesMap, color) {
                try {
                    for (var _a = __values(changesMap.get(params.node.id).keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var key = _b.value;
                        /** @type {?} */
                        var columnNumber = this.getColumnIndexByColId(this.gridColumnApi, key);
                        this.gridColumnApi.columnController.gridColumns[columnNumber].colDef.cellStyle = { backgroundColor: color };
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
                }
                var e_4, _c;
            };
        DataGridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-data-grid',
                        template: "    <div id=grup1 class=\"editDivBtns\">\n        <span *ngIf=\"title\"  [translate]=\"title\"> </span>\n        <button  mat-mini-fab class=\"editBtn\"  *ngIf=\"discardChangesButton\"  id=\"deleteChangesButton\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"changeCounter <= 0\">\n            <mat-icon  fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"undoButton\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"redoButton\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"redoCounter <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"applyChangesButton\"  id=\"applyChangesButton\"  (click)=\"applyChanges()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 class=\"actionsDivBtns\" >\n        <label *ngIf=\"globalSearch\" [translate]=\"'Search'\"> </label>\n        <input *ngIf=\"globalSearch\"type=\"text\" class=\"searchGenericInput\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"deleteButton\"  mat-stroked-button id=\"deleteButton\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            <span  [translate]=\"'Remove'\"> </span>\n            \n        </button>\n\n        \n        <button *ngIf=\"actionButton\"  mat-stroked-button [matMenuTriggerFor]=\"menu\" id=\"actionButton\">\n            <span  [translate]=\"'Actions'\"> </span>    \n            <mat-icon fontSet=\"material-icons-round\" > keyboard_arrow_down </mat-icon>     \n        </button>\n        <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item (click)=\"exportData()\" > {{\"Export\" | translate}} </button>\n            <button mat-menu-item (click)=\"emitSelectedRows()\"> {{\"Duplicate\" | translate}}</button>\n            <button mat-menu-item> {{\"Search/Replace\" | translate}}</button>\n        </mat-menu>  \n            \n\n        <button  *ngIf=\"newButton\" mat-stroked-button id=\"newButton\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'New'\"> </span>           \n        </button>\n\n        <button  *ngIf=\"addButton\" mat-stroked-button id=\"newButton\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'Add'\"> </span>           \n        </button>\n        \n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            [class]=\"themeGrid\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            [frameworkComponents]=\"frameworkComponents\"\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
                        styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#newButton{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#deleteButton{background:no-repeat padding-box #fff;margin-left:3px}#actionButton{background:no-repeat padding-box #fff;margin-left:3px;text-align:center!important}#applyChangesButton{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#applyChangesButton[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#deleteChangesButton{color:#fff!important;background:#df3133}#deleteChangesButton[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{margin-left:10px;text-align:start;width:130px;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:calc(100% - 140px);height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:45%!important}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-thumb{background:#eee}\u200B .ag-body-viewport.ag-layout-normal ::-webkit-scrollbar{width:2em;height:2em}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-button{background:#ccc}.ag-body-viewport.ag-layout-normal::-webkit-scrollbar-track-piece{background:#888}"]
                    },] },
        ];
        /** @nocollapse */
        DataGridComponent.ctorParameters = function () {
            return [
                { type: core$1.TranslateService }
            ];
        };
        DataGridComponent.propDecorators = {
            eventRefreshSubscription: [{ type: core.Input }],
            eventGetSelectedRowsSubscription: [{ type: core.Input }],
            frameworkComponents: [{ type: core.Input }],
            columnDefs: [{ type: core.Input }],
            getAll: [{ type: core.Input }],
            discardChangesButton: [{ type: core.Input }],
            undoButton: [{ type: core.Input }],
            redoButton: [{ type: core.Input }],
            applyChangesButton: [{ type: core.Input }],
            deleteButton: [{ type: core.Input }],
            newButton: [{ type: core.Input }],
            actionButton: [{ type: core.Input }],
            addButton: [{ type: core.Input }],
            globalSearch: [{ type: core.Input }],
            themeGrid: [{ type: core.Input }],
            singleSelection: [{ type: core.Input }],
            title: [{ type: core.Input }],
            remove: [{ type: core.Output }],
            new: [{ type: core.Output }],
            sendChanges: [{ type: core.Output }],
            getSelectedRows: [{ type: core.Output }]
        };
        return DataGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BtnEditRenderedComponent = (function () {
        function BtnEditRenderedComponent() {
        }
        /**
         * @param {?} params
         * @return {?}
         */
        BtnEditRenderedComponent.prototype.agInit = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                this.params = params;
            };
        /**
         * @param {?} params
         * @return {?}
         */
        BtnEditRenderedComponent.prototype.refresh = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                return true;
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        BtnEditRenderedComponent.prototype.btnClickedHandler = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.params.clicked(this.params.value);
            };
        /**
         * @return {?}
         */
        BtnEditRenderedComponent.prototype.getParams = /**
         * @return {?}
         */
            function () {
                return this.params;
            };
        /**
         * @return {?}
         */
        BtnEditRenderedComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                // no need to remove the button click handler
            };
        BtnEditRenderedComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-btn-edit-rendered',
                        template: "<button mat-mini-fab class=\"buttonEdit\"  type=\"button\"  (click)=\"btnClickedHandler($event)\" >\n  <mat-icon class=\"iconEdit\"   fontSet=\"material-icons-round\" > edit </mat-icon>\n</button> ",
                        styles: [".buttonEdit{color:#000;background-color:#ddd;width:20px;margin-top:3px;height:20px;box-shadow:none}.iconEdit{font-size:13px;margin-top:-10px;margin-left:-2px}"]
                    },] },
        ];
        return BtnEditRenderedComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DialogGridComponent = (function () {
        function DialogGridComponent(dialogRef) {
            this.dialogRef = dialogRef;
            this.getAllRows = new rxjs.Subject();
            this.allRowsReceived = [];
            this.joinTables = new core.EventEmitter();
            this.tablesReceivedCounter = 0;
        }
        /**
         * @return {?}
         */
        DialogGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.addButtonClickedSubscription) {
                    this._addButtonClickedSubscription = this.addButtonClickedSubscription.subscribe(function () {
                        _this.getAllSelectedRows();
                    });
                }
            };
        /**
         * @return {?}
         */
        DialogGridComponent.prototype.getAllSelectedRows = /**
         * @return {?}
         */
            function () {
                this.getAllRows.next(true);
            };
        /**
         * @param {?} data
         * @return {?}
         */
        DialogGridComponent.prototype.joinRowsReceived = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                this.allRowsReceived.push(data);
                this.tablesReceivedCounter++;
                if (this.tablesReceivedCounter === this.getAllsTable.length) {
                    this.doAdd(this.allRowsReceived);
                    console.log(this.allRowsReceived);
                }
            };
        /**
         * @param {?} rowsToAdd
         * @return {?}
         */
        DialogGridComponent.prototype.doAdd = /**
         * @param {?} rowsToAdd
         * @return {?}
         */
            function (rowsToAdd) {
                this.dialogRef.close({ event: 'Add', data: rowsToAdd });
            };
        /**
         * @return {?}
         */
        DialogGridComponent.prototype.closeDialog = /**
         * @return {?}
         */
            function () {
                this.dialogRef.close({ event: 'Cancel' });
            };
        DialogGridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-dialog-grid',
                        template: "<h2 mat-dialog-title>{{title}}</h2>\n<mat-dialog-content >\n  <div *ngFor=\"let getAll of getAllsTable; let i = index\" style=\"width: 450px; height: 300px;  margin: 50px;\">\n    <app-data-grid \n    [columnDefs]=\"columnDefsTable[i]\" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true [singleSelection]=\"singleSelectionTable[i]\"\n    [title]=\"titlesTable[i]\" [eventGetSelectedRowsSubscription]=\"getAllRows.asObservable()\" (getSelectedRows)='joinRowsReceived($event)' >\n    </app-data-grid>\n  </div>\n</mat-dialog-content>\n<div mat-dialog-actions align=\"end\">\n  <button mat-button  (click)=\"closeDialog()\">{{\"Cancel\" | translate}}</button>\n  <button mat-button  (click)=\"getAllSelectedRows()\" cdkFocusInitial>{{\"Add\" | translate}}</button>\n</div>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DialogGridComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef }
            ];
        };
        DialogGridComponent.propDecorators = {
            joinTables: [{ type: core.Output }]
        };
        return DialogGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    common.registerLocaleData(localeCa, 'ca');
    common.registerLocaleData(localeEs, 'es');
    /**
     * Load translation assets
     * @param {?} http
     * @return {?}
     */
    function createTranslateLoader(http$$1) {
        return new httpLoader.TranslateHttpLoader(http$$1, '../assets/i18n/', '.json');
    }
    var ɵ0 = (createTranslateLoader);
    /**
     * SITMUN plugin core module
     */
    var SitmunFrontendGuiModule = (function () {
        function SitmunFrontendGuiModule() {
        }
        SitmunFrontendGuiModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            router.RouterModule,
                            http.HttpClientModule,
                            common.CommonModule,
                            forms.FormsModule,
                            animations.NoopAnimationsModule,
                            frontendCore.AngularHalModule,
                            forms.ReactiveFormsModule,
                            animations.BrowserAnimationsModule,
                            angular.AgGridModule.withComponents([]),
                            frontendCore.SitmunFrontendCoreModule,
                            button.MatButtonModule,
                            icon.MatIconModule,
                            menu.MatMenuModule,
                            dialog.MatDialogModule,
                            core$1.TranslateModule.forRoot({
                                loader: {
                                    provide: core$1.TranslateLoader,
                                    useFactory: ɵ0,
                                    deps: [http.HttpClient]
                                }
                            })
                        ],
                        declarations: [
                            DataGridComponent,
                            BtnEditRenderedComponent,
                            DialogGridComponent,
                        ],
                        entryComponents: [],
                        providers: [],
                        exports: [
                            http.HttpClientModule,
                            common.CommonModule,
                            forms.FormsModule,
                            animations.NoopAnimationsModule,
                            frontendCore.AngularHalModule,
                            core$1.TranslateModule,
                            forms.ReactiveFormsModule,
                            DataGridComponent,
                            DialogGridComponent,
                            frontendCore.SitmunFrontendCoreModule
                        ]
                    },] },
        ];
        return SitmunFrontendGuiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.DataGridComponent = DataGridComponent;
    exports.createTranslateLoader = createTranslateLoader;
    exports.SitmunFrontendGuiModule = SitmunFrontendGuiModule;
    exports.BtnEditRenderedComponent = BtnEditRenderedComponent;
    exports.DialogGridComponent = DialogGridComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGlhbG9nLWdyaWQvZGlhbG9nLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLnRocm93KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn0iLCJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgQ29sdW1uQXBpLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYCAgICA8ZGl2IGlkPWdydXAxIGNsYXNzPVwiZWRpdERpdkJ0bnNcIj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cInRpdGxlXCIgIFt0cmFuc2xhdGVdPVwidGl0bGVcIj4gPC9zcGFuPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJkaXNjYXJkQ2hhbmdlc0J1dHRvblwiICBpZD1cImRlbGV0ZUNoYW5nZXNCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY2hhbmdlQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiAgZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjbG9zZSA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwidW5kb0J1dHRvblwiICBpZD1cInVuZG9cIiAgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIiA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHVuZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cInJlZG9CdXR0b25cIiAgaWQ9XCJyZWRvXCIgIChjbGljayk9XCJyZWRvKClcIiBbZGlzYWJsZWRdPVwicmVkb0NvdW50ZXIgPD0gMFwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiByZWRvIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJhcHBseUNoYW5nZXNCdXR0b25cIiAgaWQ9XCJhcHBseUNoYW5nZXNCdXR0b25cIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJnbG9iYWxTZWFyY2hcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiZ2xvYmFsU2VhcmNoXCJ0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoR2VuZXJpY0lucHV0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZGVsZXRlQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImRlbGV0ZUJ1dHRvblwiICAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInUmVtb3ZlJ1wiPiA8L3NwYW4+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiYWN0aW9uQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGlkPVwiYWN0aW9uQnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidBY3Rpb25zJ1wiPiA8L3NwYW4+ICAgIFxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBrZXlib2FyZF9hcnJvd19kb3duIDwvbWF0LWljb24+ICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiZXhwb3J0RGF0YSgpXCIgPiB7e1wiRXhwb3J0XCIgfCB0cmFuc2xhdGV9fSA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJlbWl0U2VsZWN0ZWRSb3dzKClcIj4ge3tcIkR1cGxpY2F0ZVwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPiB7e1wiU2VhcmNoL1JlcGxhY2VcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgICAgICAgPC9tYXQtbWVudT4gIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInTmV3J1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJhZGRCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInQWRkJ1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgXHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBzdHlsZT1cIiBoZWlnaHQ6IDEwMCVcIj5cclxuICAgICAgICA8ZGl2IGlkPVwibXlHcmlkXCIgc3R5bGU9XCIgd2lkdGg6MTAwJTsgaGVpZ2h0OiAxMDAlXCIgPlxyXG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXHJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcclxuICAgICAgICAgICAgW2NsYXNzXT1cInRoZW1lR3JpZFwiXHJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3Jvd0RhdGFdPVwicm93RGF0YVwiXHJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxyXG4gICAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxyXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcclxuICAgICAgICAgICAgW3VuZG9SZWRvQ2VsbEVkaXRpbmddPVwidHJ1ZVwiICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXHJcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXHJcbiAgICAgICAgICAgIFtlbmFibGVDZWxsQ2hhbmdlRmxhc2hdPXRydWVcclxuICAgICAgICAgICAgW2ZyYW1ld29ya0NvbXBvbmVudHNdPVwiZnJhbWV3b3JrQ29tcG9uZW50c1wiXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGlvbj1cIm11bHRpcGxlXCJcclxuICAgICAgICAgICAgKGZpbHRlck1vZGlmaWVkKT1cIm9uRmlsdGVyTW9kaWZpZWQoKVwiXHJcbiAgICAgICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICAoY2VsbFZhbHVlQ2hhbmdlZCk9XCJvbkNlbGxWYWx1ZUNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG5gLFxyXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jbmV3QnV0dG9ue2NvbG9yOiNmZmY7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I2RlbGV0ZUJ1dHRvbntiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYWN0aW9uQnV0dG9ue2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICNmZmY7bWFyZ2luLWxlZnQ6M3B4O3RleHQtYWxpZ246Y2VudGVyIWltcG9ydGFudH0jYXBwbHlDaGFuZ2VzQnV0dG9ue2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNhcHBseUNoYW5nZXNCdXR0b25bZGlzYWJsZWRde2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM4Mzk3NmN9I3JlZG8sI3VuZG97Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jcmVkb1tkaXNhYmxlZF0sI3VuZG9bZGlzYWJsZWRde2JhY2tncm91bmQ6I2ZmYzk3ZjttYXJnaW4tbGVmdDozcHh9I2RlbGV0ZUNoYW5nZXNCdXR0b257Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZGYzMTMzfSNkZWxldGVDaGFuZ2VzQnV0dG9uW2Rpc2FibGVkXXtjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkYThjOGV9LmVkaXREaXZCdG5ze21hcmdpbi1sZWZ0OjEwcHg7dGV4dC1hbGlnbjpzdGFydDt3aWR0aDoxMzBweDtoZWlnaHQ6MzBweCFpbXBvcnRhbnQ7bGluZS1oZWlnaHQ6MzBweCFpbXBvcnRhbnR9LmFjdGlvbnNEaXZCdG5ze3RleHQtYWxpZ246ZW5kO3dpZHRoOmNhbGMoMTAwJSAtIDE0MHB4KTtoZWlnaHQ6NjBweH0uYWN0aW9uc0RpdkJ0bnMsLmVkaXREaXZCdG5ze2Rpc3BsYXk6aW5saW5lLWJsb2NrIWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnMgLm1hdC1zdHJva2VkLWJ1dHRvbntwYWRkaW5nOjVweCAyMHB4IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1taW5pLWZhYiAubWF0LWJ1dHRvbi13cmFwcGVye3BhZGRpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7ZGlzcGxheTppbmhlcml0IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1pY29ue2hlaWdodDozMHB4IWltcG9ydGFudDtib3R0b206NXB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFie3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHh9LmFjdGlvbnNEaXZCdG5zIC5zZWFyY2hHZW5lcmljSW5wdXR7aGVpZ2h0OjQ1cHghaW1wb3J0YW50O3dpZHRoOjQ1JSFpbXBvcnRhbnR9LmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQ6I2VlZX3DosKAwosgLmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjJlbTtoZWlnaHQ6MmVtfS5hZy1ib2R5LXZpZXdwb3J0LmFnLWxheW91dC1ub3JtYWwgOjotd2Via2l0LXNjcm9sbGJhci1idXR0b257YmFja2dyb3VuZDojY2NjfS5hZy1ib2R5LXZpZXdwb3J0LmFnLWxheW91dC1ub3JtYWw6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLXBpZWNle2JhY2tncm91bmQ6Izg4OH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gXHJcbiAgcHJpdmF0ZSBfZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZXZlbnRHZXRTZWxlY3RlZFJvd3NTdWJzY3JpcHRpb246IGFueTtcclxuICBtb2R1bGVzOiBNb2R1bGVbXSA9IEFsbENvbW11bml0eU1vZHVsZXM7XHJcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcclxuICBwcml2YXRlIGdyaWRBcGk7XHJcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xyXG4gIHN0YXR1c0NvbHVtbiA9IGZhbHNlO1xyXG4gIGNoYW5nZXNNYXA6IE1hcDxudW1iZXIsIE1hcDxzdHJpbmcsIG51bWJlcj4+ID0gbmV3IE1hcDxudW1iZXIsIE1hcDxzdHJpbmcsIG51bWJlcj4+KCk7XHJcbiAgIC8vIFdlIHdpbGwgc2F2ZSB0aGUgaWQgb2YgZWRpdGVkIGNlbGxzIGFuZCB0aGUgbnVtYmVyIG9mIGVkaXRpb25zIGRvbmUuXHJcbiAgcHJpdmF0ZSBwYXJhbXM7IC8vIExhc3QgcGFyYW1ldGVycyBvZiB0aGUgZ3JpZCAoaW4gY2FzZSB3ZSBkbyBhcHBseSBjaGFuZ2VzIHdlIHdpbGwgbmVlZCBpdCkgXHJcbiAgcm93RGF0YTogYW55W107XHJcbiAgY2hhbmdlQ291bnRlcjogbnVtYmVyOyAvLyBOdW1iZXIgb2YgZWRpdGlvbnMgZG9uZSBhYm92ZSBhbnkgY2VsbCBcclxuICBwcmV2aW91c0NoYW5nZUNvdW50ZXI6IG51bWJlcjsgLy8gTnVtYmVyIG9mIGRpdGlvbnMgZG9uZSBhZnRlciB0aGUgbGFzdCBtb2RpZmljYXRpb24oY2hhbmdlQ291bnRlcilcclxuICByZWRvQ291bnRlcjogbnVtYmVyOyAvLyBOdW1iZXIgb2YgcmVkbyB3ZSBjYW4gZG9cclxuICBtb2RpZmljYXRpb25DaGFuZ2UgPSBmYWxzZTtcclxuICB1bmRvTm9DaGFuZ2VzID0gZmFsc2U7IC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgYW4gdW5kbyBoYXNuJ3QgbW9kaWZpY2F0aW9uc1xyXG4gIGdyaWRPcHRpb25zO1xyXG5cclxuICBASW5wdXQoKSBldmVudFJlZnJlc2hTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcclxuICBASW5wdXQoKSBldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZSA8Ym9vbGVhbj4gO1xyXG4gIEBJbnB1dCgpIGZyYW1ld29ya0NvbXBvbmVudHM6IGFueTtcclxuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBhbnlbXTtcclxuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcclxuICBASW5wdXQoKSBkaXNjYXJkQ2hhbmdlc0J1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSB1bmRvQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHJlZG9CdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYXBwbHlDaGFuZ2VzQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRlbGV0ZUJ1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuZXdCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYWN0aW9uQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFkZEJ1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBnbG9iYWxTZWFyY2g6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdGhlbWVHcmlkOiBhbnk7XHJcbiAgQElucHV0KCkgc2luZ2xlU2VsZWN0aW9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG5cclxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xyXG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcclxuICBAT3V0cHV0KCkgZ2V0U2VsZWN0ZWRSb3dzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgdGhpcy50cmFuc2xhdGUgPSB0cmFuc2xhdGU7XHJcblxyXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmdldFNlbGVjdGVkUm93cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7XHJcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcclxuICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICBjZWxsU3R5bGU6IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ30sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtblR5cGVzOiB7XHJcbiAgICAgICAgZGF0ZUNvbHVtbjoge1xyXG4gICAgICAgICAgICBmaWx0ZXI6ICdhZ0RhdGVDb2x1bW5GaWx0ZXInLFxyXG4gICAgICAgICAgICBmaWx0ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICBjb21wYXJhdG9yKGZpbHRlckxvY2FsRGF0ZUF0TWlkbmlnaHQsIGNlbGxWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZUNlbGxWYWx1ZSA9IG5ldyBEYXRlKGNlbGxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlRmlsdGVyID0gbmV3IERhdGUoZmlsdGVyTG9jYWxEYXRlQXRNaWRuaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGVDZWxsVmFsdWUuZ2V0VGltZSgpIDwgZGF0ZUZpbHRlci5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlQ2VsbFZhbHVlLmdldFRpbWUoKSAgPiBkYXRlRmlsdGVyLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1cHByZXNzTWVudTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcclxuICAgICAgc2luZ2xlQ2xpY2tFZGl0OiB0cnVlLFxyXG4gICAgICAvLyBzdXBwcmVzc0hvcml6b250YWxTY3JvbGw6IHRydWUsXHJcbiAgICAgIGxvY2FsZVRleHRGdW5jOiAoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoa2V5KTtcclxuICAgICAgICByZXR1cm4gZGF0YSA9PT0ga2V5ID8gZGVmYXVsdFZhbHVlIDogZGF0YTtcclxuICAgIH1cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIG5nT25Jbml0KCl7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50UmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmV2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdFNlbGVjdGVkUm93cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xyXG4gICAgaWYgKHRoaXMuc2luZ2xlU2VsZWN0aW9uKSB7dGhpcy5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb24gPSAnc2luZ2xlJ31cclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcclxuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XHJcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XHJcbiAgICB0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xyXG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5jb2x1bW5EZWZzKSB7XHJcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcclxuICAgICAgICB0aGlzLnN0YXR1c0NvbHVtbiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGVtaXRTZWxlY3RlZFJvd3MoKTogdm9pZHtcclxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xyXG4gICAgdGhpcy5nZXRTZWxlY3RlZFJvd3MuZW1pdChzZWxlY3RlZERhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uS2V5c0FuZEhlYWRlcnMoY29sdW1ua2V5czogQXJyYXk8YW55Pik6IFN0cmluZ3sgICAgXHJcbiAgICBsZXQgaGVhZGVyOkFycmF5PGFueT4gPSBbXTtcclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZnMubGVuZ3RoID09IDApIHtyZXR1cm4gJyd9O1xyXG5cclxuICAgIGxldCBhbGxDb2x1bW5LZXlzPXRoaXMuZ3JpZE9wdGlvbnMuY29sdW1uQXBpLmdldEFsbERpc3BsYXllZENvbHVtbnMoKTtcclxuICAgIGNvbnNvbGUubG9nKGFsbENvbHVtbktleXMpO1xyXG4gICAgYWxsQ29sdW1uS2V5cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnVzZXJQcm92aWRlZENvbERlZi5oZWFkZXJOYW1lICE9PSAnJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb2x1bW5rZXlzLnB1c2goZWxlbWVudC51c2VyUHJvdmlkZWRDb2xEZWYuZmllbGQpO1xyXG4gICAgICAgICAgaGVhZGVyLnB1c2goZWxlbWVudC51c2VyUHJvdmlkZWRDb2xEZWYuaGVhZGVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gaGVhZGVyLmpvaW4oXCIsXCIpO1xyXG4gIH1cclxuXHJcblxyXG4gIGV4cG9ydERhdGEoKTogdm9pZHtcclxuICAgIGxldCBjb2x1bW5rZXlzOkFycmF5PGFueT4gPSBbXTtcclxuICAgIGxldCBjdXN0b21IZWFkZXI6U3RyaW5nID0gJyc7XHJcbiAgICBjdXN0b21IZWFkZXIgPSB0aGlzLmdldENvbHVtbktleXNBbmRIZWFkZXJzKGNvbHVtbmtleXMpXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWRBcGkpO1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICBvbmx5U2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgY29sdW1uS2V5czogY29sdW1ua2V5cyxcclxuICAgICAgICBjdXN0b21IZWFkZXI6IGN1c3RvbUhlYWRlcixcclxuICAgICAgICBza2lwSGVhZGVyOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5ncmlkQXBpLmV4cG9ydERhdGFBc0NzdihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcXVpY2tTZWFyY2goKTogdm9pZHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcclxufVxyXG5cclxuICBnZXRFbGVtZW50cygpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5nZXRBbGwoKVxyXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcclxuICAgICAgICB0aGlzLnJvd0RhdGEgPSBpdGVtcztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKX0sIDMwKTtcclxuICAgICAgICB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YSh0aGlzLnJvd0RhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm93RGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XHJcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XHJcblxyXG4gICAgaWYodGhpcy5zdGF0dXNDb2x1bW4pXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5yb3dJbmRleCk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShpZCkuZGF0YS5lc3RhdCA9J0VsaW1pbmF0JztcclxuICAgICAgICB9XHJcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuZGVzZWxlY3RBbGwoKTtcclxuICB9XHJcblxyXG4gIG5ld0RhdGEoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLm5ldy5lbWl0KC0xKTtcclxuICB9XHJcblxyXG5cclxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmNoYW5nZXNNYXAua2V5cygpKVxyXG4gICAge1xyXG4gICAgICBpdGVtc0NoYW5nZWQucHVzaCh0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShrZXkpLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZW5kQ2hhbmdlcy5lbWl0KGl0ZW1zQ2hhbmdlZCk7XHJcbiAgICB0aGlzLmNoYW5nZXNNYXAuY2xlYXIoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcclxuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcclxuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGRlbGV0ZUNoYW5nZXMoKTogdm9pZFxyXG4gIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGFuZ2VDb3VudGVyOyBpKyspXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlc01hcC5jbGVhcigpO1xyXG4gICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xyXG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcclxuICB9XHJcblxyXG5cclxuICBvbkZpbHRlck1vZGlmaWVkKCk6IHZvaWR7XHJcbiAgICB0aGlzLmRlbGV0ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICB1bmRvKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciAtPSAxO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciArPSAxO1xyXG4gIH1cclxuXHJcbiAgcmVkbygpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XHJcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgKz0gMTtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgLT0gMTtcclxuICB9XHJcblxyXG5cclxuICBvbkNlbGxFZGl0aW5nU3RvcHBlZChlKVxyXG4gIHtcclxuICAgICAgaWYgKHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb3VudGVyKys7XHJcbiAgICAgICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XHJcbiAgICAgICAgdGhpcy5tb2RpZmljYXRpb25DaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xyXG5cclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyBcclxuICAgIGlmICh0aGlzLmNoYW5nZUNvdW50ZXIgPiB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcilcclxuICAgICAgLy8gVHJ1ZSBpZiB3ZSBoYXZlIGVkaXRlZCBzb21lIGNlbGwgb3Igd2UgaGF2ZSBkb25lIGEgcmVkbyBcclxuICAgICAge1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmICghIHRoaXMuY2hhbmdlc01hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBJZiBpdCdzIGZpcnRzIGVkaXQgb2YgYSBjZWxsLCB3ZSBhZGQgaXQgdG8gdGhlIG1hcCBhbmQgd2UgcGFpbnQgaXRcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgYWRkTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcclxuICAgICAgICAgICAgYWRkTWFwLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAxKVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCBhZGRNYXApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKCEgdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuaGFzKHBhcmFtcy5jb2xEZWYuZmllbGQpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAvLyBXZSBhbHJlYWR5IGhhZCBlZGl0ZWQgdGhpcyBjZWxsLCBzbyB3ZSBvbmx5IGluY3JlbWVudCBudW1iZXIgb2YgY2hhbmdlcyBvZiBpdCBvbiB0aGUgbWFwIFxyXG4gICAgICAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5nZXQocGFyYW1zLmNvbERlZi5maWVsZCk7XHJcbiAgICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5zZXQocGFyYW1zLmNvbERlZi5maWVsZCwgKGN1cnJlbnRDaGFuZ2VzICsgMSkpO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApOyAvL1dlIHBhaW50IHRoZSByb3cgb2YgdGhlIGVkaXRlZCBjZWxsIFxyXG4gICAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIrKzsgLy9XZSBtYXRjaCB0aGUgY3VycmVudCBwcmV2aW91c0NoYW5nZUNvdW50ZXIgd2l0aCBjaGFuZ2VDb3VudGVyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jaGFuZ2VDb3VudGVyIDwgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIpeyAvLyBUcnVlIGlmIHdlIGhhdmUgZG9uZSBhbiB1bmRvXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDaGFuZ2VzID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlc01hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSB7Y3VycmVudENoYW5nZXMgPSB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5nZXQocGFyYW1zLmNvbERlZi5maWVsZCk7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjdXJyZW50Q2hhbmdlcyA9PT0gMSkgeyAvL09uY2UgdGhlIHVuZG8gaXQncyBkb25lLCBjZWxsIGlzIGluIGhpcyBpbml0aWFsIHN0YXR1c1xyXG5cclxuICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLmRlbGV0ZShwYXJhbXMuY29sRGVmLmZpZWxkKTtcclxuICAgICAgICAgIGlmKHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNpemUgPT09IDApIHsgLy8gTm8gbW9yZSBtb2RpZmljYXRpb25zIGluIHRoaXMgcm93XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2UgcGFpbnQgaXQgd2hpdGVcclxuICAgICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xyXG5cclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDaGFuZ2VzID4xKSAvLyBUaGUgY2VsbCBpc24ndCBpbiBoaXMgaW5pdGlhbCBzdGF0ZSB5ZXRcclxuICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XZSBjYW4ndCBkbyBlbHNlIGJlY2F1c2Ugd2UgY2FuIGJlIGRvaW5nIGFuIHVuZG8gd2l0aG91dCBjaGFuZ2VzIFxyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuc2V0KHBhcmFtcy5jb2xEZWYuZmllbGQsIChjdXJyZW50Q2hhbmdlcyAtIDEpKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApOy8vTm90IGluaXRpYWwgc3RhdGUgLT4gZ3JlZW4gYmFja2dyb3VuZFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXItLTsgIC8vV2UgZGVjcmVtZW50IHByZXZpb3VzQ2hhbmdlQ291bnRlciBiZWNhdXNlIHdlIGhhdmUgZG9uZSB1bmRvXHJcbiAgICB9XHJcbiAgICBlbHNleyAvLyBDb250cm9sIG9mIG1vZGlmaWNhdGlvbnMgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgIGlmKHBhcmFtcy5vbGRWYWx1ZSAhPT0gcGFyYW1zLnZhbHVlICYmICEocGFyYW1zLm9sZFZhbHVlID09IG51bGwgJiYgcGFyYW1zLnZhbHVlID09PSAnJykgKSAvL0lzbid0IGEgbW9kaWZpY2F0aW9uIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RpZmljYXRpb25DaGFuZ2UgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7IFxyXG4gICAgICAgIGlmICggdGhpcy5jaGFuZ2VzTWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIC8vTW9kaWZpY2F0aW9uIHdpdGhvdXQgY2hhbmdlcyBpbiBlbiBlZGl0ZWQgY2VsbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKCF0aGlzLnVuZG9Ob0NoYW5nZXMpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTsgLy8gVW5kbyB0byBkZWxldGUgdGhlIGNoYW5nZSB3aXRob3V0IGNoYW5nZXMgaW50ZXJuYWxseSBcclxuICAgICAgICAgICAgdGhpcy51bmRvTm9DaGFuZ2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTsgIC8vVGhlIGNlbGwgaGFzIG1vZGlmaWNhdGlvbnMgeWV0IC0+IGdyZWVuIGJhY2tncm91bmQgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHsgdGhpcy51bmRvTm9DaGFuZ2VzID0gZmFsc2U7IH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vV2l0aCB0aGUgaW50ZXJuYWxseSB1bmRvIHdpbGwgZW50ZXIgYXQgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBjb250cm9sIHdoZW4gZG9uZSB0aGUgdW5kbyBvciBub3QgXHJcbiAgICAgICAgICBpZighdGhpcy51bmRvTm9DaGFuZ2VzKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7IC8vIFVuZG8gdG8gZGVsZXRlIHRoZSBjaGFuZ2UgaW50ZXJuYWxseVxyXG4gICAgICAgICAgICB0aGlzLnVuZG9Ob0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7IHRoaXMudW5kb05vQ2hhbmdlcyA9IGZhbHNlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkluZGV4QnlDb2xJZChhcGk6IENvbHVtbkFwaSwgY29sSWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gYXBpLmdldEFsbENvbHVtbnMoKS5maW5kSW5kZXgoY29sID0+IGNvbC5nZXRDb2xJZCgpID09PSBjb2xJZCk7XHJcbiAgfVxyXG4gIHBhaW50Q2VsbHMocGFyYW1zOiBhbnksICBjaGFuZ2VzTWFwOiBNYXA8bnVtYmVyLCBNYXA8c3RyaW5nLCBudW1iZXI+PiwgKVxyXG4gIHtcclxuICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VDZWxsU3R5bGVDb2x1bW5zKHBhcmFtcyxjaGFuZ2VzTWFwLCcjRThGMURFJyk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICB0aGlzLmNoYW5nZUNlbGxTdHlsZUNvbHVtbnMocGFyYW1zLGNoYW5nZXNNYXAsJyNGRkZGRkYnKTsgXHJcbiAgICAvLyBXZSB3aWxsIGRlZmluZSBjZWxsU3R5bGUgd2hpdGUgdG8gZnV0dXJlIG1vZGlmaWNhdGlvbnMgKGxpa2UgZmlsdGVyKVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ2VsbFN0eWxlQ29sdW1ucyhwYXJhbXM6IGFueSwgY2hhbmdlc01hcDogTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4sIGNvbG9yOiBzdHJpbmcpe1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IG9mIGNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbk51bWJlciA9IHRoaXMuZ2V0Q29sdW1uSW5kZXhCeUNvbElkKHRoaXMuZ3JpZENvbHVtbkFwaSwga2V5KTtcclxuICAgICAgdGhpcy5ncmlkQ29sdW1uQXBpLmNvbHVtbkNvbnRyb2xsZXIuZ3JpZENvbHVtbnNbY29sdW1uTnVtYmVyXS5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogY29sb3J9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJQ2VsbFJlbmRlcmVyQW5ndWxhckNvbXAgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYnRuLWVkaXQtcmVuZGVyZWQnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiYnV0dG9uRWRpdFwiICB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJidG5DbGlja2VkSGFuZGxlcigkZXZlbnQpXCIgPlxuICA8bWF0LWljb24gY2xhc3M9XCJpY29uRWRpdFwiICAgZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBlZGl0IDwvbWF0LWljb24+XG48L2J1dHRvbj4gYCxcbiAgc3R5bGVzOiBbYC5idXR0b25FZGl0e2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjojZGRkO3dpZHRoOjIwcHg7bWFyZ2luLXRvcDozcHg7aGVpZ2h0OjIwcHg7Ym94LXNoYWRvdzpub25lfS5pY29uRWRpdHtmb250LXNpemU6MTNweDttYXJnaW4tdG9wOi0xMHB4O21hcmdpbi1sZWZ0Oi0ycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50IGltcGxlbWVudHMgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wLCBPbkRlc3Ryb3kge1xuXG4gIHB1YmxpYyBwYXJhbXM6IGFueTtcblxuICBhZ0luaXQocGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIHJlZnJlc2gocGFyYW1zOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGJ0bkNsaWNrZWRIYW5kbGVyKCRldmVudCkge1xuICAgIHRoaXMucGFyYW1zLmNsaWNrZWQodGhpcy5wYXJhbXMudmFsdWUpO1xuICB9XG5cbiAgZ2V0UGFyYW1zKCl7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gbm8gbmVlZCB0byByZW1vdmUgdGhlIGJ1dHRvbiBjbGljayBoYW5kbGVyIFxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgX0dldEFsbHNUYWJsZTogIEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIF9jb2x1bW5EZWZzVGFibGU6IEFycmF5PGFueVtdPjtcbiAgX3NpbmdsZVNlbGVjdGlvblRhYmxlOiBBcnJheTxib29sZWFuPjtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGlhbG9nLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxoMiBtYXQtZGlhbG9nLXRpdGxlPnt7dGl0bGV9fTwvaDI+XG48bWF0LWRpYWxvZy1jb250ZW50ID5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgZ2V0QWxsIG9mIGdldEFsbHNUYWJsZTsgbGV0IGkgPSBpbmRleFwiIHN0eWxlPVwid2lkdGg6IDQ1MHB4OyBoZWlnaHQ6IDMwMHB4OyAgbWFyZ2luOiA1MHB4O1wiPlxuICAgIDxhcHAtZGF0YS1ncmlkIFxuICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNUYWJsZVtpXVwiIFt0aGVtZUdyaWRdPSd0aGVtZUdyaWQnICBbZ2V0QWxsXT0nZ2V0QWxsJyBbZ2xvYmFsU2VhcmNoXT10cnVlIFtzaW5nbGVTZWxlY3Rpb25dPVwic2luZ2xlU2VsZWN0aW9uVGFibGVbaV1cIlxuICAgIFt0aXRsZV09XCJ0aXRsZXNUYWJsZVtpXVwiIFtldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbl09XCJnZXRBbGxSb3dzLmFzT2JzZXJ2YWJsZSgpXCIgKGdldFNlbGVjdGVkUm93cyk9J2pvaW5Sb3dzUmVjZWl2ZWQoJGV2ZW50KScgPlxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cbiAgPC9kaXY+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAgKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIj57e1wiQ2FuY2VsXCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICA8YnV0dG9uIG1hdC1idXR0b24gIChjbGljayk9XCJnZXRBbGxTZWxlY3RlZFJvd3MoKVwiIGNka0ZvY3VzSW5pdGlhbD57e1wiQWRkXCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZ2V0QWxsUm93czogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0IDxib29sZWFuPigpO1xuICBwcml2YXRlIF9hZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHRhYmxlc1JlY2VpdmVkQ291bnRlcjogbnVtYmVyO1xuICBhbGxSb3dzUmVjZWl2ZWQ6IEFycmF5PGFueVtdPiA9IFtdO1xuXG4gIC8vSW5wdXRzXG4gIHRoZW1lR3JpZDogYW55O1xuICBnZXRBbGxzVGFibGU6IEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIGNvbHVtbkRlZnNUYWJsZTogQXJyYXk8YW55W10+O1xuICBzaW5nbGVTZWxlY3Rpb25UYWJsZTogQXJyYXk8Ym9vbGVhbj47XG4gIHRpdGxlc1RhYmxlOiBBcnJheTxzdHJpbmc+O1xuICBhZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBPYnNlcnZhYmxlIDxib29sZWFuPiA7XG5cbiAgLy9PdXRwdXRzXG4gIEBPdXRwdXQoKSBqb2luVGFibGVzIDogRXZlbnRFbWl0dGVyPEFycmF5PGFueVtdPj47XG5cbiAgXG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERpYWxvZ0dyaWRDb21wb25lbnQ+KSB7XG4gICAgXG4gICAgdGhpcy5qb2luVGFibGVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID0gMDtcbiAgIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2FkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24gPSB0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbGxTZWxlY3RlZFJvd3MoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0QWxsU2VsZWN0ZWRSb3dzKCkge1xuICAgIHRoaXMuZ2V0QWxsUm93cy5uZXh0KHRydWUpO1xuICB9XG5cbiAgam9pblJvd3NSZWNlaXZlZChkYXRhOiBhbnlbXSlcbiAge1xuICAgICAgdGhpcy5hbGxSb3dzUmVjZWl2ZWQucHVzaChkYXRhKTtcbiAgICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyKys7XG4gICAgICBpZih0aGlzLnRhYmxlc1JlY2VpdmVkQ291bnRlciA9PT0gdGhpcy5nZXRBbGxzVGFibGUubGVuZ3RoKVxuICAgICAge1xuICAgICAgICB0aGlzLmRvQWRkKHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxSb3dzUmVjZWl2ZWQpO1xuICAgICAgfVxuICB9XG5cbiAgZG9BZGQocm93c1RvQWRkKXtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7ZXZlbnQ6J0FkZCcsZGF0YTogcm93c1RvQWRkfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpe1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtldmVudDonQ2FuY2VsJ30pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBsb2NhbGVDYSBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9jYSc7XHJcbmltcG9ydCBsb2NhbGVFcyBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9lcyc7XHJcbmltcG9ydCB7IFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcbmltcG9ydCB7IERhdGFHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhLWdyaWQvZGF0YS1ncmlkLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBCdG5FZGl0UmVuZGVyZWRDb21wb25lbnQgfSBmcm9tICcuL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBUcmFuc2xhdGVIdHRwTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvaHR0cC1sb2FkZXInO1xyXG5pbXBvcnQgeyBEaWFsb2dHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQnO1xyXG5cclxuXHJcbnJlZ2lzdGVyTG9jYWxlRGF0YShsb2NhbGVDYSwgJ2NhJyk7XHJcbnJlZ2lzdGVyTG9jYWxlRGF0YShsb2NhbGVFcywgJ2VzJyk7XHJcblxyXG4vKiogTG9hZCB0cmFuc2xhdGlvbiBhc3NldHMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcihodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICcuLi9hc3NldHMvaTE4bi8nLCAnLmpzb24nKTtcclxufVxyXG5cclxuXHJcbi8qKiBTSVRNVU4gcGx1Z2luIGNvcmUgbW9kdWxlICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQWdHcmlkTW9kdWxlLndpdGhDb21wb25lbnRzKFtdKSxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBsb2FkZXI6IHtcclxuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXHJcbiAgICAgICAgdXNlRmFjdG9yeTogKGNyZWF0ZVRyYW5zbGF0ZUxvYWRlciksXHJcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIEJ0bkVkaXRSZW5kZXJlZENvbXBvbmVudCxcclxuICAgIERpYWxvZ0dyaWRDb21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgRGlhbG9nR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXSwibmFtZXMiOlsiQWxsQ29tbXVuaXR5TW9kdWxlcyIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJDb21wb25lbnQiLCJUcmFuc2xhdGVTZXJ2aWNlIiwiSW5wdXQiLCJPdXRwdXQiLCJTdWJqZWN0IiwiTWF0RGlhbG9nUmVmIiwicmVnaXN0ZXJMb2NhbGVEYXRhIiwiaHR0cCIsIlRyYW5zbGF0ZUh0dHBMb2FkZXIiLCJOZ01vZHVsZSIsIlJvdXRlck1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIk5vb3BBbmltYXRpb25zTW9kdWxlIiwiQW5ndWxhckhhbE1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIkFnR3JpZE1vZHVsZSIsIlNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0RGlhbG9nTW9kdWxlIiwiVHJhbnNsYXRlTW9kdWxlIiwiVHJhbnNsYXRlTG9hZGVyIiwiSHR0cENsaWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBc0Z5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENB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