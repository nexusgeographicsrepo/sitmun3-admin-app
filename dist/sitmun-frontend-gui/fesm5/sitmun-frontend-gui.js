import { __values } from 'tslib';
import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularHalModule, SitmunFrontendCoreModule } from '@sitmun/frontend-core';
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';
import { AgGridModule } from '@ag-grid-community/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DataGridComponent = /** @class */ (function () {
    function DataGridComponent(translate) {
        var _this = this;
        this.translate = translate;
        this.modules = AllCommunityModules;
        this.statusColumn = false;
        this.changesMap = new Map();
        this.modificationChange = false;
        this.undoNoChanges = false;
        this.translate = translate;
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
        this.getSelectedRows = new EventEmitter();
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
                         */
                        function (filterLocalDateAtMidnight, cellValue) {
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (selectedRows_1_1 && !selectedRows_1_1.done && (_a = selectedRows_1.return)) _a.call(selectedRows_1);
                }
                finally { if (e_2) throw e_2.error; }
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
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
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
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_4, _c;
    };
    DataGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-data-grid',
                    template: "    <div id=grup1 class=\"editDivBtns\">\n        <span *ngIf=\"title\"  [translate]=\"title\"> </span>\n        <button  mat-mini-fab class=\"editBtn\"  *ngIf=\"discardChangesButton\"  id=\"deleteChangesButton\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"changeCounter <= 0\">\n            <mat-icon  fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"undoButton\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"redoButton\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"redoCounter <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"applyChangesButton\"  id=\"applyChangesButton\"  (click)=\"applyChanges()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 class=\"actionsDivBtns\" >\n        <label *ngIf=\"globalSearch\" [translate]=\"'Search'\"> </label>\n        <input *ngIf=\"globalSearch\"type=\"text\" class=\"searchGenericInput\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"deleteButton\"  mat-stroked-button id=\"deleteButton\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            <span  [translate]=\"'Remove'\"> </span>\n            \n        </button>\n\n        \n        <button *ngIf=\"actionButton\"  mat-stroked-button [matMenuTriggerFor]=\"menu\" id=\"actionButton\">\n            <span  [translate]=\"'Actions'\"> </span>    \n            <mat-icon fontSet=\"material-icons-round\" > keyboard_arrow_down </mat-icon>     \n        </button>\n        <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item (click)=\"exportData()\" > {{\"Export\" | translate}} </button>\n            <button mat-menu-item (click)=\"emitSelectedRows()\"> {{\"Duplicate\" | translate}}</button>\n            <button mat-menu-item> {{\"Search/Replace\" | translate}}</button>\n        </mat-menu>  \n            \n\n        <button  *ngIf=\"newButton\" mat-stroked-button id=\"newButton\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'New'\"> </span>           \n        </button>\n\n        <button  *ngIf=\"addButton\" mat-stroked-button id=\"newButton\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'Add'\"> </span>           \n        </button>\n        \n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            [class]=\"themeGrid\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            [frameworkComponents]=\"frameworkComponents\"\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
                    styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#newButton{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#deleteButton{background:no-repeat padding-box #fff;margin-left:3px}#actionButton{background:no-repeat padding-box #fff;margin-left:3px;text-align:center!important}#applyChangesButton{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#applyChangesButton[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#deleteChangesButton{color:#fff!important;background:#df3133}#deleteChangesButton[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{margin-left:10px;text-align:start;width:130px;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:calc(100% - 140px);height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:45%!important}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-thumb{background:#eee}\u200B .ag-body-viewport.ag-layout-normal ::-webkit-scrollbar{width:2em;height:2em}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-button{background:#ccc}.ag-body-viewport.ag-layout-normal::-webkit-scrollbar-track-piece{background:#888}"]
                },] },
    ];
    /** @nocollapse */
    DataGridComponent.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    DataGridComponent.propDecorators = {
        eventRefreshSubscription: [{ type: Input }],
        eventGetSelectedRowsSubscription: [{ type: Input }],
        frameworkComponents: [{ type: Input }],
        columnDefs: [{ type: Input }],
        getAll: [{ type: Input }],
        discardChangesButton: [{ type: Input }],
        undoButton: [{ type: Input }],
        redoButton: [{ type: Input }],
        applyChangesButton: [{ type: Input }],
        deleteButton: [{ type: Input }],
        newButton: [{ type: Input }],
        actionButton: [{ type: Input }],
        addButton: [{ type: Input }],
        globalSearch: [{ type: Input }],
        themeGrid: [{ type: Input }],
        singleSelection: [{ type: Input }],
        title: [{ type: Input }],
        remove: [{ type: Output }],
        new: [{ type: Output }],
        sendChanges: [{ type: Output }],
        getSelectedRows: [{ type: Output }]
    };
    return DataGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BtnEditRenderedComponent = /** @class */ (function () {
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
        { type: Component, args: [{
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
var DialogGridComponent = /** @class */ (function () {
    function DialogGridComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.getAllRows = new Subject();
        this.allRowsReceived = [];
        this.joinTables = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'app-dialog-grid',
                    template: "<h2 mat-dialog-title>{{title}}</h2>\n<mat-dialog-content >\n  <div *ngFor=\"let getAll of getAllsTable; let i = index\" style=\"width: 450px; height: 300px;  margin: 50px;\">\n    <app-data-grid \n    [columnDefs]=\"columnDefsTable[i]\" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true [singleSelection]=\"singleSelectionTable[i]\"\n    [title]=\"titlesTable[i]\" [eventGetSelectedRowsSubscription]=\"getAllRows.asObservable()\" (getSelectedRows)='joinRowsReceived($event)' >\n    </app-data-grid>\n  </div>\n</mat-dialog-content>\n<div mat-dialog-actions align=\"end\">\n  <button mat-button  (click)=\"closeDialog()\">{{\"Cancel\" | translate}}</button>\n  <button mat-button  (click)=\"getAllSelectedRows()\" cdkFocusInitial>{{\"Add\" | translate}}</button>\n</div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DialogGridComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    DialogGridComponent.propDecorators = {
        joinTables: [{ type: Output }]
    };
    return DialogGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
registerLocaleData(localeCa, 'ca');
registerLocaleData(localeEs, 'es');
/**
 * Load translation assets
 * @param {?} http
 * @return {?}
 */
function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
var ɵ0 = (createTranslateLoader);
/**
 * SITMUN plugin core module
 */
var SitmunFrontendGuiModule = /** @class */ (function () {
    function SitmunFrontendGuiModule() {
    }
    SitmunFrontendGuiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        RouterModule,
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        NoopAnimationsModule,
                        AngularHalModule,
                        ReactiveFormsModule,
                        BrowserAnimationsModule,
                        AgGridModule.withComponents([]),
                        SitmunFrontendCoreModule,
                        MatButtonModule,
                        MatIconModule,
                        MatMenuModule,
                        MatDialogModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: ɵ0,
                                deps: [HttpClient]
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
                        HttpClientModule,
                        CommonModule,
                        FormsModule,
                        NoopAnimationsModule,
                        AngularHalModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        DataGridComponent,
                        DialogGridComponent,
                        SitmunFrontendCoreModule
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

export { DataGridComponent, createTranslateLoader, SitmunFrontendGuiModule, BtnEditRenderedComponent, DialogGridComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGlhbG9nLWdyaWQvZGlhbG9nLWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgQ29sdW1uQXBpLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYCAgICA8ZGl2IGlkPWdydXAxIGNsYXNzPVwiZWRpdERpdkJ0bnNcIj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cInRpdGxlXCIgIFt0cmFuc2xhdGVdPVwidGl0bGVcIj4gPC9zcGFuPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJkaXNjYXJkQ2hhbmdlc0J1dHRvblwiICBpZD1cImRlbGV0ZUNoYW5nZXNCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY2hhbmdlQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiAgZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjbG9zZSA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwidW5kb0J1dHRvblwiICBpZD1cInVuZG9cIiAgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIiA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHVuZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cInJlZG9CdXR0b25cIiAgaWQ9XCJyZWRvXCIgIChjbGljayk9XCJyZWRvKClcIiBbZGlzYWJsZWRdPVwicmVkb0NvdW50ZXIgPD0gMFwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiByZWRvIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJhcHBseUNoYW5nZXNCdXR0b25cIiAgaWQ9XCJhcHBseUNoYW5nZXNCdXR0b25cIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJnbG9iYWxTZWFyY2hcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiZ2xvYmFsU2VhcmNoXCJ0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoR2VuZXJpY0lucHV0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZGVsZXRlQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImRlbGV0ZUJ1dHRvblwiICAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInUmVtb3ZlJ1wiPiA8L3NwYW4+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiYWN0aW9uQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGlkPVwiYWN0aW9uQnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidBY3Rpb25zJ1wiPiA8L3NwYW4+ICAgIFxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBrZXlib2FyZF9hcnJvd19kb3duIDwvbWF0LWljb24+ICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiZXhwb3J0RGF0YSgpXCIgPiB7e1wiRXhwb3J0XCIgfCB0cmFuc2xhdGV9fSA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJlbWl0U2VsZWN0ZWRSb3dzKClcIj4ge3tcIkR1cGxpY2F0ZVwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPiB7e1wiU2VhcmNoL1JlcGxhY2VcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgICAgICAgPC9tYXQtbWVudT4gIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInTmV3J1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJhZGRCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInQWRkJ1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgXHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBzdHlsZT1cIiBoZWlnaHQ6IDEwMCVcIj5cclxuICAgICAgICA8ZGl2IGlkPVwibXlHcmlkXCIgc3R5bGU9XCIgd2lkdGg6MTAwJTsgaGVpZ2h0OiAxMDAlXCIgPlxyXG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXHJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcclxuICAgICAgICAgICAgW2NsYXNzXT1cInRoZW1lR3JpZFwiXHJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3Jvd0RhdGFdPVwicm93RGF0YVwiXHJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxyXG4gICAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxyXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcclxuICAgICAgICAgICAgW3VuZG9SZWRvQ2VsbEVkaXRpbmddPVwidHJ1ZVwiICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXHJcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXHJcbiAgICAgICAgICAgIFtlbmFibGVDZWxsQ2hhbmdlRmxhc2hdPXRydWVcclxuICAgICAgICAgICAgW2ZyYW1ld29ya0NvbXBvbmVudHNdPVwiZnJhbWV3b3JrQ29tcG9uZW50c1wiXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGlvbj1cIm11bHRpcGxlXCJcclxuICAgICAgICAgICAgKGZpbHRlck1vZGlmaWVkKT1cIm9uRmlsdGVyTW9kaWZpZWQoKVwiXHJcbiAgICAgICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICAoY2VsbFZhbHVlQ2hhbmdlZCk9XCJvbkNlbGxWYWx1ZUNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG5gLFxyXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jbmV3QnV0dG9ue2NvbG9yOiNmZmY7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I2RlbGV0ZUJ1dHRvbntiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYWN0aW9uQnV0dG9ue2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICNmZmY7bWFyZ2luLWxlZnQ6M3B4O3RleHQtYWxpZ246Y2VudGVyIWltcG9ydGFudH0jYXBwbHlDaGFuZ2VzQnV0dG9ue2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNhcHBseUNoYW5nZXNCdXR0b25bZGlzYWJsZWRde2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM4Mzk3NmN9I3JlZG8sI3VuZG97Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jcmVkb1tkaXNhYmxlZF0sI3VuZG9bZGlzYWJsZWRde2JhY2tncm91bmQ6I2ZmYzk3ZjttYXJnaW4tbGVmdDozcHh9I2RlbGV0ZUNoYW5nZXNCdXR0b257Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZGYzMTMzfSNkZWxldGVDaGFuZ2VzQnV0dG9uW2Rpc2FibGVkXXtjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkYThjOGV9LmVkaXREaXZCdG5ze21hcmdpbi1sZWZ0OjEwcHg7dGV4dC1hbGlnbjpzdGFydDt3aWR0aDoxMzBweDtoZWlnaHQ6MzBweCFpbXBvcnRhbnQ7bGluZS1oZWlnaHQ6MzBweCFpbXBvcnRhbnR9LmFjdGlvbnNEaXZCdG5ze3RleHQtYWxpZ246ZW5kO3dpZHRoOmNhbGMoMTAwJSAtIDE0MHB4KTtoZWlnaHQ6NjBweH0uYWN0aW9uc0RpdkJ0bnMsLmVkaXREaXZCdG5ze2Rpc3BsYXk6aW5saW5lLWJsb2NrIWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnMgLm1hdC1zdHJva2VkLWJ1dHRvbntwYWRkaW5nOjVweCAyMHB4IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1taW5pLWZhYiAubWF0LWJ1dHRvbi13cmFwcGVye3BhZGRpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7ZGlzcGxheTppbmhlcml0IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1pY29ue2hlaWdodDozMHB4IWltcG9ydGFudDtib3R0b206NXB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFie3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHh9LmFjdGlvbnNEaXZCdG5zIC5zZWFyY2hHZW5lcmljSW5wdXR7aGVpZ2h0OjQ1cHghaW1wb3J0YW50O3dpZHRoOjQ1JSFpbXBvcnRhbnR9LmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQ6I2VlZX3DosKAwosgLmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjJlbTtoZWlnaHQ6MmVtfS5hZy1ib2R5LXZpZXdwb3J0LmFnLWxheW91dC1ub3JtYWwgOjotd2Via2l0LXNjcm9sbGJhci1idXR0b257YmFja2dyb3VuZDojY2NjfS5hZy1ib2R5LXZpZXdwb3J0LmFnLWxheW91dC1ub3JtYWw6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLXBpZWNle2JhY2tncm91bmQ6Izg4OH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gXHJcbiAgcHJpdmF0ZSBfZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZXZlbnRHZXRTZWxlY3RlZFJvd3NTdWJzY3JpcHRpb246IGFueTtcclxuICBtb2R1bGVzOiBNb2R1bGVbXSA9IEFsbENvbW11bml0eU1vZHVsZXM7XHJcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcclxuICBwcml2YXRlIGdyaWRBcGk7XHJcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xyXG4gIHN0YXR1c0NvbHVtbiA9IGZhbHNlO1xyXG4gIGNoYW5nZXNNYXA6IE1hcDxudW1iZXIsIE1hcDxzdHJpbmcsIG51bWJlcj4+ID0gbmV3IE1hcDxudW1iZXIsIE1hcDxzdHJpbmcsIG51bWJlcj4+KCk7XHJcbiAgIC8vIFdlIHdpbGwgc2F2ZSB0aGUgaWQgb2YgZWRpdGVkIGNlbGxzIGFuZCB0aGUgbnVtYmVyIG9mIGVkaXRpb25zIGRvbmUuXHJcbiAgcHJpdmF0ZSBwYXJhbXM7IC8vIExhc3QgcGFyYW1ldGVycyBvZiB0aGUgZ3JpZCAoaW4gY2FzZSB3ZSBkbyBhcHBseSBjaGFuZ2VzIHdlIHdpbGwgbmVlZCBpdCkgXHJcbiAgcm93RGF0YTogYW55W107XHJcbiAgY2hhbmdlQ291bnRlcjogbnVtYmVyOyAvLyBOdW1iZXIgb2YgZWRpdGlvbnMgZG9uZSBhYm92ZSBhbnkgY2VsbCBcclxuICBwcmV2aW91c0NoYW5nZUNvdW50ZXI6IG51bWJlcjsgLy8gTnVtYmVyIG9mIGRpdGlvbnMgZG9uZSBhZnRlciB0aGUgbGFzdCBtb2RpZmljYXRpb24oY2hhbmdlQ291bnRlcilcclxuICByZWRvQ291bnRlcjogbnVtYmVyOyAvLyBOdW1iZXIgb2YgcmVkbyB3ZSBjYW4gZG9cclxuICBtb2RpZmljYXRpb25DaGFuZ2UgPSBmYWxzZTtcclxuICB1bmRvTm9DaGFuZ2VzID0gZmFsc2U7IC8vIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgYW4gdW5kbyBoYXNuJ3QgbW9kaWZpY2F0aW9uc1xyXG4gIGdyaWRPcHRpb25zO1xyXG5cclxuICBASW5wdXQoKSBldmVudFJlZnJlc2hTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcclxuICBASW5wdXQoKSBldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZSA8Ym9vbGVhbj4gO1xyXG4gIEBJbnB1dCgpIGZyYW1ld29ya0NvbXBvbmVudHM6IGFueTtcclxuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBhbnlbXTtcclxuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcclxuICBASW5wdXQoKSBkaXNjYXJkQ2hhbmdlc0J1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSB1bmRvQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHJlZG9CdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYXBwbHlDaGFuZ2VzQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRlbGV0ZUJ1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuZXdCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYWN0aW9uQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFkZEJ1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBnbG9iYWxTZWFyY2g6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdGhlbWVHcmlkOiBhbnk7XHJcbiAgQElucHV0KCkgc2luZ2xlU2VsZWN0aW9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG5cclxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xyXG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcclxuICBAT3V0cHV0KCkgZ2V0U2VsZWN0ZWRSb3dzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgdGhpcy50cmFuc2xhdGUgPSB0cmFuc2xhdGU7XHJcblxyXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmdldFNlbGVjdGVkUm93cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7XHJcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcclxuICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcclxuICAgICAgICBmbGV4OiAxLFxyXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcclxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICBjZWxsU3R5bGU6IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ30sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtblR5cGVzOiB7XHJcbiAgICAgICAgZGF0ZUNvbHVtbjoge1xyXG4gICAgICAgICAgICBmaWx0ZXI6ICdhZ0RhdGVDb2x1bW5GaWx0ZXInLFxyXG4gICAgICAgICAgICBmaWx0ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICBjb21wYXJhdG9yKGZpbHRlckxvY2FsRGF0ZUF0TWlkbmlnaHQsIGNlbGxWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZUNlbGxWYWx1ZSA9IG5ldyBEYXRlKGNlbGxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlRmlsdGVyID0gbmV3IERhdGUoZmlsdGVyTG9jYWxEYXRlQXRNaWRuaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGVDZWxsVmFsdWUuZ2V0VGltZSgpIDwgZGF0ZUZpbHRlci5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlQ2VsbFZhbHVlLmdldFRpbWUoKSAgPiBkYXRlRmlsdGVyLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1cHByZXNzTWVudTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcclxuICAgICAgc2luZ2xlQ2xpY2tFZGl0OiB0cnVlLFxyXG4gICAgICAvLyBzdXBwcmVzc0hvcml6b250YWxTY3JvbGw6IHRydWUsXHJcbiAgICAgIGxvY2FsZVRleHRGdW5jOiAoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoa2V5KTtcclxuICAgICAgICByZXR1cm4gZGF0YSA9PT0ga2V5ID8gZGVmYXVsdFZhbHVlIDogZGF0YTtcclxuICAgIH1cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIG5nT25Jbml0KCl7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50UmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmV2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdFNlbGVjdGVkUm93cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xyXG4gICAgaWYgKHRoaXMuc2luZ2xlU2VsZWN0aW9uKSB7dGhpcy5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb24gPSAnc2luZ2xlJ31cclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcclxuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XHJcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XHJcbiAgICB0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xyXG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5jb2x1bW5EZWZzKSB7XHJcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcclxuICAgICAgICB0aGlzLnN0YXR1c0NvbHVtbiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGVtaXRTZWxlY3RlZFJvd3MoKTogdm9pZHtcclxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xyXG4gICAgdGhpcy5nZXRTZWxlY3RlZFJvd3MuZW1pdChzZWxlY3RlZERhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uS2V5c0FuZEhlYWRlcnMoY29sdW1ua2V5czogQXJyYXk8YW55Pik6IFN0cmluZ3sgICAgXHJcbiAgICBsZXQgaGVhZGVyOkFycmF5PGFueT4gPSBbXTtcclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZnMubGVuZ3RoID09IDApIHtyZXR1cm4gJyd9O1xyXG5cclxuICAgIGxldCBhbGxDb2x1bW5LZXlzPXRoaXMuZ3JpZE9wdGlvbnMuY29sdW1uQXBpLmdldEFsbERpc3BsYXllZENvbHVtbnMoKTtcclxuICAgIGNvbnNvbGUubG9nKGFsbENvbHVtbktleXMpO1xyXG4gICAgYWxsQ29sdW1uS2V5cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnVzZXJQcm92aWRlZENvbERlZi5oZWFkZXJOYW1lICE9PSAnJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb2x1bW5rZXlzLnB1c2goZWxlbWVudC51c2VyUHJvdmlkZWRDb2xEZWYuZmllbGQpO1xyXG4gICAgICAgICAgaGVhZGVyLnB1c2goZWxlbWVudC51c2VyUHJvdmlkZWRDb2xEZWYuaGVhZGVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gaGVhZGVyLmpvaW4oXCIsXCIpO1xyXG4gIH1cclxuXHJcblxyXG4gIGV4cG9ydERhdGEoKTogdm9pZHtcclxuICAgIGxldCBjb2x1bW5rZXlzOkFycmF5PGFueT4gPSBbXTtcclxuICAgIGxldCBjdXN0b21IZWFkZXI6U3RyaW5nID0gJyc7XHJcbiAgICBjdXN0b21IZWFkZXIgPSB0aGlzLmdldENvbHVtbktleXNBbmRIZWFkZXJzKGNvbHVtbmtleXMpXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWRBcGkpO1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICBvbmx5U2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgY29sdW1uS2V5czogY29sdW1ua2V5cyxcclxuICAgICAgICBjdXN0b21IZWFkZXI6IGN1c3RvbUhlYWRlcixcclxuICAgICAgICBza2lwSGVhZGVyOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5ncmlkQXBpLmV4cG9ydERhdGFBc0NzdihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcXVpY2tTZWFyY2goKTogdm9pZHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcclxufVxyXG5cclxuICBnZXRFbGVtZW50cygpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5nZXRBbGwoKVxyXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcclxuICAgICAgICB0aGlzLnJvd0RhdGEgPSBpdGVtcztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKX0sIDMwKTtcclxuICAgICAgICB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YSh0aGlzLnJvd0RhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm93RGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XHJcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XHJcblxyXG4gICAgaWYodGhpcy5zdGF0dXNDb2x1bW4pXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5yb3dJbmRleCk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShpZCkuZGF0YS5lc3RhdCA9J0VsaW1pbmF0JztcclxuICAgICAgICB9XHJcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuZGVzZWxlY3RBbGwoKTtcclxuICB9XHJcblxyXG4gIG5ld0RhdGEoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLm5ldy5lbWl0KC0xKTtcclxuICB9XHJcblxyXG5cclxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmNoYW5nZXNNYXAua2V5cygpKVxyXG4gICAge1xyXG4gICAgICBpdGVtc0NoYW5nZWQucHVzaCh0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShrZXkpLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZW5kQ2hhbmdlcy5lbWl0KGl0ZW1zQ2hhbmdlZCk7XHJcbiAgICB0aGlzLmNoYW5nZXNNYXAuY2xlYXIoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcclxuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcclxuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGRlbGV0ZUNoYW5nZXMoKTogdm9pZFxyXG4gIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGFuZ2VDb3VudGVyOyBpKyspXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlc01hcC5jbGVhcigpO1xyXG4gICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xyXG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcclxuICB9XHJcblxyXG5cclxuICBvbkZpbHRlck1vZGlmaWVkKCk6IHZvaWR7XHJcbiAgICB0aGlzLmRlbGV0ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG5cclxuICB1bmRvKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciAtPSAxO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciArPSAxO1xyXG4gIH1cclxuXHJcbiAgcmVkbygpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XHJcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgKz0gMTtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgLT0gMTtcclxuICB9XHJcblxyXG5cclxuICBvbkNlbGxFZGl0aW5nU3RvcHBlZChlKVxyXG4gIHtcclxuICAgICAgaWYgKHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb3VudGVyKys7XHJcbiAgICAgICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XHJcbiAgICAgICAgdGhpcy5tb2RpZmljYXRpb25DaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xyXG5cclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyBcclxuICAgIGlmICh0aGlzLmNoYW5nZUNvdW50ZXIgPiB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcilcclxuICAgICAgLy8gVHJ1ZSBpZiB3ZSBoYXZlIGVkaXRlZCBzb21lIGNlbGwgb3Igd2UgaGF2ZSBkb25lIGEgcmVkbyBcclxuICAgICAge1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmICghIHRoaXMuY2hhbmdlc01hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBJZiBpdCdzIGZpcnRzIGVkaXQgb2YgYSBjZWxsLCB3ZSBhZGQgaXQgdG8gdGhlIG1hcCBhbmQgd2UgcGFpbnQgaXRcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgYWRkTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcclxuICAgICAgICAgICAgYWRkTWFwLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAxKVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCBhZGRNYXApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKCEgdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuaGFzKHBhcmFtcy5jb2xEZWYuZmllbGQpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAvLyBXZSBhbHJlYWR5IGhhZCBlZGl0ZWQgdGhpcyBjZWxsLCBzbyB3ZSBvbmx5IGluY3JlbWVudCBudW1iZXIgb2YgY2hhbmdlcyBvZiBpdCBvbiB0aGUgbWFwIFxyXG4gICAgICAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5nZXQocGFyYW1zLmNvbERlZi5maWVsZCk7XHJcbiAgICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5zZXQocGFyYW1zLmNvbERlZi5maWVsZCwgKGN1cnJlbnRDaGFuZ2VzICsgMSkpO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApOyAvL1dlIHBhaW50IHRoZSByb3cgb2YgdGhlIGVkaXRlZCBjZWxsIFxyXG4gICAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIrKzsgLy9XZSBtYXRjaCB0aGUgY3VycmVudCBwcmV2aW91c0NoYW5nZUNvdW50ZXIgd2l0aCBjaGFuZ2VDb3VudGVyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jaGFuZ2VDb3VudGVyIDwgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIpeyAvLyBUcnVlIGlmIHdlIGhhdmUgZG9uZSBhbiB1bmRvXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDaGFuZ2VzID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlc01hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSB7Y3VycmVudENoYW5nZXMgPSB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5nZXQocGFyYW1zLmNvbERlZi5maWVsZCk7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjdXJyZW50Q2hhbmdlcyA9PT0gMSkgeyAvL09uY2UgdGhlIHVuZG8gaXQncyBkb25lLCBjZWxsIGlzIGluIGhpcyBpbml0aWFsIHN0YXR1c1xyXG5cclxuICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLmRlbGV0ZShwYXJhbXMuY29sRGVmLmZpZWxkKTtcclxuICAgICAgICAgIGlmKHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNpemUgPT09IDApIHsgLy8gTm8gbW9yZSBtb2RpZmljYXRpb25zIGluIHRoaXMgcm93XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2UgcGFpbnQgaXQgd2hpdGVcclxuICAgICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xyXG5cclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDaGFuZ2VzID4xKSAvLyBUaGUgY2VsbCBpc24ndCBpbiBoaXMgaW5pdGlhbCBzdGF0ZSB5ZXRcclxuICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XZSBjYW4ndCBkbyBlbHNlIGJlY2F1c2Ugd2UgY2FuIGJlIGRvaW5nIGFuIHVuZG8gd2l0aG91dCBjaGFuZ2VzIFxyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuc2V0KHBhcmFtcy5jb2xEZWYuZmllbGQsIChjdXJyZW50Q2hhbmdlcyAtIDEpKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApOy8vTm90IGluaXRpYWwgc3RhdGUgLT4gZ3JlZW4gYmFja2dyb3VuZFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXItLTsgIC8vV2UgZGVjcmVtZW50IHByZXZpb3VzQ2hhbmdlQ291bnRlciBiZWNhdXNlIHdlIGhhdmUgZG9uZSB1bmRvXHJcbiAgICB9XHJcbiAgICBlbHNleyAvLyBDb250cm9sIG9mIG1vZGlmaWNhdGlvbnMgd2l0aG91dCBjaGFuZ2VzXHJcbiAgICAgIGlmKHBhcmFtcy5vbGRWYWx1ZSAhPT0gcGFyYW1zLnZhbHVlICYmICEocGFyYW1zLm9sZFZhbHVlID09IG51bGwgJiYgcGFyYW1zLnZhbHVlID09PSAnJykgKSAvL0lzbid0IGEgbW9kaWZpY2F0aW9uIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RpZmljYXRpb25DaGFuZ2UgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7IFxyXG4gICAgICAgIGlmICggdGhpcy5jaGFuZ2VzTWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIC8vTW9kaWZpY2F0aW9uIHdpdGhvdXQgY2hhbmdlcyBpbiBlbiBlZGl0ZWQgY2VsbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKCF0aGlzLnVuZG9Ob0NoYW5nZXMpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTsgLy8gVW5kbyB0byBkZWxldGUgdGhlIGNoYW5nZSB3aXRob3V0IGNoYW5nZXMgaW50ZXJuYWxseSBcclxuICAgICAgICAgICAgdGhpcy51bmRvTm9DaGFuZ2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTsgIC8vVGhlIGNlbGwgaGFzIG1vZGlmaWNhdGlvbnMgeWV0IC0+IGdyZWVuIGJhY2tncm91bmQgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHsgdGhpcy51bmRvTm9DaGFuZ2VzID0gZmFsc2U7IH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vV2l0aCB0aGUgaW50ZXJuYWxseSB1bmRvIHdpbGwgZW50ZXIgYXQgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBjb250cm9sIHdoZW4gZG9uZSB0aGUgdW5kbyBvciBub3QgXHJcbiAgICAgICAgICBpZighdGhpcy51bmRvTm9DaGFuZ2VzKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7IC8vIFVuZG8gdG8gZGVsZXRlIHRoZSBjaGFuZ2UgaW50ZXJuYWxseVxyXG4gICAgICAgICAgICB0aGlzLnVuZG9Ob0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7IHRoaXMudW5kb05vQ2hhbmdlcyA9IGZhbHNlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkluZGV4QnlDb2xJZChhcGk6IENvbHVtbkFwaSwgY29sSWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gYXBpLmdldEFsbENvbHVtbnMoKS5maW5kSW5kZXgoY29sID0+IGNvbC5nZXRDb2xJZCgpID09PSBjb2xJZCk7XHJcbiAgfVxyXG4gIHBhaW50Q2VsbHMocGFyYW1zOiBhbnksICBjaGFuZ2VzTWFwOiBNYXA8bnVtYmVyLCBNYXA8c3RyaW5nLCBudW1iZXI+PiwgKVxyXG4gIHtcclxuICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VDZWxsU3R5bGVDb2x1bW5zKHBhcmFtcyxjaGFuZ2VzTWFwLCcjRThGMURFJyk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICB0aGlzLmNoYW5nZUNlbGxTdHlsZUNvbHVtbnMocGFyYW1zLGNoYW5nZXNNYXAsJyNGRkZGRkYnKTsgXHJcbiAgICAvLyBXZSB3aWxsIGRlZmluZSBjZWxsU3R5bGUgd2hpdGUgdG8gZnV0dXJlIG1vZGlmaWNhdGlvbnMgKGxpa2UgZmlsdGVyKVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ2VsbFN0eWxlQ29sdW1ucyhwYXJhbXM6IGFueSwgY2hhbmdlc01hcDogTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4sIGNvbG9yOiBzdHJpbmcpe1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IG9mIGNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbk51bWJlciA9IHRoaXMuZ2V0Q29sdW1uSW5kZXhCeUNvbElkKHRoaXMuZ3JpZENvbHVtbkFwaSwga2V5KTtcclxuICAgICAgdGhpcy5ncmlkQ29sdW1uQXBpLmNvbHVtbkNvbnRyb2xsZXIuZ3JpZENvbHVtbnNbY29sdW1uTnVtYmVyXS5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogY29sb3J9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJQ2VsbFJlbmRlcmVyQW5ndWxhckNvbXAgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYnRuLWVkaXQtcmVuZGVyZWQnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiYnV0dG9uRWRpdFwiICB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJidG5DbGlja2VkSGFuZGxlcigkZXZlbnQpXCIgPlxuICA8bWF0LWljb24gY2xhc3M9XCJpY29uRWRpdFwiICAgZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBlZGl0IDwvbWF0LWljb24+XG48L2J1dHRvbj4gYCxcbiAgc3R5bGVzOiBbYC5idXR0b25FZGl0e2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjojZGRkO3dpZHRoOjIwcHg7bWFyZ2luLXRvcDozcHg7aGVpZ2h0OjIwcHg7Ym94LXNoYWRvdzpub25lfS5pY29uRWRpdHtmb250LXNpemU6MTNweDttYXJnaW4tdG9wOi0xMHB4O21hcmdpbi1sZWZ0Oi0ycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50IGltcGxlbWVudHMgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wLCBPbkRlc3Ryb3kge1xuXG4gIHB1YmxpYyBwYXJhbXM6IGFueTtcblxuICBhZ0luaXQocGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIHJlZnJlc2gocGFyYW1zOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGJ0bkNsaWNrZWRIYW5kbGVyKCRldmVudCkge1xuICAgIHRoaXMucGFyYW1zLmNsaWNrZWQodGhpcy5wYXJhbXMudmFsdWUpO1xuICB9XG5cbiAgZ2V0UGFyYW1zKCl7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gbm8gbmVlZCB0byByZW1vdmUgdGhlIGJ1dHRvbiBjbGljayBoYW5kbGVyIFxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgX0dldEFsbHNUYWJsZTogIEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIF9jb2x1bW5EZWZzVGFibGU6IEFycmF5PGFueVtdPjtcbiAgX3NpbmdsZVNlbGVjdGlvblRhYmxlOiBBcnJheTxib29sZWFuPjtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGlhbG9nLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxoMiBtYXQtZGlhbG9nLXRpdGxlPnt7dGl0bGV9fTwvaDI+XG48bWF0LWRpYWxvZy1jb250ZW50ID5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgZ2V0QWxsIG9mIGdldEFsbHNUYWJsZTsgbGV0IGkgPSBpbmRleFwiIHN0eWxlPVwid2lkdGg6IDQ1MHB4OyBoZWlnaHQ6IDMwMHB4OyAgbWFyZ2luOiA1MHB4O1wiPlxuICAgIDxhcHAtZGF0YS1ncmlkIFxuICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNUYWJsZVtpXVwiIFt0aGVtZUdyaWRdPSd0aGVtZUdyaWQnICBbZ2V0QWxsXT0nZ2V0QWxsJyBbZ2xvYmFsU2VhcmNoXT10cnVlIFtzaW5nbGVTZWxlY3Rpb25dPVwic2luZ2xlU2VsZWN0aW9uVGFibGVbaV1cIlxuICAgIFt0aXRsZV09XCJ0aXRsZXNUYWJsZVtpXVwiIFtldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbl09XCJnZXRBbGxSb3dzLmFzT2JzZXJ2YWJsZSgpXCIgKGdldFNlbGVjdGVkUm93cyk9J2pvaW5Sb3dzUmVjZWl2ZWQoJGV2ZW50KScgPlxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cbiAgPC9kaXY+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAgKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIj57e1wiQ2FuY2VsXCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICA8YnV0dG9uIG1hdC1idXR0b24gIChjbGljayk9XCJnZXRBbGxTZWxlY3RlZFJvd3MoKVwiIGNka0ZvY3VzSW5pdGlhbD57e1wiQWRkXCIgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZ2V0QWxsUm93czogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0IDxib29sZWFuPigpO1xuICBwcml2YXRlIF9hZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHRhYmxlc1JlY2VpdmVkQ291bnRlcjogbnVtYmVyO1xuICBhbGxSb3dzUmVjZWl2ZWQ6IEFycmF5PGFueVtdPiA9IFtdO1xuXG4gIC8vSW5wdXRzXG4gIHRoZW1lR3JpZDogYW55O1xuICBnZXRBbGxzVGFibGU6IEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XG4gIGNvbHVtbkRlZnNUYWJsZTogQXJyYXk8YW55W10+O1xuICBzaW5nbGVTZWxlY3Rpb25UYWJsZTogQXJyYXk8Ym9vbGVhbj47XG4gIHRpdGxlc1RhYmxlOiBBcnJheTxzdHJpbmc+O1xuICBhZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBPYnNlcnZhYmxlIDxib29sZWFuPiA7XG5cbiAgLy9PdXRwdXRzXG4gIEBPdXRwdXQoKSBqb2luVGFibGVzIDogRXZlbnRFbWl0dGVyPEFycmF5PGFueVtdPj47XG5cbiAgXG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERpYWxvZ0dyaWRDb21wb25lbnQ+KSB7XG4gICAgXG4gICAgdGhpcy5qb2luVGFibGVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID0gMDtcbiAgIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIGlmICh0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2FkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24gPSB0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbGxTZWxlY3RlZFJvd3MoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0QWxsU2VsZWN0ZWRSb3dzKCkge1xuICAgIHRoaXMuZ2V0QWxsUm93cy5uZXh0KHRydWUpO1xuICB9XG5cbiAgam9pblJvd3NSZWNlaXZlZChkYXRhOiBhbnlbXSlcbiAge1xuICAgICAgdGhpcy5hbGxSb3dzUmVjZWl2ZWQucHVzaChkYXRhKTtcbiAgICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyKys7XG4gICAgICBpZih0aGlzLnRhYmxlc1JlY2VpdmVkQ291bnRlciA9PT0gdGhpcy5nZXRBbGxzVGFibGUubGVuZ3RoKVxuICAgICAge1xuICAgICAgICB0aGlzLmRvQWRkKHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hbGxSb3dzUmVjZWl2ZWQpO1xuICAgICAgfVxuICB9XG5cbiAgZG9BZGQocm93c1RvQWRkKXtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7ZXZlbnQ6J0FkZCcsZGF0YTogcm93c1RvQWRkfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpe1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtldmVudDonQ2FuY2VsJ30pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLCBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBsb2NhbGVDYSBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9jYSc7XHJcbmltcG9ydCBsb2NhbGVFcyBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9lcyc7XHJcbmltcG9ydCB7IFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcbmltcG9ydCB7IERhdGFHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhLWdyaWQvZGF0YS1ncmlkLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBCdG5FZGl0UmVuZGVyZWRDb21wb25lbnQgfSBmcm9tICcuL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBUcmFuc2xhdGVIdHRwTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvaHR0cC1sb2FkZXInO1xyXG5pbXBvcnQgeyBEaWFsb2dHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQnO1xyXG5cclxuXHJcbnJlZ2lzdGVyTG9jYWxlRGF0YShsb2NhbGVDYSwgJ2NhJyk7XHJcbnJlZ2lzdGVyTG9jYWxlRGF0YShsb2NhbGVFcywgJ2VzJyk7XHJcblxyXG4vKiogTG9hZCB0cmFuc2xhdGlvbiBhc3NldHMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcihodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICcuLi9hc3NldHMvaTE4bi8nLCAnLmpzb24nKTtcclxufVxyXG5cclxuXHJcbi8qKiBTSVRNVU4gcGx1Z2luIGNvcmUgbW9kdWxlICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQWdHcmlkTW9kdWxlLndpdGhDb21wb25lbnRzKFtdKSxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBsb2FkZXI6IHtcclxuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXHJcbiAgICAgICAgdXNlRmFjdG9yeTogKGNyZWF0ZVRyYW5zbGF0ZUxvYWRlciksXHJcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIEJ0bkVkaXRSZW5kZXJlZENvbXBvbmVudCxcclxuICAgIERpYWxvZ0dyaWRDb21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgRGlhbG9nR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJJRSwyQkFBbUIsU0FBMkI7UUFBOUMsaUJBK0NDO1FBL0Nr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