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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL3NpdG11bi1mcm9udGVuZC1ndWkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufSIsImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYFxuXG5cbiAgICA8ZGl2IGlkPWdydXAxID5cbiAgICAgICAgPGJ1dHRvbiAgbWF0LW1pbmktZmFiICpuZ0lmPVwiYm90b0Rlc2NhcnRhckNhbnZpc1wiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2xvc2UgPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiICpuZ0lmPVwiYm90b1VuZG9cIiAgaWQ9XCJ1bmRvXCIgIChjbGljayk9XCJ1bmRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiB1bmRvIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9SZWRvXCIgIGlkPVwicmVkb1wiICAoY2xpY2spPVwicmVkbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvclJlZG8gPD0gMFwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gcmVkbyA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgICpuZ0lmPVwiYm90b0FwbGljYXJDYW52aXNcIiAgaWQ9XCJhcGxpY2FyQ2FudmlzXCIgIChjbGljayk9XCJhcHBseUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNoZWNrIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBpZD1ncnVwMiA+XG4gICAgICAgIDxsYWJlbCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcIiA+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcInR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImJvdG9FbGltaW5hXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxuICAgICAgICAgICAgRWxpbWluYVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJib3RvTm91XCIgbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiYm90b05vdVwiICAoY2xpY2spPVwibmV3RGF0YSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBOb3VcbiAgICAgICAgPC9idXR0b24+XG5cblxuICAgICAgICBcbiAgICA8L2Rpdj5cblxuXG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCIgaGVpZ2h0OiAxMDAlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXG4gICAgICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXG4gICAgICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcbiAgICAgICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxuICAgICAgICAgICAgKGNlbGxWYWx1ZUNoYW5nZWQpPVwib25DZWxsVmFsdWVDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG5gLFxuICBzdHlsZXM6IFtgaW5wdXQsbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjVweCA1cHggNXB4IDEwcHh9I2JvdG9Ob3V7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYm90b0VsaW1pbmF7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHh9I2FwbGljYXJDYW52aXN7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I3JlZG8sI3VuZG97YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jcmVkb1tkaXNhYmxlZF0sI3VuZG9bZGlzYWJsZWRde2JhY2tncm91bmQ6I2ZmYzk3ZjttYXJnaW4tbGVmdDozcHh9I2JvcnJhckNhbnZpc3tiYWNrZ3JvdW5kOiNkZjMxMzN9I2dydXAxe3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6NDAlfSNncnVwMnt0ZXh0LWFsaWduOmVuZDt3aWR0aDo2MCV9I2dydXAxLCNncnVwMntkaXNwbGF5OmlubGluZS1ibG9ja31gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIGNvbHVtbmFFc3RhdCA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW0gbCdpZCBkZSBsZXMgY2VsZXMgbW9kaWZpY2FkZXMgaSBlbCBuw4LCuiBkJ2VkaWNpb25zIHNvYnJlIGFxdWVzdGVzXG4gIHByaXZhdGUgcGFyYW1zOyAvLyBQYXJhbXMgZGVsIGdyaWQgYSBsJ8ODwrpsdGltYSBtb2RpZmljYWNpbyAocGVyIHNpIGZlbSBhcHBseSBjaGFuZ2VzKVxuICByb3dEYXRhOiBhbnlbXTtcbiAgY29tcHRhZG9yQ2FudmlzOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGZldGVzIHNvYnJlIGNlbGVzXG4gIGNvbXB0YWRvckNhbnZpc0FudGVyaW9yOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGFudGVyaW9yIGEgbCdhY3R1YWwgKGNvbXB0YWRvckNhbnZpcylcbiAgY29tcHRhZG9yUmVkbzogbnVtYmVyOyAvLyBOb21icmUgZGUgcmVkb3MgcXVlIHBvZGVtIGZlclxuICBncmlkT3B0aW9ucztcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSBib3RvRGVzY2FydGFyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvVW5kbzogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b1JlZG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvdG9BcGxpY2FyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvRWxpbWluYTogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b05vdTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VhcmNoR2VuZXJhbDogYm9vbGVhbjtcblxuXG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcbiAgICAgIC8vIHN1cHByZXNzSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5hRXN0YXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiBcbiAgIFxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpfSwgMzApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG5cbiAgICBpZih0aGlzLmNvbHVtbmFFc3RhdClcbiAgICB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUucm93SW5kZXgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLmdldFJvd05vZGUoaWQpLmRhdGEuZXN0YXQgPSdFbGltaW5hdCc7XG4gICAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xuICAgIH1cbiAgfVxuXG5cblxuXG5cbiAgbmV3RGF0YSgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMubmV3LmVtaXQodHJ1ZSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tYXAua2V5cygpKVxuICAgIHtcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2VuZENoYW5nZXMuZW1pdChpdGVtc0NoYW5nZWQpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIH1cbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuICBvbkZpbHRlck1vZGlmaWVkKCk6IHZvaWR7XG4gICAgdGhpcy5kZWxldGVDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIHVuZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgKz0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gLT0gMTtcbiAgfVxuXG5cbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcbiAge1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzKys7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcbiAgfVxuXG5cbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbSBlbHMgcGFyYW1hdHJlcyBhY3R1YWxzIHBlciBzaSBoZW0gZGUgZmVyIHVuIGFwcGx5IGNoYW5nZXNcblxuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA+IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpXG4gICAgICAvLyBBcXVlc3RhIGNvbmRpY2nDg8KzIHNlcsODwqAgY2VydGEgc2kgdmVuaW0gZCdlZGl0YXIgbyBkZSBmZXIgdW4gcmVkbyAoY29tcHRhZG9yIGNhbnZpcyA+KSwgcGVyw4PCsiBubyBzaSB2ZW5pbSBkJ3VuIHVuZG9cblxuICAgICAge1xuICAgICAgICBpZiAoISB0aGlzLm1hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBTaSBubyBoZW0gZWRpdGF0IGxhIGNlbGEgYW1iIGFudGVyaW9yaXRhdCwgbCdhZmVnaXJlbSBhbCBtYXAgaSBjYW52aWFyZW0gZWwgYmFja2dyb3VuZCBhIHZlcmRcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgLy8gU2kgamEgZXN0YXZhIG1vZGlmaWNhZGEsIGluY3JlbWVudGFyZW0gZWwgbm9tYnJlIGRlIGNhbnZpcyBkJ2FxdWVzdGEgY2VsYSBhbCBtYXBcbiAgICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGhhIGVzdGF0IG1vZGlmaWNhZGEgbGEgbGluZWEsIGxhIHBpbnRhcmVtIGRlIHZlcmRcbiAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtIGVsIGNlbGxTdHlsZSBibGFuYyBwZXIgcHJveGltZXMgY2VsZXNcbiAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrO1xuXG4gICAgICB9XG4gICAgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzIDwgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcil7IC8vIEVudHJhcsODwqAgYXF1w4PCrSBzaSB2ZW5pbSBkJ3VuIHVuZG9cbiAgICAgICAgLy8gQ29tIHNhYmVtIHF1ZSBqYSBoYXZpZW0gZWRpdGF0IGxhIGNlbGEsIGFnYWZlbSBlbCBub21icmUgZGUgbW9kaWZpY2FjaW9ucyBxdWUgbCdoZW0gZmV0XG4gICAgICAgIGNvbnN0IG1vZGlmaWNhY2lvbnNBY3R1YWxzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcblxuICAgICAgICBpZiAobW9kaWZpY2FjaW9uc0FjdHVhbHMgPT09IDEpIHtcbiAgICAgICAgICAvLyBTaSBub23Dg8KpcyB0ZSB1bmEgbW9kaWZpY2FjacODwrMsIHZvbCBkaXIgcXVlIGFtYiBsJ3VuZG8gaGVtIGRlaXhhdCBsYSBjZWxhIGNvbSBhIGwnZXN0YXQgaW5pY2lhbCwgcGVsIHF1ZSBsJ2hlbSBkZSBib3JyYXIgZGVsIG1hcFxuICAgICAgICAgIHRoaXMubWFwLmRlbGV0ZShwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIExpIHBvc2FyZW0gdW4gYWx0cmUgY29wIGVsIGJhY2tncm91bmQgYmxhbmNcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSAvLyBMYSBjZWxhIGVuY2FyYSBubyBlc3TDg8KgIGNvbSBhIGwnZXN0YXQgaW5pY2lhbCwgcGVsIHF1ZSBub21lcyByZXN0ZW0gZWwgbm9tYnJlIGRlIG1vZGlmaWNhY2lvbnMgYWwgbWFwXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyAtIDEpKTtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gZW5jYXJhIHRlIG1vZGlmaWNhY2lvbnMsIGhhIGRlIHRlbmlyIGVsIGJhY2tncm91bmQgdmVyZFxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3ItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXG4gICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQsIEhUVFBfSU5URVJDRVBUT1JTfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlLCBUcmFuc2xhdGVMb2FkZXIsVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7U2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5pbXBvcnQgeyBEYXRhR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERhdGFHcmlkQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2l0bXVuRnJvbnRlbmRHdWlNb2R1bGUge1xyXG59XHJcbiJdLCJuYW1lcyI6WyJBbGxDb21tdW5pdHlNb2R1bGVzIiwiRXZlbnRFbWl0dGVyIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJSb3V0ZXJNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJOb29wQW5pbWF0aW9uc01vZHVsZSIsIkFuZ3VsYXJIYWxNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJBZ0dyaWRNb2R1bGUiLCJTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiVHJhbnNsYXRlTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkFzRnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxP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