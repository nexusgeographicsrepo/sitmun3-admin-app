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
            this.columnaEstat = false;
            this.map = new Map();
            this.remove = new core.EventEmitter();
            this.new = new core.EventEmitter();
            this.sendChanges = new core.EventEmitter();
            this.comptadorCanvis = 0;
            this.comptadorCanvisAnterior = 0;
            this.comptadorRedo = 0;
            this.gridOptions = {
                defaultColDef: {
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
                            this.columnaEstat = true;
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
                if (this.columnaEstat) {
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
                this.new.emit(true);
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
                this.comptadorCanvis = 0;
                this.comptadorCanvisAnterior = 0;
                this.comptadorRedo = 0;
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
                for (var i = 0; i < this.comptadorCanvis; i++) {
                    this.gridApi.undoCellEditing();
                }
                this.map.clear();
                this.comptadorCanvisAnterior = 0;
                this.comptadorCanvis = 0;
                this.comptadorRedo = 0;
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
                this.comptadorCanvis -= 1;
                this.comptadorRedo += 1;
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
                this.comptadorCanvis += 1;
                this.comptadorRedo -= 1;
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
                this.comptadorCanvis++;
                this.comptadorRedo = 0;
                this.onCellValueChanged(e);
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
                this.params = params; // Guardarem els paramatres actuals per si hem de fer un apply changes
                if (this.comptadorCanvis > this.comptadorCanvisAnterior) {
                    if (!this.map.has(params.node.id)) {
                        this.map.set(params.node.id, 1);
                    }
                    else {
                        /** @type {?} */
                        var modificacionsActuals = this.map.get(params.node.id);
                        this.map.set(params.node.id, (modificacionsActuals + 1));
                    }
                    /** @type {?} */
                    var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com ha estat modificada la linea, la pintarem de verd
                    params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                    this.gridApi.redrawRows({ rowNodes: [row] });
                    params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
                    this.comptadorCanvisAnterior++;
                }
                if (this.comptadorCanvis < this.comptadorCanvisAnterior) {
                    /** @type {?} */
                    var modificacionsActuals = this.map.get(params.node.id);
                    if (modificacionsActuals === 1) {
                        // Si només te una modificació, vol dir que amb l'undo hem deixat la cela com a l'estat inicial, pel que l'hem de borrar del map
                        this.map.delete(params.node.id);
                        /** @type {?} */
                        var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                        params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                        this.gridApi.redrawRows({ rowNodes: [row] });
                    }
                    else {
                        this.map.set(params.node.id, (modificacionsActuals - 1));
                        /** @type {?} */
                        var row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com encara te modificacions, ha de tenir el background verd
                        params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                        this.gridApi.redrawRows({ rowNodes: [row] });
                        params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
                    }
                    this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
                }
            };
        DataGridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-data-grid',
                        template: "\n\n\n    <div id=grup1 >\n        <button  mat-mini-fab *ngIf=\"botoDescartarCanvis\"  id=\"borrarCanvis\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"comptadorCanvis <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab *ngIf=\"botoUndo\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"comptadorCanvis <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab *ngIf=\"botoRedo\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"comptadorRedo <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab  *ngIf=\"botoAplicarCanvis\"  id=\"aplicarCanvis\"  (click)=\"applyChanges()\" [disabled]=\"comptadorCanvis <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 >\n        <label *ngIf=\"searchGeneral\" >Search </label>\n        <input *ngIf=\"searchGeneral\"type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"botoElimina\"  mat-stroked-button id=\"botoElimina\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            Elimina\n        </button>\n        <button  *ngIf=\"botoNou\" mat-stroked-button id=\"botoNou\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>                 \n            Nou\n        </button>\n\n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div class=\"ag-theme-balham\" id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            class=\"ag-theme-balham\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
                        styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{background:no-repeat padding-box #68a225;margin-left:3px}#redo,#undo{background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{background:#df3133}#grup1{text-align:start;width:40%}#grup2{text-align:end;width:60%}#grup1,#grup2{display:inline-block}"]
                    },] },
        ];
        /** @nocollapse */
        DataGridComponent.ctorParameters = function () { return []; };
        DataGridComponent.propDecorators = {
            columnDefs: [{ type: core.Input }],
            getAll: [{ type: core.Input }],
            botoDescartarCanvis: [{ type: core.Input }],
            botoUndo: [{ type: core.Input }],
            botoRedo: [{ type: core.Input }],
            botoAplicarCanvis: [{ type: core.Input }],
            botoElimina: [{ type: core.Input }],
            botoNou: [{ type: core.Input }],
            searchGeneral: [{ type: core.Input }],
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
                            DataGridComponent
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

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL3NpdG11bi1mcm9udGVuZC1ndWkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufSIsImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYFxuXG5cbiAgICA8ZGl2IGlkPWdydXAxID5cbiAgICAgICAgPGJ1dHRvbiAgbWF0LW1pbmktZmFiICpuZ0lmPVwiYm90b0Rlc2NhcnRhckNhbnZpc1wiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2xvc2UgPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiICpuZ0lmPVwiYm90b1VuZG9cIiAgaWQ9XCJ1bmRvXCIgIChjbGljayk9XCJ1bmRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiB1bmRvIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9SZWRvXCIgIGlkPVwicmVkb1wiICAoY2xpY2spPVwicmVkbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvclJlZG8gPD0gMFwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gcmVkbyA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgICpuZ0lmPVwiYm90b0FwbGljYXJDYW52aXNcIiAgaWQ9XCJhcGxpY2FyQ2FudmlzXCIgIChjbGljayk9XCJhcHBseUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNoZWNrIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBpZD1ncnVwMiA+XG4gICAgICAgIDxsYWJlbCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcIiA+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcInR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImJvdG9FbGltaW5hXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxuICAgICAgICAgICAgRWxpbWluYVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJib3RvTm91XCIgbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiYm90b05vdVwiICAoY2xpY2spPVwibmV3RGF0YSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBOb3VcbiAgICAgICAgPC9idXR0b24+XG5cblxuICAgICAgICBcbiAgICA8L2Rpdj5cblxuXG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCIgaGVpZ2h0OiAxMDAlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXG4gICAgICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXG4gICAgICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcbiAgICAgICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxuICAgICAgICAgICAgKGNlbGxWYWx1ZUNoYW5nZWQpPVwib25DZWxsVmFsdWVDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG5gLFxuICBzdHlsZXM6IFtgaW5wdXQsbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjVweCA1cHggNXB4IDEwcHh9I2JvdG9Ob3V7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYm90b0VsaW1pbmF7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHh9I2FwbGljYXJDYW52aXN7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I3JlZG8sI3VuZG97YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jcmVkb1tkaXNhYmxlZF0sI3VuZG9bZGlzYWJsZWRde2JhY2tncm91bmQ6I2ZmYzk3ZjttYXJnaW4tbGVmdDozcHh9I2JvcnJhckNhbnZpc3tiYWNrZ3JvdW5kOiNkZjMxMzN9I2dydXAxe3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6NDAlfSNncnVwMnt0ZXh0LWFsaWduOmVuZDt3aWR0aDo2MCV9I2dydXAxLCNncnVwMntkaXNwbGF5OmlubGluZS1ibG9ja31gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIGNvbHVtbmFFc3RhdCA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW0gbCdpZCBkZSBsZXMgY2VsZXMgbW9kaWZpY2FkZXMgaSBlbCBuw4LCuiBkJ2VkaWNpb25zIHNvYnJlIGFxdWVzdGVzXG4gIHByaXZhdGUgcGFyYW1zOyAvLyBQYXJhbXMgZGVsIGdyaWQgYSBsJ8ODwrpsdGltYSBtb2RpZmljYWNpbyAocGVyIHNpIGZlbSBhcHBseSBjaGFuZ2VzKVxuICByb3dEYXRhOiBhbnlbXTtcbiAgY29tcHRhZG9yQ2FudmlzOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGZldGVzIHNvYnJlIGNlbGVzXG4gIGNvbXB0YWRvckNhbnZpc0FudGVyaW9yOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGFudGVyaW9yIGEgbCdhY3R1YWwgKGNvbXB0YWRvckNhbnZpcylcbiAgY29tcHRhZG9yUmVkbzogbnVtYmVyOyAvLyBOb21icmUgZGUgcmVkb3MgcXVlIHBvZGVtIGZlclxuICBncmlkT3B0aW9ucztcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSBib3RvRGVzY2FydGFyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvVW5kbzogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b1JlZG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvdG9BcGxpY2FyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvRWxpbWluYTogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b05vdTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VhcmNoR2VuZXJhbDogYm9vbGVhbjtcblxuXG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5hRXN0YXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiBcbiAgIFxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoc2VsZWN0ZWREYXRhKTtcblxuICAgIGlmKHRoaXMuY29sdW1uYUVzdGF0KVxuICAgIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5yb3dJbmRleCk7XG5cbiAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSb3dzKXtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShpZCkuZGF0YS5lc3RhdCA9J0VsaW1pbmF0JztcbiAgICAgICAgfVxuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkucmVmcmVzaENlbGxzKCk7XG4gICAgfVxuICB9XG5cblxuXG5cblxuXG4gIG5ld0RhdGEoKTogdm9pZFxuICB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLm5ldy5lbWl0KHRydWUpO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCk6IHZvaWRcbiAge1xuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMubWFwLmtleXMoKSlcbiAgICB7XG4gICAgICBpdGVtc0NoYW5nZWQucHVzaCh0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShrZXkpLmRhdGEpO1xuICAgIH1cbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuXG4gIGRlbGV0ZUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbXB0YWRvckNhbnZpczsgaSsrKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cbiAgb25GaWx0ZXJNb2RpZmllZCgpOiB2b2lke1xuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xuICB9XG5cblxuICB1bmRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzIC09IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvICs9IDE7XG4gIH1cblxuICByZWRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnJlZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzICs9IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvIC09IDE7XG4gIH1cblxuXG4gIG9uQ2VsbEVkaXRpbmdTdG9wcGVkKGUpXG4gIHtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcysrO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XG4gIH1cblxuXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyAvLyBHdWFyZGFyZW0gZWxzIHBhcmFtYXRyZXMgYWN0dWFscyBwZXIgc2kgaGVtIGRlIGZlciB1biBhcHBseSBjaGFuZ2VzXG5cbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKVxuICAgICAgLy8gQXF1ZXN0YSBjb25kaWNpw4PCsyBzZXLDg8KgIGNlcnRhIHNpIHZlbmltIGQnZWRpdGFyIG8gZGUgZmVyIHVuIHJlZG8gKGNvbXB0YWRvciBjYW52aXMgPiksIHBlcsODwrIgbm8gc2kgdmVuaW0gZCd1biB1bmRvXG5cbiAgICAgIHtcbiAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGVtIGVkaXRhdCBsYSBjZWxhIGFtYiBhbnRlcmlvcml0YXQsIGwnYWZlZ2lyZW0gYWwgbWFwIGkgY2FudmlhcmVtIGVsIGJhY2tncm91bmQgYSB2ZXJkXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgIC8vIFNpIGphIGVzdGF2YSBtb2RpZmljYWRhLCBpbmNyZW1lbnRhcmVtIGVsIG5vbWJyZSBkZSBjYW52aXMgZCdhcXVlc3RhIGNlbGEgYWwgbWFwXG4gICAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBoYSBlc3RhdCBtb2RpZmljYWRhIGxhIGxpbmVhLCBsYSBwaW50YXJlbSBkZSB2ZXJkXG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IrKztcblxuICAgICAgfVxuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA8IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpeyAvLyBFbnRyYXLDg8KgIGFxdcODwq0gc2kgdmVuaW0gZCd1biB1bmRvXG4gICAgICAgIC8vIENvbSBzYWJlbSBxdWUgamEgaGF2aWVtIGVkaXRhdCBsYSBjZWxhLCBhZ2FmZW0gZWwgbm9tYnJlIGRlIG1vZGlmaWNhY2lvbnMgcXVlIGwnaGVtIGZldFxuICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG5cbiAgICAgICAgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID09PSAxKSB7XG4gICAgICAgICAgLy8gU2kgbm9tw4PCqXMgdGUgdW5hIG1vZGlmaWNhY2nDg8KzLCB2b2wgZGlyIHF1ZSBhbWIgbCd1bmRvIGhlbSBkZWl4YXQgbGEgY2VsYSBjb20gYSBsJ2VzdGF0IGluaWNpYWwsIHBlbCBxdWUgbCdoZW0gZGUgYm9ycmFyIGRlbCBtYXBcbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgLy8gTGEgY2VsYSBlbmNhcmEgbm8gZXN0w4PCoCBjb20gYSBsJ2VzdGF0IGluaWNpYWwsIHBlbCBxdWUgbm9tZXMgcmVzdGVtIGVsIG5vbWJyZSBkZSBtb2RpZmljYWNpb25zIGFsIG1hcFxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgLSAxKSk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGVuY2FyYSB0ZSBtb2RpZmljYWNpb25zLCBoYSBkZSB0ZW5pciBlbCBiYWNrZ3JvdW5kIHZlcmRcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRThGMURFJ307XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtIGVsIGNlbGxTdHlsZSBibGFuYyBwZXIgcHJveGltZXMgY2VsZXNcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yLS07ICAvLyBDb20gdmVuaWVtIGQndW5kbywgaGVtIGRlIGRlY3JlbWVudGFyIGVsIGNvbXB0YWRvciBkZSBjYW52aXNBbnRlcmlvclxuICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50LCBIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1NpdG11bkZyb250ZW5kQ29yZU1vZHVsZX0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5cclxuXHJcblxyXG5cclxuLyoqIFNJVE1VTiBwbHVnaW4gY29yZSBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBZ0dyaWRNb2R1bGUud2l0aENvbXBvbmVudHMoW10pLFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuIFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXSwibmFtZXMiOlsiQWxsQ29tbXVuaXR5TW9kdWxlcyIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiTm9vcEFuaW1hdGlvbnNNb2R1bGUiLCJBbmd1bGFySGFsTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiQWdHcmlkTW9kdWxlIiwiU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIlRyYW5zbGF0ZU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBc0Z5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7OztRQ0FDOzJCQTdCb0JBLDhCQUFtQjtnQ0FJeEIsS0FBSzt1QkFDTyxJQUFJLEdBQUcsRUFBa0I7WUEwQmxELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSUMsaUJBQVksRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSUEsaUJBQVksRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSUEsaUJBQVksRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRztnQkFDakIsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRSxJQUFJO29CQUNkLFNBQVMsRUFBRSxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUM7aUJBQ3hDO2dCQUNELFlBQVksRUFBRSxVQUFVO2FBRXpCLENBQUM7U0FFSDs7Ozs7UUFJRCx1Q0FBVzs7OztZQUFYLFVBQVksTUFBTTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7b0JBQ2hDLEtBQWtCLElBQUEsS0FBQUMsU0FBQSxJQUFJLENBQUMsVUFBVSxDQUFBLGdCQUFBO3dCQUE1QixJQUFNLEdBQUcsV0FBQTt3QkFDWixJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFOzRCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt5QkFDMUI7cUJBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7YUFJRjs7OztRQUVELHVDQUFXOzs7WUFBWDtnQkFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDakQ7Ozs7UUFFRCx1Q0FBVzs7O1lBQVg7Z0JBQUEsaUJBT0M7Z0JBTEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDWixTQUFTLENBQUMsVUFBQyxLQUFLO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUN4QixDQUFDLENBQUM7YUFDSjs7OztRQUVELHNDQUFVOzs7WUFBVjtnQkFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBQ2hDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7Z0JBQ3RELElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxHQUFBLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRS9CLElBQUcsSUFBSSxDQUFDLFlBQVksRUFDcEI7O29CQUNFLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQzs7d0JBRTlELEtBQWlCLElBQUEsaUJBQUFBLFNBQUEsWUFBWSxDQUFBLDBDQUFBOzRCQUF4QixJQUFNLEVBQUUseUJBQUE7NEJBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRSxVQUFVLENBQUM7eUJBQ3BEOzs7Ozs7Ozs7Ozs7Ozs7b0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3JDOzthQUNGOzs7O1FBT0QsbUNBQU87OztZQUFQO2dCQUVFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQjs7OztRQUVELHdDQUFZOzs7WUFBWjs7Z0JBRUUsSUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7b0JBQ2hDLEtBQWtCLElBQUEsS0FBQUEsU0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBLGdCQUFBO3dCQUE1QixJQUFNLEdBQUcsV0FBQTt3QkFFWixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN0RDs7Ozs7Ozs7Ozs7Ozs7O2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBSSxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7YUFDM0I7Ozs7UUFJRCx5Q0FBYTs7O1lBQWI7Z0JBRUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQzdDO29CQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQzNCOzs7O1FBR0QsNENBQWdCOzs7WUFBaEI7Z0JBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCOzs7O1FBR0QsZ0NBQUk7OztZQUFKO2dCQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7YUFDekI7Ozs7UUFFRCxnQ0FBSTs7O1lBQUo7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQzthQUN6Qjs7Ozs7UUFHRCxnREFBb0I7Ozs7WUFBcEIsVUFBcUIsQ0FBQztnQkFFcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCOzs7OztRQUdELDhDQUFrQjs7OztZQUFsQixVQUFtQixNQUFNO2dCQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFFckIsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFHckQ7b0JBQ0UsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ2xDO3dCQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNqQzt5QkFDRzs7d0JBRUYsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLEVBQUUsQ0FBQztxQkFDMUQ7O29CQUNELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO29CQUN2RCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztpQkFFaEM7Z0JBQ0gsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBQzs7b0JBRXBELElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFMUQsSUFBSSxvQkFBb0IsS0FBSyxDQUFDLEVBQUU7O3dCQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzt3QkFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO3dCQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztxQkFDNUM7eUJBRUQ7d0JBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLENBQUM7O3dCQUN6RCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7d0JBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztxQkFDeEQ7b0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7aUJBQ2hDO2FBQ0Y7O29CQWhTSkMsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxlQUFlO3dCQUN6QixRQUFRLEVBQUUsMHFGQStEWDt3QkFDQyxNQUFNLEVBQUUsQ0FBQywyZ0JBQTJnQixDQUFDO3FCQUN0aEI7Ozs7O2lDQWtCRUMsVUFBSzs2QkFDTEEsVUFBSzswQ0FDTEEsVUFBSzsrQkFDTEEsVUFBSzsrQkFDTEEsVUFBSzt3Q0FDTEEsVUFBSztrQ0FDTEEsVUFBSzs4QkFDTEEsVUFBSztvQ0FDTEEsVUFBSzs2QkFJTEMsV0FBTTswQkFDTkEsV0FBTTtrQ0FDTkEsV0FBTTs7Z0NBMUdUOzs7Ozs7O0FDQUE7Ozs7Ozs7b0JBMkJDQyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxtQkFBWTs0QkFDWkMscUJBQWdCOzRCQUNoQkMsbUJBQVk7NEJBQ1pDLGlCQUFXOzRCQUNYQywrQkFBb0I7NEJBQ3BCQyw2QkFBZ0I7NEJBQ2hCQyx5QkFBbUI7NEJBQ25CQyxrQ0FBdUI7NEJBQ3ZCQyxvQkFBWSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7NEJBQy9CQyxxQ0FBd0I7NEJBQ3hCQyxzQkFBZTs0QkFDZkMsa0JBQWE7eUJBRWQ7d0JBQ0QsWUFBWSxFQUFFOzRCQUNaLGlCQUFpQjt5QkFDbEI7d0JBQ0QsZUFBZSxFQUFFLEVBQ2hCO3dCQUNELFNBQVMsRUFBRSxFQUNWO3dCQUNELE9BQU8sRUFBRTs0QkFDUFYscUJBQWdCOzRCQUNoQkMsbUJBQVk7NEJBQ1pDLGlCQUFXOzRCQUNYQywrQkFBb0I7NEJBQ3BCQyw2QkFBZ0I7NEJBQ2hCTyxzQkFBZTs0QkFDZk4seUJBQW1COzRCQUNuQixpQkFBaUI7NEJBQ2pCRyxxQ0FBd0I7eUJBQ3pCO3FCQUNGOztzQ0E3REQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==