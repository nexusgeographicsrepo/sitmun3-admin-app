(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ag-grid-community/all-modules'), require('@angular/forms'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser/animations'), require('@angular/router'), require('@ngx-translate/core'), require('@sitmun/frontend-core'), require('@ag-grid-community/angular'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/menu')) :
    typeof define === 'function' && define.amd ? define('@sitmun/frontend-gui', ['exports', '@angular/core', '@ag-grid-community/all-modules', '@angular/forms', '@angular/common', '@angular/common/http', '@angular/platform-browser/animations', '@angular/router', '@ngx-translate/core', '@sitmun/frontend-core', '@ag-grid-community/angular', '@angular/material/button', '@angular/material/icon', '@angular/material/menu'], factory) :
    (factory((global.sitmun = global.sitmun || {}, global.sitmun['frontend-gui'] = {}),global.ng.core,null,global.ng.forms,global.ng.common,global.ng.common.http,global.ng.platformBrowser.animations,global.ng.router,null,null,null,global.ng.material.button,global.ng.material.icon,global.ng.material.menu));
}(this, (function (exports,core,allModules,forms,common,http,animations,router,core$1,frontendCore,angular,button,icon,menu) { 'use strict';

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
        function DataGridComponent() {
            this.modules = allModules.AllCommunityModules;
            this.statusColumn = false;
            this.changesMap = new Map();
            this.modificationChange = false;
            this.undoNoChanges = false;
            this.remove = new core.EventEmitter();
            this.new = new core.EventEmitter();
            this.sendChanges = new core.EventEmitter();
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
            };
        }
        /**
         * @param {?} params
         * @return {?}
         */
        DataGridComponent.prototype.onGridReady = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
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
                    console.log(items);
                    _this.rowData = items;
                    setTimeout(function () { _this.gridApi.sizeColumnsToFit(); }, 30);
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
                this.params = params; // Guardaremos los parametros por si hay que hacer un apply changes
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
                        this.paintCells(params, this.changesMap); // Com ha estado modificada la linia, la pintamos de verde
                        this.previousChangeCounter++; //Igualamos el contador de cambios anterior al actual
                    }
                }
                else if (this.changeCounter < this.previousChangeCounter) {
                    /** @type {?} */
                    var currentChanges = -1;
                    if (this.changesMap.has(params.node.id)) {
                        currentChanges = this.changesMap.get(params.node.id).get(params.colDef.field);
                    }
                    if (currentChanges === 1) {
                        //Al deshacer el cambio, la dejaremos en su estado inicial
                        this.changesMap.get(params.node.id).delete(params.colDef.field);
                        if (this.changesMap.get(params.node.id).size === 0) {
                            // No hay mas modificaciones en eta fila
                            this.changesMap.delete(params.node.id);
                            /** @type {?} */
                            var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                            // Si solo tiene una modificacion, quiere decir que la cela está en su estado inicial, por lo que la pintamos de blanco
                            this.gridApi.redrawRows({ rowNodes: [row] });
                        }
                        else {
                            this.paintCells(params, this.changesMap);
                        }
                    }
                    else if (currentChanges > 1) {
                        // No podemos hacer else por si hacemos un undo de una cela sin cambios
                        this.changesMap.get(params.node.id).set(params.colDef.field, (currentChanges - 1));
                        this.paintCells(params, this.changesMap); // Como aun tiene cambios, el background tiene que seguir verde
                    }
                    this.previousChangeCounter--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
                }
                else {
                    // Control de modificaciones en blanco
                    if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                        this.modificationChange = true;
                    }
                    else {
                        if (this.changesMap.has(params.node.id)) {
                            if (!this.undoNoChanges) {
                                this.gridApi.undoCellEditing(); // Undo para deshacer el cambio sin modificaciones internamente
                                this.undoNoChanges = true;
                                this.paintCells(params, this.changesMap); // Como aun tiene modificaciones, el background sigue siendo verde
                            }
                            else {
                                this.undoNoChanges = false;
                            }
                        }
                        else {
                            // Como al hacer undo volverá a entrar a esta misma función, hay que enviarlo a su if correspondiente
                            if (!this.undoNoChanges) {
                                this.gridApi.undoCellEditing(); // Undo para deshacer el cambio sin modificaciones internamente
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
                // Definiremos el cellStyle blanco para futuras modificaciones internas (ej: filtro)
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
                        template: "    <div id=grup1 class=\"editDivBtns\">\n        <button  mat-mini-fab class=\"editBtn\"  *ngIf=\"discardChangesButton\"  id=\"deleteChangesButton\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"changeCounter <= 0\">\n            <mat-icon  fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"undoButton\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"redoButton\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"redoCounter <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"applyChangesButton\"  id=\"applyChangesButton\"  (click)=\"applyChanges()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 class=\"actionsDivBtns\" >\n        <label *ngIf=\"globalSearch\" [translate]=\"'Search'\"> </label>\n        <input *ngIf=\"globalSearch\"type=\"text\" class=\"searchGenericInput\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"deleteButton\"  mat-stroked-button id=\"deleteButton\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            <span  [translate]=\"'Remove'\"> </span>\n            \n        </button>\n\n        \n        <button  mat-stroked-button [matMenuTriggerFor]=\"menu\" id=\"actionButton\">\n            <span  [translate]=\"'Actions'\"> </span>    \n            <mat-icon fontSet=\"material-icons-round\" > keyboard_arrow_down </mat-icon>     \n        </button>\n        <mat-menu #menu=\"matMenu\">\n            <button mat-menu-item> {{\"Export\" | translate}} </button>\n            <button mat-menu-item> {{\"Duplicate\" | translate}}</button>\n            <button mat-menu-item> {{\"Search/Replace\" | translate}}</button>\n        </mat-menu>  \n            \n\n        <button  *ngIf=\"newButton\" mat-stroked-button id=\"newButton\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'New'\"> </span>           \n        </button>\n\n        <button  *ngIf=\"!newButton\" mat-stroked-button id=\"newButton\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'Add'\"> </span>           \n        </button>\n        \n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            [class]=\"themeGrid\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            [frameworkComponents]=\"frameworkComponents\"\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
                        styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#newButton{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#deleteButton{background:no-repeat padding-box #fff;margin-left:3px}#actionButton{background:no-repeat padding-box #fff;margin-left:3px;text-align:center!important}#applyChangesButton{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#applyChangesButton[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#deleteChangesButton{color:#fff!important;background:#df3133}#deleteChangesButton[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{text-align:start;width:20%;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:80%;height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:45%!important}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-thumb{background:#eee}\u200B .ag-body-viewport.ag-layout-normal ::-webkit-scrollbar{width:2em;height:2em}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-button{background:#ccc}.ag-body-viewport.ag-layout-normal::-webkit-scrollbar-track-piece{background:#888}"]
                    },] },
        ];
        /** @nocollapse */
        DataGridComponent.ctorParameters = function () { return []; };
        DataGridComponent.propDecorators = {
            frameworkComponents: [{ type: core.Input }],
            columnDefs: [{ type: core.Input }],
            getAll: [{ type: core.Input }],
            discardChangesButton: [{ type: core.Input }],
            undoButton: [{ type: core.Input }],
            redoButton: [{ type: core.Input }],
            applyChangesButton: [{ type: core.Input }],
            deleteButton: [{ type: core.Input }],
            newButton: [{ type: core.Input }],
            globalSearch: [{ type: core.Input }],
            themeGrid: [{ type: core.Input }],
            remove: [{ type: core.Output }],
            new: [{ type: core.Output }],
            sendChanges: [{ type: core.Output }]
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
                            menu.MatMenuModule
                        ],
                        declarations: [
                            DataGridComponent,
                            BtnEditRenderedComponent,
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
    exports.SitmunFrontendGuiModule = SitmunFrontendGuiModule;
    exports.BtnEditRenderedComponent = BtnEditRenderedComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvc2l0bXVuLWZyb250ZW5kLWd1aS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59IiwiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIENvbHVtbkFwaSwgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXHJcbiAgdGVtcGxhdGU6IGAgICAgPGRpdiBpZD1ncnVwMSBjbGFzcz1cImVkaXREaXZCdG5zXCI+XHJcbiAgICAgICAgPGJ1dHRvbiAgbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICAqbmdJZj1cImRpc2NhcmRDaGFuZ2VzQnV0dG9uXCIgIGlkPVwiZGVsZXRlQ2hhbmdlc0J1dHRvblwiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uICBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNsb3NlIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJ1bmRvQnV0dG9uXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwicmVkb0J1dHRvblwiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJyZWRvQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cImFwcGx5Q2hhbmdlc0J1dHRvblwiICBpZD1cImFwcGx5Q2hhbmdlc0J1dHRvblwiICAoY2xpY2spPVwiYXBwbHlDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY2hhbmdlQ291bnRlciA8PSAwXCIgPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjaGVjayA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBpZD1ncnVwMiBjbGFzcz1cImFjdGlvbnNEaXZCdG5zXCIgPlxyXG4gICAgICAgIDxsYWJlbCAqbmdJZj1cImdsb2JhbFNlYXJjaFwiIFt0cmFuc2xhdGVdPVwiJ1NlYXJjaCdcIj4gPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJnbG9iYWxTZWFyY2hcInR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzZWFyY2hHZW5lcmljSW5wdXRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJkZWxldGVCdXR0b25cIiAgbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiZGVsZXRlQnV0dG9uXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZGVsZXRlIDwvbWF0LWljb24+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidSZW1vdmUnXCI+IDwvc3Bhbj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIDxidXR0b24gIG1hdC1zdHJva2VkLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGlkPVwiYWN0aW9uQnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidBY3Rpb25zJ1wiPiA8L3NwYW4+ICAgIFxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBrZXlib2FyZF9hcnJvd19kb3duIDwvbWF0LWljb24+ICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbT4ge3tcIkV4cG9ydFwiIHwgdHJhbnNsYXRlfX0gPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbT4ge3tcIkR1cGxpY2F0ZVwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPiB7e1wiU2VhcmNoL1JlcGxhY2VcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgICAgICAgPC9tYXQtbWVudT4gIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInTmV3J1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCIhbmV3QnV0dG9uXCIgbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwibmV3QnV0dG9uXCIgIChjbGljayk9XCJuZXdEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBhZGRfY2lyY2xlX291dGxpbmUgPC9tYXQtaWNvbj4gICAgICBcclxuICAgICAgICAgICAgPHNwYW4gIFt0cmFuc2xhdGVdPVwiJ0FkZCdcIj4gPC9zcGFuPiAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIFxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCIgaGVpZ2h0OiAxMDAlXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cclxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXHJcbiAgICAgICAgICAgIFtjbGFzc109XCJ0aGVtZUdyaWRcIlxyXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxyXG4gICAgICAgICAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzXCJcclxuICAgICAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcclxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxyXG4gICAgICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXHJcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcclxuICAgICAgICAgICAgW3VuZG9SZWRvQ2VsbEVkaXRpbmdMaW1pdF09IDIwMFxyXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxyXG4gICAgICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXHJcbiAgICAgICAgICAgIFtmcmFtZXdvcmtDb21wb25lbnRzXT1cImZyYW1ld29ya0NvbXBvbmVudHNcIlxyXG4gICAgICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXHJcbiAgICAgICAgICAgIChmaWx0ZXJNb2RpZmllZCk9XCJvbkZpbHRlck1vZGlmaWVkKClcIlxyXG4gICAgICAgICAgICAoY2VsbEVkaXRpbmdTdG9wcGVkKSA9XCJvbkNlbGxFZGl0aW5nU3RvcHBlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGNlbGxWYWx1ZUNoYW5nZWQpPVwib25DZWxsVmFsdWVDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgICAgICAgICAoZ3JpZFJlYWR5KT1cIm9uR3JpZFJlYWR5KCRldmVudClcIj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuYCxcclxuICBzdHlsZXM6IFtgaW5wdXQsbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjVweCA1cHggNXB4IDEwcHh9I25ld0J1dHRvbntjb2xvcjojZmZmO2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNkZWxldGVCdXR0b257YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHh9I2FjdGlvbkJ1dHRvbntiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweDt0ZXh0LWFsaWduOmNlbnRlciFpbXBvcnRhbnR9I2FwcGx5Q2hhbmdlc0J1dHRvbntjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYXBwbHlDaGFuZ2VzQnV0dG9uW2Rpc2FibGVkXXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjODM5NzZjfSNyZWRvLCN1bmRve2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2ZmOTMwMDttYXJnaW4tbGVmdDozcHh9I3JlZG9bZGlzYWJsZWRdLCN1bmRvW2Rpc2FibGVkXXtiYWNrZ3JvdW5kOiNmZmM5N2Y7bWFyZ2luLWxlZnQ6M3B4fSNkZWxldGVDaGFuZ2VzQnV0dG9ue2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RmMzEzM30jZGVsZXRlQ2hhbmdlc0J1dHRvbltkaXNhYmxlZF17Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZGE4YzhlfS5lZGl0RGl2QnRuc3t0ZXh0LWFsaWduOnN0YXJ0O3dpZHRoOjIwJTtoZWlnaHQ6MzBweCFpbXBvcnRhbnQ7bGluZS1oZWlnaHQ6MzBweCFpbXBvcnRhbnR9LmFjdGlvbnNEaXZCdG5ze3RleHQtYWxpZ246ZW5kO3dpZHRoOjgwJTtoZWlnaHQ6NjBweH0uYWN0aW9uc0RpdkJ0bnMsLmVkaXREaXZCdG5ze2Rpc3BsYXk6aW5saW5lLWJsb2NrIWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnMgLm1hdC1zdHJva2VkLWJ1dHRvbntwYWRkaW5nOjVweCAyMHB4IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1taW5pLWZhYiAubWF0LWJ1dHRvbi13cmFwcGVye3BhZGRpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7ZGlzcGxheTppbmhlcml0IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1pY29ue2hlaWdodDozMHB4IWltcG9ydGFudDtib3R0b206NXB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFie3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHh9LmFjdGlvbnNEaXZCdG5zIC5zZWFyY2hHZW5lcmljSW5wdXR7aGVpZ2h0OjQ1cHghaW1wb3J0YW50O3dpZHRoOjQ1JSFpbXBvcnRhbnR9LmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQ6I2VlZX3DosKAwosgLmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjJlbTtoZWlnaHQ6MmVtfS5hZy1ib2R5LXZpZXdwb3J0LmFnLWxheW91dC1ub3JtYWwgOjotd2Via2l0LXNjcm9sbGJhci1idXR0b257YmFja2dyb3VuZDojY2NjfS5hZy1ib2R5LXZpZXdwb3J0LmFnLWxheW91dC1ub3JtYWw6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLXBpZWNle2JhY2tncm91bmQ6Izg4OH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUdyaWRDb21wb25lbnQge1xyXG4gXHJcblxyXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcclxuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JpZEFwaTtcclxuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XHJcbiAgc3RhdHVzQ29sdW1uID0gZmFsc2U7XHJcbiAgY2hhbmdlc01hcDogTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4gPSBuZXcgTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4oKTtcclxuICAgLy8gR3VhcmRhcmVtb3MgaWQgZGUgbGFzIGNlbGFzIG1vZGlmaWNhZGFzIGkgZWwgbsOCwrogZGUgZWRpY2lvbmVzIGhlY2hhcyBzb2JyZSBlc3Rhc1xyXG4gIHByaXZhdGUgcGFyYW1zOyAvLyBQYXJhbWV0cm9zIGRlbCBncmlkIGVuIGxhIHVsdGltYSBtb2RpZmljYWNpb24gaGVjaGEgKHBvciBzaSBoYWNlbW9zIGFwcGx5IGNoYW5nZXMpXHJcbiAgcm93RGF0YTogYW55W107XHJcbiAgY2hhbmdlQ291bnRlcjogbnVtYmVyOyAvLyBOdW1lcm8gZGUgZWRpY2lvbmVzIGhlY2hhcyBzb2JyZSBsYXMgY2VsYXNcclxuICBwcmV2aW91c0NoYW5nZUNvdW50ZXI6IG51bWJlcjsgLy8gIE51bWVybyBkZSBlZGljaW9uZXMgcXVlIGhhYmlhIGFudGVzIGRlIGhhY2VyIGxhIHVsdGltYSBtb2RpZmljYWNpb24gKGNoYW5nZUNvdW50ZXIpXHJcbiAgcmVkb0NvdW50ZXI6IG51bWJlcjsgLy8gTnVtZXJvIGRlIHJlZG8gcXVlIHBvZGVtb3MgaGFjZXJcclxuICBtb2RpZmljYXRpb25DaGFuZ2UgPSBmYWxzZTtcclxuICB1bmRvTm9DaGFuZ2VzID0gZmFsc2U7IC8vIEJvb2xlYW5vIHBhcmEgc2FiZXIgc2kgZXMgdW4gdW5kbyBwcm92b2NhZG8gcG9yIHVuIGNhbWJpbyBzaW4gbW9kaWZpY2FjaW9uZXNcclxuICBncmlkT3B0aW9ucztcclxuICBASW5wdXQoKSBmcmFtZXdvcmtDb21wb25lbnRzOiBhbnk7XHJcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XHJcbiAgQElucHV0KCkgZ2V0QWxsOiAoKSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbiAgQElucHV0KCkgZGlzY2FyZENoYW5nZXNCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdW5kb0J1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSByZWRvQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFwcGx5Q2hhbmdlc0J1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBkZWxldGVCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbmV3QnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGdsb2JhbFNlYXJjaDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0aGVtZUdyaWQ6IGFueTtcclxuXHJcblxyXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XHJcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPG51bWJlcj47XHJcbiAgQE91dHB1dCgpIHNlbmRDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XHJcbiAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgZmxleDogMSxcclxuICAgICAgICBmaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxyXG4gICAgICB9LFxyXG4gICAgICBjb2x1bW5UeXBlczoge1xyXG4gICAgICAgIGRhdGVDb2x1bW46IHtcclxuICAgICAgICAgICAgZmlsdGVyOiAnYWdEYXRlQ29sdW1uRmlsdGVyJyxcclxuICAgICAgICAgICAgZmlsdGVyUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgY29tcGFyYXRvcihmaWx0ZXJMb2NhbERhdGVBdE1pZG5pZ2h0LCBjZWxsVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVDZWxsVmFsdWUgPSBuZXcgRGF0ZShjZWxsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZUZpbHRlciA9IG5ldyBEYXRlKGZpbHRlckxvY2FsRGF0ZUF0TWlkbmlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRlQ2VsbFZhbHVlLmdldFRpbWUoKSA8IGRhdGVGaWx0ZXIuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZUNlbGxWYWx1ZS5nZXRUaW1lKCkgID4gZGF0ZUZpbHRlci5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdXBwcmVzc01lbnU6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXHJcbiAgICAgIHNpbmdsZUNsaWNrRWRpdDogdHJ1ZSxcclxuICAgICAgLy8gc3VwcHJlc3NIb3Jpem9udGFsU2Nyb2xsOiB0cnVlLFxyXG5cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xyXG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xyXG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcclxuICAgIHRoaXMuZ2V0RWxlbWVudHMoKTtcclxuICAgIHRoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCk7XHJcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcclxuICAgICAgaWYgKGNvbC5maWVsZCA9PT0gJ2VzdGF0Jykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzQ29sdW1uID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gXHJcbiAgIFxyXG5cclxuICB9XHJcblxyXG4gIHF1aWNrU2VhcmNoKCk6IHZvaWR7XHJcbiAgICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcclxuICB9XHJcblxyXG4gIGdldEVsZW1lbnRzKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmdldEFsbCgpXHJcbiAgICAuc3Vic2NyaWJlKChpdGVtcykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcclxuICAgICAgICB0aGlzLnJvd0RhdGEgPSBpdGVtcztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKX0sIDMwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRGF0YSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5ncmlkQXBpLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcclxuICAgIHRoaXMucmVtb3ZlLmVtaXQoc2VsZWN0ZWREYXRhKTtcclxuXHJcbiAgICBpZih0aGlzLnN0YXR1c0NvbHVtbilcclxuICAgIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLnJvd0luZGV4KTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSb3dzKXtcclxuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGlkKS5kYXRhLmVzdGF0ID0nRWxpbWluYXQnO1xyXG4gICAgICAgIH1cclxuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkucmVmcmVzaENlbGxzKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5kZXNlbGVjdEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgbmV3RGF0YSgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIHRoaXMubmV3LmVtaXQoLTEpO1xyXG4gIH1cclxuXHJcblxyXG4gIGFwcGx5Q2hhbmdlcygpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuY2hhbmdlc01hcC5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcclxuICAgIHRoaXMuY2hhbmdlc01hcC5jbGVhcigpO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xyXG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXHJcbiAge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5nZUNvdW50ZXI7IGkrKylcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGFuZ2VzTWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIG9uRmlsdGVyTW9kaWZpZWQoKTogdm9pZHtcclxuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIHVuZG8oKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyIC09IDE7XHJcbiAgICB0aGlzLnJlZG9Db3VudGVyICs9IDE7XHJcbiAgfVxyXG5cclxuICByZWRvKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIHRoaXMuZ3JpZEFwaS5yZWRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciArPSAxO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciAtPSAxO1xyXG4gIH1cclxuXHJcblxyXG4gIG9uQ2VsbEVkaXRpbmdTdG9wcGVkKGUpXHJcbiAge1xyXG4gICAgICBpZiAodGhpcy5tb2RpZmljYXRpb25DaGFuZ2UpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvdW50ZXIrKztcclxuICAgICAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcclxuICAgICAgICB0aGlzLm1vZGlmaWNhdGlvbkNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XHJcblxyXG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbW9zIGxvcyBwYXJhbWV0cm9zIHBvciBzaSBoYXkgcXVlIGhhY2VyIHVuIGFwcGx5IGNoYW5nZXNcclxuICAgIGlmICh0aGlzLmNoYW5nZUNvdW50ZXIgPiB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcilcclxuICAgICAgLy8gRXN0YSBjb25kaWNpw4PCs24gc2Vyw4PCoSBjaWVydGEgc2kgdmVuaW1vcyBkZSBlZGl0YXIgbGEgY2VsYSBvIGRlIGhhY2VyIHVuIHJlZG9cclxuICAgICAge1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmICghIHRoaXMuY2hhbmdlc01hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBTaSBubyBoYWJpYW1vcyBlZGl0YWRvIGxhIGNlbGEgY29uIGFudGVyaW9yaWRhZCwgbGEgYcODwrFhZGltb3MgYWwgbWFwIHkgbGEgcGludGFtb3MgZGUgdmVyZGVcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgYWRkTWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcclxuICAgICAgICAgICAgYWRkTWFwLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAxKVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCBhZGRNYXApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKCEgdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuaGFzKHBhcmFtcy5jb2xEZWYuZmllbGQpKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAvLyBTaSB5YSBoYWLDg8KtYW1vcyBtb2RpZmljYWRvIGxhIGNlbGEsIGF1bWVudGFtb3MgZWwgbnVtZXJvIGRlIGNhbWJpb3MgZW4gZXN0YVxyXG4gICAgICAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5nZXQocGFyYW1zLmNvbERlZi5maWVsZCk7XHJcbiAgICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5zZXQocGFyYW1zLmNvbERlZi5maWVsZCwgKGN1cnJlbnRDaGFuZ2VzICsgMSkpO1xyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApOyAvLyBDb20gaGEgZXN0YWRvIG1vZGlmaWNhZGEgbGEgbGluaWEsIGxhIHBpbnRhbW9zIGRlIHZlcmRlXHJcbiAgICAgICAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcisrOyAvL0lndWFsYW1vcyBlbCBjb250YWRvciBkZSBjYW1iaW9zIGFudGVyaW9yIGFsIGFjdHVhbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY2hhbmdlQ291bnRlciA8IHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyKXsgLy8gRW50cmFyw4PCoSBhcXXDg8KtIHNpIGhlbW9zIGhlY2hvIHVuIHVuZG9cclxuICAgICAgICBsZXQgY3VycmVudENoYW5nZXMgPSAtMTtcclxuICAgICAgICBpZiAodGhpcy5jaGFuZ2VzTWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIHtjdXJyZW50Q2hhbmdlcyA9IHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLmdldChwYXJhbXMuY29sRGVmLmZpZWxkKTt9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGN1cnJlbnRDaGFuZ2VzID09PSAxKSB7IC8vQWwgZGVzaGFjZXIgZWwgY2FtYmlvLCBsYSBkZWphcmVtb3MgZW4gc3UgZXN0YWRvIGluaWNpYWxcclxuXHJcbiAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5kZWxldGUocGFyYW1zLmNvbERlZi5maWVsZCk7XHJcbiAgICAgICAgICBpZih0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5zaXplID09PSAwKSB7IC8vIE5vIGhheSBtYXMgbW9kaWZpY2FjaW9uZXMgZW4gZXRhIGZpbGFcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VzTWFwLmRlbGV0ZShwYXJhbXMubm9kZS5pZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaSBzb2xvIHRpZW5lIHVuYSBtb2RpZmljYWNpb24sIHF1aWVyZSBkZWNpciBxdWUgbGEgY2VsYSBlc3TDg8KhIGVuIHN1IGVzdGFkbyBpbmljaWFsLCBwb3IgbG8gcXVlIGxhIHBpbnRhbW9zIGRlIGJsYW5jb1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcblxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMucGFpbnRDZWxscyhwYXJhbXMsIHRoaXMuY2hhbmdlc01hcCk7XHJcbiAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudENoYW5nZXMgPjEpIC8vIExhIGNlbGEgYcODwrpuIG5vIGVzdMODwqEgZW4gc3UgZXN0YWRvIGluaWNpYWwsIHBvciBsbyBxdWUgc2VnZ3VpcsODwqEgdmVyZGVcclxuICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gcG9kZW1vcyBoYWNlciBlbHNlIHBvciBzaSBoYWNlbW9zIHVuIHVuZG8gZGUgdW5hIGNlbGEgc2luIGNhbWJpb3NcclxuICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAoY3VycmVudENoYW5nZXMgLSAxKSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTsvLyBDb21vIGF1biB0aWVuZSBjYW1iaW9zLCBlbCBiYWNrZ3JvdW5kIHRpZW5lIHF1ZSBzZWd1aXIgdmVyZGVcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyLS07ICAvLyBDb20gdmVuaWVtIGQndW5kbywgaGVtIGRlIGRlY3JlbWVudGFyIGVsIGNvbXB0YWRvciBkZSBjYW52aXNBbnRlcmlvclxyXG4gICAgfVxyXG4gICAgZWxzZXsgLy8gQ29udHJvbCBkZSBtb2RpZmljYWNpb25lcyBlbiBibGFuY29cclxuICAgICAgaWYocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSApIC8vIE5vIGVzIG1vZGlmaWNhY2lvbiBlbiBibGFuY29cclxuICAgICAge1xyXG4gICAgICAgIHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNleyBcclxuICAgICAgICBpZiAoIHRoaXMuY2hhbmdlc01hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBNb2RpZmljYWNpb24gZW4gYmxhbmNvIHNvYnJlIHVuYSBjZWxhIG1vZGlmaWNhZGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZighdGhpcy51bmRvTm9DaGFuZ2VzKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7IC8vIFVuZG8gcGFyYSBkZXNoYWNlciBlbCBjYW1iaW8gc2luIG1vZGlmaWNhY2lvbmVzIGludGVybmFtZW50ZVxyXG4gICAgICAgICAgICB0aGlzLnVuZG9Ob0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50Q2VsbHMocGFyYW1zLCB0aGlzLmNoYW5nZXNNYXApOyAgLy8gQ29tbyBhdW4gdGllbmUgbW9kaWZpY2FjaW9uZXMsIGVsIGJhY2tncm91bmQgc2lndWUgc2llbmRvIHZlcmRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHsgdGhpcy51bmRvTm9DaGFuZ2VzID0gZmFsc2U7IH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIENvbW8gYWwgaGFjZXIgdW5kbyB2b2x2ZXLDg8KhIGEgZW50cmFyIGEgZXN0YSBtaXNtYSBmdW5jacODwrNuLCBoYXkgcXVlIGVudmlhcmxvIGEgc3UgaWYgY29ycmVzcG9uZGllbnRlXHJcbiAgICAgICAgICBpZighdGhpcy51bmRvTm9DaGFuZ2VzKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7IC8vIFVuZG8gcGFyYSBkZXNoYWNlciBlbCBjYW1iaW8gc2luIG1vZGlmaWNhY2lvbmVzIGludGVybmFtZW50ZVxyXG4gICAgICAgICAgICB0aGlzLnVuZG9Ob0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7IHRoaXMudW5kb05vQ2hhbmdlcyA9IGZhbHNlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkluZGV4QnlDb2xJZChhcGk6IENvbHVtbkFwaSwgY29sSWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gYXBpLmdldEFsbENvbHVtbnMoKS5maW5kSW5kZXgoY29sID0+IGNvbC5nZXRDb2xJZCgpID09PSBjb2xJZCk7XHJcbiAgfVxyXG4gIHBhaW50Q2VsbHMocGFyYW1zOiBhbnksICBjaGFuZ2VzTWFwOiBNYXA8bnVtYmVyLCBNYXA8c3RyaW5nLCBudW1iZXI+PiwgKVxyXG4gIHtcclxuICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VDZWxsU3R5bGVDb2x1bW5zKHBhcmFtcyxjaGFuZ2VzTWFwLCcjRThGMURFJyk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICB0aGlzLmNoYW5nZUNlbGxTdHlsZUNvbHVtbnMocGFyYW1zLGNoYW5nZXNNYXAsJyNGRkZGRkYnKTsgXHJcbiAgICAvLyBEZWZpbmlyZW1vcyBlbCBjZWxsU3R5bGUgYmxhbmNvIHBhcmEgZnV0dXJhcyBtb2RpZmljYWNpb25lcyBpbnRlcm5hcyAoZWo6IGZpbHRybylcclxuICB9XHJcblxyXG4gIGNoYW5nZUNlbGxTdHlsZUNvbHVtbnMocGFyYW1zOiBhbnksIGNoYW5nZXNNYXA6IE1hcDxudW1iZXIsIE1hcDxzdHJpbmcsIG51bWJlcj4+LCBjb2xvcjogc3RyaW5nKXtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBjaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkua2V5cygpKVxyXG4gICAge1xyXG4gICAgICBjb25zdCBjb2x1bW5OdW1iZXIgPSB0aGlzLmdldENvbHVtbkluZGV4QnlDb2xJZCh0aGlzLmdyaWRDb2x1bW5BcGksIGtleSk7XHJcbiAgICAgIHRoaXMuZ3JpZENvbHVtbkFwaS5jb2x1bW5Db250cm9sbGVyLmdyaWRDb2x1bW5zW2NvbHVtbk51bWJlcl0uY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yfTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWJ0bi1lZGl0LXJlbmRlcmVkJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImJ1dHRvbkVkaXRcIiAgdHlwZT1cImJ1dHRvblwiICAoY2xpY2spPVwiYnRuQ2xpY2tlZEhhbmRsZXIoJGV2ZW50KVwiID5cbiAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbkVkaXRcIiAgIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZWRpdCA8L21hdC1pY29uPlxuPC9idXR0b24+IGAsXG4gIHN0eWxlczogW2AuYnV0dG9uRWRpdHtjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6I2RkZDt3aWR0aDoyMHB4O21hcmdpbi10b3A6M3B4O2hlaWdodDoyMHB4O2JveC1zaGFkb3c6bm9uZX0uaWNvbkVkaXR7Zm9udC1zaXplOjEzcHg7bWFyZ2luLXRvcDotMTBweDttYXJnaW4tbGVmdDotMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEJ0bkVkaXRSZW5kZXJlZENvbXBvbmVudCBpbXBsZW1lbnRzIElDZWxsUmVuZGVyZXJBbmd1bGFyQ29tcCwgT25EZXN0cm95IHtcblxuICBwdWJsaWMgcGFyYW1zOiBhbnk7XG5cbiAgYWdJbml0KHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gIH1cblxuICByZWZyZXNoKHBhcmFtczogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBidG5DbGlja2VkSGFuZGxlcigkZXZlbnQpIHtcbiAgICB0aGlzLnBhcmFtcy5jbGlja2VkKHRoaXMucGFyYW1zLnZhbHVlKTtcbiAgfVxuXG4gIGdldFBhcmFtcygpe1xuICAgIHJldHVybiB0aGlzLnBhcmFtcztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIG5vIG5lZWQgdG8gcmVtb3ZlIHRoZSBidXR0b24gY2xpY2sgaGFuZGxlciBcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCwgSFRUUF9JTlRFUkNFUFRPUlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIE5vb3BBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBvbCBmcm9tICdvcGVubGF5ZXJzJztcclxuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGUsIFRyYW5zbGF0ZUxvYWRlcixUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBBbmd1bGFySGFsTW9kdWxlIH0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGV9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcbmltcG9ydCB7IERhdGFHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhLWdyaWQvZGF0YS1ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcclxuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHtNYXRNZW51TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcclxuaW1wb3J0IHsgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50IH0gZnJvbSAnLi9idG4tZWRpdC1yZW5kZXJlZC9idG4tZWRpdC1yZW5kZXJlZC5jb21wb25lbnQnO1xyXG5cclxuXHJcblxyXG5cclxuLyoqIFNJVE1VTiBwbHVnaW4gY29yZSBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBZ0dyaWRNb2R1bGUud2l0aENvbXBvbmVudHMoW10pLFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGVcclxuIFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIEJ0bkVkaXRSZW5kZXJlZENvbXBvbmVudCxcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRGF0YUdyaWRDb21wb25lbnQsXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZEd1aU1vZHVsZSB7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkFsbENvbW11bml0eU1vZHVsZXMiLCJFdmVudEVtaXR0ZXIiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIlJvdXRlck1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIk5vb3BBbmltYXRpb25zTW9kdWxlIiwiQW5ndWxhckhhbE1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIkFnR3JpZE1vZHVsZSIsIlNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiVHJhbnNsYXRlTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkFzRnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFD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