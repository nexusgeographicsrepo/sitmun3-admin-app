(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ag-grid-community/all-modules'), require('@angular/forms'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser/animations'), require('@angular/router'), require('@ngx-translate/core'), require('@sitmun/frontend-core'), require('@ag-grid-community/angular'), require('@angular/material/button'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('@sitmun/frontend-gui', ['exports', '@angular/core', '@ag-grid-community/all-modules', '@angular/forms', '@angular/common', '@angular/common/http', '@angular/platform-browser/animations', '@angular/router', '@ngx-translate/core', '@sitmun/frontend-core', '@ag-grid-community/angular', '@angular/material/button', '@angular/material/icon'], factory) :
    (factory((global.sitmun = global.sitmun || {}, global.sitmun['frontend-gui'] = {}),global.ng.core,null,global.ng.forms,global.ng.common,global.ng.common.http,global.ng.platformBrowser.animations,global.ng.router,null,null,null,global.ng.material.button,global.ng.material.icon));
}(this, (function (exports,core,allModules,forms,common,http,animations,router,core$1,frontendCore,angular,button,icon) { 'use strict';

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
            this.map = new Map();
            this.modificationChange = false;
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
                rowSelection: 'multiple',
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
                    for (var _a = __values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                this.map.clear();
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
                this.map.clear();
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
                        if (!this.map.has(params.node.id)) {
                            this.map.set(params.node.id, 1);
                        }
                        else {
                            /** @type {?} */
                            var currentChanges = this.map.get(params.node.id);
                            this.map.set(params.node.id, (currentChanges + 1));
                        }
                        /** @type {?} */
                        var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com ha estado modificada la linia, la pintamos de verde
                        params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                        this.gridApi.redrawRows({ rowNodes: [row] });
                        params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definiremos el cellStyle blanco para futuras modificaciones internas (ej: filtro)
                        this.previousChangeCounter++;
                    }
                }
                else if (this.changeCounter < this.previousChangeCounter) {
                    /** @type {?} */
                    var currentChanges = this.map.get(params.node.id);
                    if (currentChanges === 1) {
                        // Si solo tiene una modificacion, quiere decir que la cela está en su estado inicial, por lo que la pintamos de blanco
                        this.map.delete(params.node.id);
                        /** @type {?} */
                        var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                        params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                        this.gridApi.redrawRows({ rowNodes: [row] });
                    }
                    else if (currentChanges > 1) {
                        // No podemos hacer else por si hacemos un undo de una cela sin cambios
                        this.map.set(params.node.id, (currentChanges - 1));
                        /** @type {?} */
                        var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Como aun tiene cambios, el background tiene que seguir verde
                        params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                        this.gridApi.redrawRows({ rowNodes: [row] });
                        params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
                    }
                    this.previousChangeCounter--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
                }
                else {
                    console.log(params);
                    if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                        this.modificationChange = true;
                    }
                    else {
                        if (this.map.has(params.node.id)) {
                            /** @type {?} */
                            var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com encara te modificacions, ha de tenir el background verd
                            params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                            this.gridApi.redrawRows({ rowNodes: [row] });
                            params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definiremos el cellStyle blanco para futuras modificaciones internas (ej: filtro)
                        }
                        else {
                            this.previousChangeCounter++; // Como al hacer undo volverá a entrar a esta misma función, hay que enviarlo a su if correspondiente
                            this.gridApi.undoCellEditing(); //Undo para deshacer el cambio sin modificaciones internamente
                        }
                    }
                }
            };
        DataGridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-data-grid',
                        template: "    <div id=grup1 class=\"editDivBtns\">\n        <button  mat-mini-fab class=\"editBtn\"  *ngIf=\"discardChangesButton\"  id=\"borrarCanvis\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"changeCounter <= 0\">\n            <mat-icon  fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"undoButton\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"redoButton\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"redoCounter <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"applyChangesButton\"  id=\"aplicarCanvis\"  (click)=\"applyChanges()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 class=\"actionsDivBtns\" >\n        <label *ngIf=\"globalSearch\" [translate]=\"'Search'\"> </label>\n        <input *ngIf=\"globalSearch\"type=\"text\" class=\"searchGenericInput\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"deleteButton\"  mat-stroked-button id=\"botoElimina\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            <span  [translate]=\"'Remove'\"> </span>\n            \n        </button>\n        <button  *ngIf=\"newButton\" mat-stroked-button id=\"botoNou\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'New'\"> </span>           \n        </button>\n\n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div class=\"ag-theme-alpine\" id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            class=\"ag-theme-alpine\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            [frameworkComponents]=\"frameworkComponents\"\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
                        styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#aplicarCanvis[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{color:#fff!important;background:#df3133}#borrarCanvis[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{text-align:start;width:20%;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:80%;height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:50%!important}"]
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
                        styles: [".buttonEdit{color:#000;background-color:#ddd;width:24px;height:24px}.iconEdit{font-size:16px;margin-top:-8px}"]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvc2l0bXVuLWZyb250ZW5kLWd1aS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59IiwiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgaWQ9Z3J1cDEgY2xhc3M9XCJlZGl0RGl2QnRuc1wiPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJkaXNjYXJkQ2hhbmdlc0J1dHRvblwiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uICBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNsb3NlIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJ1bmRvQnV0dG9uXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwicmVkb0J1dHRvblwiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJyZWRvQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cImFwcGx5Q2hhbmdlc0J1dHRvblwiICBpZD1cImFwbGljYXJDYW52aXNcIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJnbG9iYWxTZWFyY2hcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiZ2xvYmFsU2VhcmNoXCJ0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoR2VuZXJpY0lucHV0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZGVsZXRlQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZGVsZXRlIDwvbWF0LWljb24+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidSZW1vdmUnXCI+IDwvc3Bhbj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJib3RvTm91XCIgIChjbGljayk9XCJuZXdEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBhZGRfY2lyY2xlX291dGxpbmUgPC9tYXQtaWNvbj4gICAgICBcclxuICAgICAgICAgICAgPHNwYW4gIFt0cmFuc2xhdGVdPVwiJ05ldydcIj4gPC9zcGFuPiAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG5cclxuICAgICAgICBcclxuICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1hbHBpbmVcIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cclxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYWxwaW5lXCJcclxuICAgICAgICAgICAgW2Zsb2F0aW5nRmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcclxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXHJcbiAgICAgICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXHJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXHJcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcclxuICAgICAgICAgICAgW3N1cHByZXNzUm93Q2xpY2tTZWxlY3Rpb25dPXRydWVcclxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxyXG4gICAgICAgICAgICBbZnJhbWV3b3JrQ29tcG9uZW50c109XCJmcmFtZXdvcmtDb21wb25lbnRzXCJcclxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxyXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcclxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuXHJcbmAsXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jYm90b05vdXtjb2xvcjojZmZmO2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNib3RvRWxpbWluYXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc1tkaXNhYmxlZF17YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzgzOTc2Y30jcmVkbywjdW5kb3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZjkzMDA7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvW2Rpc2FibGVkXSwjdW5kb1tkaXNhYmxlZF17YmFja2dyb3VuZDojZmZjOTdmO21hcmdpbi1sZWZ0OjNweH0jYm9ycmFyQ2Fudmlze2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RmMzEzM30jYm9ycmFyQ2FudmlzW2Rpc2FibGVkXXtjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkYThjOGV9LmVkaXREaXZCdG5ze3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6MjAlO2hlaWdodDozMHB4IWltcG9ydGFudDtsaW5lLWhlaWdodDozMHB4IWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnN7dGV4dC1hbGlnbjplbmQ7d2lkdGg6ODAlO2hlaWdodDo2MHB4fS5hY3Rpb25zRGl2QnRucywuZWRpdERpdkJ0bnN7ZGlzcGxheTppbmxpbmUtYmxvY2shaW1wb3J0YW50fS5hY3Rpb25zRGl2QnRucyAubWF0LXN0cm9rZWQtYnV0dG9ue3BhZGRpbmc6NXB4IDIwcHghaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFiIC5tYXQtYnV0dG9uLXdyYXBwZXJ7cGFkZGluZzppbmhlcml0IWltcG9ydGFudDtkaXNwbGF5OmluaGVyaXQhaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LWljb257aGVpZ2h0OjMwcHghaW1wb3J0YW50O2JvdHRvbTo1cHg7cG9zaXRpb246cmVsYXRpdmV9LmVkaXREaXZCdG5zIC5tYXQtbWluaS1mYWJ7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH0uYWN0aW9uc0RpdkJ0bnMgLnNlYXJjaEdlbmVyaWNJbnB1dHtoZWlnaHQ6NDVweCFpbXBvcnRhbnQ7d2lkdGg6NTAlIWltcG9ydGFudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIHN0YXR1c0NvbHVtbiA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW1vcyBlbCBpZCBkZSBsYXMgY2VsYXMgbW9kaWZpY2FkYXMgaSBlbCBuw4LCuiBkZSBlZGljaW9uZXMgaGVjaGFzIHNvYnJlIGVzdGFzXG4gIHByaXZhdGUgcGFyYW1zOyAvL1BhcmFtZXRyb3MgZGVsIGdyaWQgZW4gbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiBoZWNoYSAocG9yIHNpIGhhY2Vtb3MgYXBwbHkgY2hhbmdlcylcbiAgcm93RGF0YTogYW55W107XG4gIGNoYW5nZUNvdW50ZXI6IG51bWJlcjsgLy8gTnVtZXJvIGRlIGVkaWNpb25lcyBoZWNoYXMgc29icmUgbGFzIGNlbGFzXG4gIHByZXZpb3VzQ2hhbmdlQ291bnRlcjogbnVtYmVyOyAvLyAgTnVtZXJvIGRlIGVkaWNpb25lcyBxdWUgaGFiaWEgYW50ZXMgZGUgaGFjZXIgbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiAoY2hhbmdlQ291bnRlcilcbiAgcmVkb0NvdW50ZXI6IG51bWJlcjsgLy8gTnVtZXJvIGRlIHJlZG8gcXVlIHBvZGVtb3MgaGFjZXJcbiAgbW9kaWZpY2F0aW9uQ2hhbmdlID0gZmFsc2U7XG4gIGdyaWRPcHRpb25zO1xuICBASW5wdXQoKSBmcmFtZXdvcmtDb21wb25lbnRzOiBhbnk7XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgQElucHV0KCkgZGlzY2FyZENoYW5nZXNCdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVuZG9CdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZG9CdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFwcGx5Q2hhbmdlc0J1dHRvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgZGVsZXRlQnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSBuZXdCdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGdsb2JhbFNlYXJjaDogYm9vbGVhbjtcblxuXG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5uZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5zZW5kQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xuICAgICAgZGVmYXVsdENvbERlZjoge1xuICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcbiAgICAgIC8vIHN1cHByZXNzSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcbiAgICAgICAgdGhpcy5zdGF0dXNDb2x1bW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiBcbiAgIFxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpfSwgMzApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG5cbiAgICBpZih0aGlzLnN0YXR1c0NvbHVtbilcbiAgICB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUucm93SW5kZXgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLmdldFJvd05vZGUoaWQpLmRhdGEuZXN0YXQgPSdFbGltaW5hdCc7XG4gICAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xuICAgIH1cbiAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5kZXNlbGVjdEFsbCgpO1xuICB9XG5cblxuXG5cblxuICBuZXdEYXRhKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5uZXcuZW1pdCgtMSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tYXAua2V5cygpKVxuICAgIHtcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2VuZENoYW5nZXMuZW1pdChpdGVtc0NoYW5nZWQpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbmdlQ291bnRlcjsgaSsrKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cbiAgb25GaWx0ZXJNb2RpZmllZCgpOiB2b2lke1xuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xuICB9XG5cblxuICB1bmRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY2hhbmdlQ291bnRlciAtPSAxO1xuICAgIHRoaXMucmVkb0NvdW50ZXIgKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyICs9IDE7XG4gICAgdGhpcy5yZWRvQ291bnRlciAtPSAxO1xuICB9XG5cblxuICBvbkNlbGxFZGl0aW5nU3RvcHBlZChlKVxuICB7XG4gICAgICBpZiAodGhpcy5tb2RpZmljYXRpb25DaGFuZ2UpXG4gICAgICB7XG4gICAgICAgIHRoaXMuY2hhbmdlQ291bnRlcisrO1xuICAgICAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XG4gICAgICAgIHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICB9XG4gIH1cblxuXG5cbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbW9zIGxvcyBwYXJhbWV0cm9zIHBvciBzaSBoYXkgcXVlIGhhY2VyIHVuIGFwcGx5IGNoYW5nZXNcblxuICAgIGlmICh0aGlzLmNoYW5nZUNvdW50ZXIgPiB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcilcbiAgICAgIC8vIEVzdGEgY29uZGljacODwrNuIHNlcsODwqEgY2llcnRhIHNpIHZlbmltb3MgZGUgZWRpdGFyIGxhIGNlbGEgbyBkZSBoYWNlciB1biByZWRvXG4gICAgICB7XG4gICAgICAgIGlmIChwYXJhbXMub2xkVmFsdWUgIT09IHBhcmFtcy52YWx1ZSAmJiAhKHBhcmFtcy5vbGRWYWx1ZSA9PSBudWxsICYmIHBhcmFtcy52YWx1ZSA9PT0gJycpKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGFiaWFtb3MgZWRpdGFkbyBsYSBjZWxhIGNvbiBhbnRlcmlvcmlkYWQsIGxhIGHDg8KxYWRpbW9zIGFsIG1hcCB5IGxhIHBpbnRhbW9zIGRlIHZlcmRlXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAvLyBTaSB5YSBoYWLDg8KtYW1vcyBtb2RpZmljYWRvIGxhIGNlbGEsIGF1bWVudGFtb3MgZWwgbnVtZXJvIGRlIGNhbWJpb3MgZW4gZXN0YVxuICAgICAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAoY3VycmVudENoYW5nZXMgKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBoYSBlc3RhZG8gbW9kaWZpY2FkYSBsYSBsaW5pYSwgbGEgcGludGFtb3MgZGUgdmVyZGVcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRThGMURFJ307XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtb3MgZWwgY2VsbFN0eWxlIGJsYW5jbyBwYXJhIGZ1dHVyYXMgbW9kaWZpY2FjaW9uZXMgaW50ZXJuYXMgKGVqOiBmaWx0cm8pXG4gICAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIrKztcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGFuZ2VDb3VudGVyIDwgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIpeyAvLyBFbnRyYXLDg8KhIGFxdcODwq0gc2kgaGVtb3MgaGVjaG8gdW4gdW5kb1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGN1cnJlbnRDaGFuZ2VzID09PSAxKSB7XG4gICAgICAgICAgLy8gU2kgc29sbyB0aWVuZSB1bmEgbW9kaWZpY2FjaW9uLCBxdWllcmUgZGVjaXIgcXVlIGxhIGNlbGEgZXN0w4PCoSBlbiBzdSBlc3RhZG8gaW5pY2lhbCwgcG9yIGxvIHF1ZSBsYSBwaW50YW1vcyBkZSBibGFuY29cbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDaGFuZ2VzID4xKSAvLyBMYSBjZWxhIGHDg8K6biBubyBlc3TDg8KhIGVuIHN1IGVzdGFkbyBpbmljaWFsLCBwb3IgbG8gcXVlIHNlZ2d1aXLDg8KhIHZlcmRlXG4gICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBwb2RlbW9zIGhhY2VyIGVsc2UgcG9yIHNpIGhhY2Vtb3MgdW4gdW5kbyBkZSB1bmEgY2VsYSBzaW4gY2FtYmlvc1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKGN1cnJlbnRDaGFuZ2VzIC0gMSkpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbW8gYXVuIHRpZW5lIGNhbWJpb3MsIGVsIGJhY2tncm91bmQgdGllbmUgcXVlIHNlZ3VpciB2ZXJkZVxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyLS07ICAvLyBDb20gdmVuaWVtIGQndW5kbywgaGVtIGRlIGRlY3JlbWVudGFyIGVsIGNvbXB0YWRvciBkZSBjYW52aXNBbnRlcmlvclxuICAgIH1cbiAgICBlbHNle1xuICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgIGlmKHBhcmFtcy5vbGRWYWx1ZSAhPT0gcGFyYW1zLnZhbHVlICYmICEocGFyYW1zLm9sZFZhbHVlID09IG51bGwgJiYgcGFyYW1zLnZhbHVlID09PSAnJykgKVxuICAgICAge1xuICAgICAgICB0aGlzLm1vZGlmaWNhdGlvbkNoYW5nZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBpZiAoIHRoaXMubWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpXG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gZW5jYXJhIHRlIG1vZGlmaWNhY2lvbnMsIGhhIGRlIHRlbmlyIGVsIGJhY2tncm91bmQgdmVyZFxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW1vcyBlbCBjZWxsU3R5bGUgYmxhbmNvIHBhcmEgZnV0dXJhcyBtb2RpZmljYWNpb25lcyBpbnRlcm5hcyAoZWo6IGZpbHRybylcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyKys7IC8vIENvbW8gYWwgaGFjZXIgdW5kbyB2b2x2ZXLDg8KhIGEgZW50cmFyIGEgZXN0YSBtaXNtYSBmdW5jacODwrNuLCBoYXkgcXVlIGVudmlhcmxvIGEgc3UgaWYgY29ycmVzcG9uZGllbnRlXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpOyAvL1VuZG8gcGFyYSBkZXNoYWNlciBlbCBjYW1iaW8gc2luIG1vZGlmaWNhY2lvbmVzIGludGVybmFtZW50ZVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWJ0bi1lZGl0LXJlbmRlcmVkJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImJ1dHRvbkVkaXRcIiAgdHlwZT1cImJ1dHRvblwiICAoY2xpY2spPVwiYnRuQ2xpY2tlZEhhbmRsZXIoJGV2ZW50KVwiID5cbiAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbkVkaXRcIiAgIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZWRpdCA8L21hdC1pY29uPlxuPC9idXR0b24+IGAsXG4gIHN0eWxlczogW2AuYnV0dG9uRWRpdHtjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6I2RkZDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4fS5pY29uRWRpdHtmb250LXNpemU6MTZweDttYXJnaW4tdG9wOi04cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50IGltcGxlbWVudHMgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wLCBPbkRlc3Ryb3kge1xuXG4gIHB1YmxpYyBwYXJhbXM6IGFueTtcblxuICBhZ0luaXQocGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIHJlZnJlc2gocGFyYW1zOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGJ0bkNsaWNrZWRIYW5kbGVyKCRldmVudCkge1xuICAgIHRoaXMucGFyYW1zLmNsaWNrZWQodGhpcy5wYXJhbXMudmFsdWUpO1xuICB9XG5cbiAgZ2V0UGFyYW1zKCl7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gbm8gbmVlZCB0byByZW1vdmUgdGhlIGJ1dHRvbiBjbGljayBoYW5kbGVyIFxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50LCBIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1NpdG11bkZyb250ZW5kQ29yZU1vZHVsZX0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBCdG5FZGl0UmVuZGVyZWRDb21wb25lbnQgfSBmcm9tICcuL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudCc7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXSwibmFtZXMiOlsiQWxsQ29tbXVuaXR5TW9kdWxlcyIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiTm9vcEFuaW1hdGlvbnNNb2R1bGUiLCJBbmd1bGFySGFsTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiQWdHcmlkTW9kdWxlIiwiU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIlRyYW5zbGF0ZU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBc0Z5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFN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