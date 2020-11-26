/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
var DataGridComponent = /** @class */ (function () {
    function DataGridComponent() {
        this.modules = AllCommunityModules;
        this.statusColumn = false;
        this.map = new Map();
        this.modificationChange = false;
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
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
            for (var _a = tslib_1.__values(this.columnDefs), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                for (var selectedRows_1 = tslib_1.__values(selectedRows), selectedRows_1_1 = selectedRows_1.next(); !selectedRows_1_1.done; selectedRows_1_1 = selectedRows_1.next()) {
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
            for (var _a = tslib_1.__values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
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
        { type: Component, args: [{
                    selector: 'app-data-grid',
<<<<<<< HEAD
                    template: "    <div id=grup1 class=\"editDivBtns\">\n        <button  mat-mini-fab class=\"editBtn\"  *ngIf=\"discardChangesButton\"  id=\"borrarCanvis\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"changeCounter <= 0\">\n            <mat-icon  fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"undoButton\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"redoButton\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"redoCounter <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"applyChangesButton\"  id=\"aplicarCanvis\"  (click)=\"applyChanges()\" [disabled]=\"changeCounter <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 class=\"actionsDivBtns\" >\n        <label *ngIf=\"globalSearch\" [translate]=\"'Search'\"> </label>\n        <input *ngIf=\"globalSearch\"type=\"text\" class=\"searchGenericInput\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"deleteButton\"  mat-stroked-button id=\"botoElimina\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            <span  [translate]=\"'Remove'\"> </span>\n            \n        </button>\n        <button  *ngIf=\"newButton\" mat-stroked-button id=\"botoNou\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'New'\"> </span>           \n        </button>\n\n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div class=\"ag-theme-alpine\" id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            class=\"ag-theme-alpine\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            [frameworkComponents]=\"frameworkComponents\"\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
=======
                    template: "    <div id=grup1 class=\"editDivBtns\">\n        <button  mat-mini-fab class=\"editBtn\"  *ngIf=\"botoDescartarCanvis\"  id=\"borrarCanvis\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"comptadorCanvis <= 0\">\n            <mat-icon  fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"botoUndo\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"comptadorCanvis <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"botoRedo\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"comptadorRedo <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab class=\"editBtn\" *ngIf=\"botoAplicarCanvis\"  id=\"aplicarCanvis\"  (click)=\"applyChanges()\" [disabled]=\"comptadorCanvis <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 class=\"actionsDivBtns\" >\n        <label *ngIf=\"searchGeneral\" [translate]=\"'Search'\"> </label>\n        <input *ngIf=\"searchGeneral\"type=\"text\" class=\"searchGenericInput\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"botoElimina\"  mat-stroked-button id=\"botoElimina\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            <span  [translate]=\"'Remove'\"> </span>\n            \n        </button>\n        <button  *ngIf=\"botoNou\" mat-stroked-button id=\"botoNou\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>      \n            <span  [translate]=\"'New'\"> </span>           \n        </button>\n\n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div class=\"ag-theme-alpine\" id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            class=\"ag-theme-alpine\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            [frameworkComponents]=\"frameworkComponents\"\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
>>>>>>> e7d2b82ef5a9a7ae3f6a9d0ab577f8a8bc4049bf
                    styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#aplicarCanvis[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{color:#fff!important;background:#df3133}#borrarCanvis[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{text-align:start;width:20%;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:80%;height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:50%!important}"]
                },] },
    ];
    /** @nocollapse */
    DataGridComponent.ctorParameters = function () { return []; };
    DataGridComponent.propDecorators = {
        frameworkComponents: [{ type: Input }],
        columnDefs: [{ type: Input }],
        getAll: [{ type: Input }],
        discardChangesButton: [{ type: Input }],
        undoButton: [{ type: Input }],
        redoButton: [{ type: Input }],
        applyChangesButton: [{ type: Input }],
        deleteButton: [{ type: Input }],
        newButton: [{ type: Input }],
        globalSearch: [{ type: Input }],
        remove: [{ type: Output }],
        new: [{ type: Output }],
        sendChanges: [{ type: Output }]
    };
    return DataGridComponent;
}());
export { DataGridComponent };
if (false) {
    /** @type {?} */
    DataGridComponent.prototype.modules;
    /** @type {?} */
    DataGridComponent.prototype.searchValue;
    /** @type {?} */
    DataGridComponent.prototype.gridApi;
    /** @type {?} */
    DataGridComponent.prototype.gridColumnApi;
    /** @type {?} */
    DataGridComponent.prototype.statusColumn;
    /** @type {?} */
    DataGridComponent.prototype.map;
    /** @type {?} */
    DataGridComponent.prototype.params;
    /** @type {?} */
    DataGridComponent.prototype.rowData;
    /** @type {?} */
    DataGridComponent.prototype.changeCounter;
    /** @type {?} */
    DataGridComponent.prototype.previousChangeCounter;
    /** @type {?} */
    DataGridComponent.prototype.redoCounter;
    /** @type {?} */
    DataGridComponent.prototype.modificationChange;
    /** @type {?} */
    DataGridComponent.prototype.gridOptions;
    /** @type {?} */
    DataGridComponent.prototype.frameworkComponents;
    /** @type {?} */
    DataGridComponent.prototype.columnDefs;
    /** @type {?} */
    DataGridComponent.prototype.getAll;
    /** @type {?} */
    DataGridComponent.prototype.discardChangesButton;
    /** @type {?} */
    DataGridComponent.prototype.undoButton;
    /** @type {?} */
    DataGridComponent.prototype.redoButton;
    /** @type {?} */
    DataGridComponent.prototype.applyChangesButton;
    /** @type {?} */
    DataGridComponent.prototype.deleteButton;
    /** @type {?} */
    DataGridComponent.prototype.newButton;
    /** @type {?} */
    DataGridComponent.prototype.globalSearch;
    /** @type {?} */
    DataGridComponent.prototype.remove;
    /** @type {?} */
    DataGridComponent.prototype.new;
    /** @type {?} */
    DataGridComponent.prototype.sendChanges;
}

<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6RixPQUFPLEVBQUUsbUJBQW1CLEVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUF5RzNFO3VCQS9Cb0IsbUJBQW1COzRCQUl4QixLQUFLO21CQUNPLElBQUksR0FBRyxFQUFrQjtrQ0FNL0IsS0FBSztRQXNCeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLGFBQWEsRUFBRTtnQkFDYixRQUFRLEVBQUUsSUFBSTtnQkFDZCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDO2FBQ3hDO1lBQ0QsWUFBWSxFQUFFLFVBQVU7U0FHekIsQ0FBQztLQUVIOzs7OztJQUlELHVDQUFXOzs7O0lBQVgsVUFBWSxNQUFNO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcs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O3VDQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3FDQUNMLEtBQUs7K0JBQ0wsS0FBSzs0QkFDTCxLQUFLOytCQUNMLEtBQUs7eUJBSUwsTUFBTTtzQkFDTixNQUFNOzhCQUNOLE1BQU07OzRCQTNHVDs7U0EwRWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgaWQ9Z3J1cDEgY2xhc3M9XCJlZGl0RGl2QnRuc1wiPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJkaXNjYXJkQ2hhbmdlc0J1dHRvblwiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uICBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNsb3NlIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJ1bmRvQnV0dG9uXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwicmVkb0J1dHRvblwiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJyZWRvQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cImFwcGx5Q2hhbmdlc0J1dHRvblwiICBpZD1cImFwbGljYXJDYW52aXNcIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJnbG9iYWxTZWFyY2hcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiZ2xvYmFsU2VhcmNoXCJ0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoR2VuZXJpY0lucHV0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZGVsZXRlQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZGVsZXRlIDwvbWF0LWljb24+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidSZW1vdmUnXCI+IDwvc3Bhbj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJib3RvTm91XCIgIChjbGljayk9XCJuZXdEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBhZGRfY2lyY2xlX291dGxpbmUgPC9tYXQtaWNvbj4gICAgICBcclxuICAgICAgICAgICAgPHNwYW4gIFt0cmFuc2xhdGVdPVwiJ05ldydcIj4gPC9zcGFuPiAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG5cclxuICAgICAgICBcclxuICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1hbHBpbmVcIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cclxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYWxwaW5lXCJcclxuICAgICAgICAgICAgW2Zsb2F0aW5nRmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcclxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXHJcbiAgICAgICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXHJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXHJcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcclxuICAgICAgICAgICAgW3N1cHByZXNzUm93Q2xpY2tTZWxlY3Rpb25dPXRydWVcclxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxyXG4gICAgICAgICAgICBbZnJhbWV3b3JrQ29tcG9uZW50c109XCJmcmFtZXdvcmtDb21wb25lbnRzXCJcclxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxyXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcclxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuXHJcbmAsXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jYm90b05vdXtjb2xvcjojZmZmO2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNib3RvRWxpbWluYXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc1tkaXNhYmxlZF17YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzgzOTc2Y30jcmVkbywjdW5kb3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZjkzMDA7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvW2Rpc2FibGVkXSwjdW5kb1tkaXNhYmxlZF17YmFja2dyb3VuZDojZmZjOTdmO21hcmdpbi1sZWZ0OjNweH0jYm9ycmFyQ2Fudmlze2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RmMzEzM30jYm9ycmFyQ2FudmlzW2Rpc2FibGVkXXtjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkYThjOGV9LmVkaXREaXZCdG5ze3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6MjAlO2hlaWdodDozMHB4IWltcG9ydGFudDtsaW5lLWhlaWdodDozMHB4IWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnN7dGV4dC1hbGlnbjplbmQ7d2lkdGg6ODAlO2hlaWdodDo2MHB4fS5hY3Rpb25zRGl2QnRucywuZWRpdERpdkJ0bnN7ZGlzcGxheTppbmxpbmUtYmxvY2shaW1wb3J0YW50fS5hY3Rpb25zRGl2QnRucyAubWF0LXN0cm9rZWQtYnV0dG9ue3BhZGRpbmc6NXB4IDIwcHghaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFiIC5tYXQtYnV0dG9uLXdyYXBwZXJ7cGFkZGluZzppbmhlcml0IWltcG9ydGFudDtkaXNwbGF5OmluaGVyaXQhaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LWljb257aGVpZ2h0OjMwcHghaW1wb3J0YW50O2JvdHRvbTo1cHg7cG9zaXRpb246cmVsYXRpdmV9LmVkaXREaXZCdG5zIC5tYXQtbWluaS1mYWJ7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH0uYWN0aW9uc0RpdkJ0bnMgLnNlYXJjaEdlbmVyaWNJbnB1dHtoZWlnaHQ6NDVweCFpbXBvcnRhbnQ7d2lkdGg6NTAlIWltcG9ydGFudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIHN0YXR1c0NvbHVtbiA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW1vcyBlbCBpZCBkZSBsYXMgY2VsYXMgbW9kaWZpY2FkYXMgaSBlbCBuwrogZGUgZWRpY2lvbmVzIGhlY2hhcyBzb2JyZSBlc3Rhc1xuICBwcml2YXRlIHBhcmFtczsgLy9QYXJhbWV0cm9zIGRlbCBncmlkIGVuIGxhIHVsdGltYSBtb2RpZmljYWNpb24gaGVjaGEgKHBvciBzaSBoYWNlbW9zIGFwcGx5IGNoYW5nZXMpXG4gIHJvd0RhdGE6IGFueVtdO1xuICBjaGFuZ2VDb3VudGVyOiBudW1iZXI7IC8vIE51bWVybyBkZSBlZGljaW9uZXMgaGVjaGFzIHNvYnJlIGxhcyBjZWxhc1xuICBwcmV2aW91c0NoYW5nZUNvdW50ZXI6IG51bWJlcjsgLy8gIE51bWVybyBkZSBlZGljaW9uZXMgcXVlIGhhYmlhIGFudGVzIGRlIGhhY2VyIGxhIHVsdGltYSBtb2RpZmljYWNpb24gKGNoYW5nZUNvdW50ZXIpXG4gIHJlZG9Db3VudGVyOiBudW1iZXI7IC8vIE51bWVybyBkZSByZWRvIHF1ZSBwb2RlbW9zIGhhY2VyXG4gIG1vZGlmaWNhdGlvbkNoYW5nZSA9IGZhbHNlO1xuICBncmlkT3B0aW9ucztcbiAgQElucHV0KCkgZnJhbWV3b3JrQ29tcG9uZW50czogYW55O1xuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBhbnlbXTtcbiAgQElucHV0KCkgZ2V0QWxsOiAoKSA9PiBPYnNlcnZhYmxlPGFueT47XG4gIEBJbnB1dCgpIGRpc2NhcmRDaGFuZ2VzQnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSB1bmRvQnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSByZWRvQnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSBhcHBseUNoYW5nZXNCdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRlbGV0ZUJ1dHRvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgbmV3QnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSBnbG9iYWxTZWFyY2g6IGJvb2xlYW47XG5cblxuXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgc29ydGFibGU6IHRydWUsXG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIGNlbGxTdHlsZToge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfSxcbiAgICAgIH0sXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXG4gICAgICAvLyBzdXBwcmVzc0hvcml6b250YWxTY3JvbGw6IHRydWUsXG5cbiAgICB9O1xuXG4gIH1cblxuXG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5nZXRFbGVtZW50cygpO1xuICAgIHRoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5jb2x1bW5EZWZzKSB7XG4gICAgICBpZiAoY29sLmZpZWxkID09PSAnZXN0YXQnKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzQ29sdW1uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gXG4gICBcblxuICB9XG5cbiAgcXVpY2tTZWFyY2goKTogdm9pZHtcbiAgICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcbiAgfVxuXG4gIGdldEVsZW1lbnRzKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuZ2V0QWxsKClcbiAgICAuc3Vic2NyaWJlKChpdGVtcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YSA9IGl0ZW1zO1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKX0sIDMwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5ncmlkQXBpLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChzZWxlY3RlZERhdGEpO1xuXG4gICAgaWYodGhpcy5zdGF0dXNDb2x1bW4pXG4gICAge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLnJvd0luZGV4KTtcblxuICAgICAgZm9yIChjb25zdCBpZCBvZiBzZWxlY3RlZFJvd3Mpe1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGlkKS5kYXRhLmVzdGF0ID0nRWxpbWluYXQnO1xuICAgICAgICB9XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5yZWZyZXNoQ2VsbHMoKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG5cblxuXG5cbiAgbmV3RGF0YSgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMubmV3LmVtaXQoLTEpO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCk6IHZvaWRcbiAge1xuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMubWFwLmtleXMoKSlcbiAgICB7XG4gICAgICBpdGVtc0NoYW5nZWQucHVzaCh0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShrZXkpLmRhdGEpO1xuICAgIH1cbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMucmVkb0NvdW50ZXIgPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuXG4gIGRlbGV0ZUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5nZUNvdW50ZXI7IGkrKylcbiAgICB7XG4gICAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgfVxuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMuY2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG4gIG9uRmlsdGVyTW9kaWZpZWQoKTogdm9pZHtcbiAgICB0aGlzLmRlbGV0ZUNoYW5nZXMoKTtcbiAgfVxuXG5cbiAgdW5kbygpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgLT0gMTtcbiAgICB0aGlzLnJlZG9Db3VudGVyICs9IDE7XG4gIH1cblxuICByZWRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnJlZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY2hhbmdlQ291bnRlciArPSAxO1xuICAgIHRoaXMucmVkb0NvdW50ZXIgLT0gMTtcbiAgfVxuXG5cbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcbiAge1xuICAgICAgaWYgKHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlKVxuICAgICAge1xuICAgICAgICB0aGlzLmNoYW5nZUNvdW50ZXIrKztcbiAgICAgICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMub25DZWxsVmFsdWVDaGFuZ2VkKGUpO1xuICAgICAgICB0aGlzLm1vZGlmaWNhdGlvbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgfVxuICB9XG5cblxuXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyAvLyBHdWFyZGFyZW1vcyBsb3MgcGFyYW1ldHJvcyBwb3Igc2kgaGF5IHF1ZSBoYWNlciB1biBhcHBseSBjaGFuZ2VzXG5cbiAgICBpZiAodGhpcy5jaGFuZ2VDb3VudGVyID4gdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIpXG4gICAgICAvLyBFc3RhIGNvbmRpY2nDs24gc2Vyw6EgY2llcnRhIHNpIHZlbmltb3MgZGUgZWRpdGFyIGxhIGNlbGEgbyBkZSBoYWNlciB1biByZWRvXG4gICAgICB7XG4gICAgICAgIGlmIChwYXJhbXMub2xkVmFsdWUgIT09IHBhcmFtcy52YWx1ZSAmJiAhKHBhcmFtcy5vbGRWYWx1ZSA9PSBudWxsICYmIHBhcmFtcy52YWx1ZSA9PT0gJycpKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGFiaWFtb3MgZWRpdGFkbyBsYSBjZWxhIGNvbiBhbnRlcmlvcmlkYWQsIGxhIGHDsWFkaW1vcyBhbCBtYXAgeSBsYSBwaW50YW1vcyBkZSB2ZXJkZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgLy8gU2kgeWEgaGFiw61hbW9zIG1vZGlmaWNhZG8gbGEgY2VsYSwgYXVtZW50YW1vcyBlbCBudW1lcm8gZGUgY2FtYmlvcyBlbiBlc3RhXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2hhbmdlcyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChjdXJyZW50Q2hhbmdlcyArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGhhIGVzdGFkbyBtb2RpZmljYWRhIGxhIGxpbmlhLCBsYSBwaW50YW1vcyBkZSB2ZXJkZVxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW1vcyBlbCBjZWxsU3R5bGUgYmxhbmNvIHBhcmEgZnV0dXJhcyBtb2RpZmljYWNpb25lcyBpbnRlcm5hcyAoZWo6IGZpbHRybylcbiAgICAgICAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcisrO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNoYW5nZUNvdW50ZXIgPCB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcil7IC8vIEVudHJhcsOhIGFxdcOtIHNpIGhlbW9zIGhlY2hvIHVuIHVuZG9cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDaGFuZ2VzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjdXJyZW50Q2hhbmdlcyA9PT0gMSkge1xuICAgICAgICAgIC8vIFNpIHNvbG8gdGllbmUgdW5hIG1vZGlmaWNhY2lvbiwgcXVpZXJlIGRlY2lyIHF1ZSBsYSBjZWxhIGVzdMOhIGVuIHN1IGVzdGFkbyBpbmljaWFsLCBwb3IgbG8gcXVlIGxhIHBpbnRhbW9zIGRlIGJsYW5jb1xuICAgICAgICAgIHRoaXMubWFwLmRlbGV0ZShwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIExpIHBvc2FyZW0gdW4gYWx0cmUgY29wIGVsIGJhY2tncm91bmQgYmxhbmNcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudENoYW5nZXMgPjEpIC8vIExhIGNlbGEgYcO6biBubyBlc3TDoSBlbiBzdSBlc3RhZG8gaW5pY2lhbCwgcG9yIGxvIHF1ZSBzZWdndWlyw6EgdmVyZGVcbiAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIHBvZGVtb3MgaGFjZXIgZWxzZSBwb3Igc2kgaGFjZW1vcyB1biB1bmRvIGRlIHVuYSBjZWxhIHNpbiBjYW1iaW9zXG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAoY3VycmVudENoYW5nZXMgLSAxKSk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tbyBhdW4gdGllbmUgY2FtYmlvcywgZWwgYmFja2dyb3VuZCB0aWVuZSBxdWUgc2VndWlyIHZlcmRlXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgaWYocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSApXG4gICAgICB7XG4gICAgICAgIHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGlmICggdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSlcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBlbmNhcmEgdGUgbW9kaWZpY2FjaW9ucywgaGEgZGUgdGVuaXIgZWwgYmFja2dyb3VuZCB2ZXJkXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbW9zIGVsIGNlbGxTdHlsZSBibGFuY28gcGFyYSBmdXR1cmFzIG1vZGlmaWNhY2lvbmVzIGludGVybmFzIChlajogZmlsdHJvKVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIrKzsgLy8gQ29tbyBhbCBoYWNlciB1bmRvIHZvbHZlcsOhIGEgZW50cmFyIGEgZXN0YSBtaXNtYSBmdW5jacOzbiwgaGF5IHF1ZSBlbnZpYXJsbyBhIHN1IGlmIGNvcnJlc3BvbmRpZW50ZVxuICAgICAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTsgLy9VbmRvIHBhcmEgZGVzaGFjZXIgZWwgY2FtYmlvIHNpbiBtb2RpZmljYWNpb25lcyBpbnRlcm5hbWVudGVcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn1cbiJdfQ==
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6RixPQUFPLEVBQUUsbUJBQW1CLEVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUF5RzNFO3VCQS9Cb0IsbUJBQW1COzRCQUl4QixLQUFLO21CQUNPLElBQUksR0FBRyxFQUFrQjtxQ0FNNUIsS0FBSztRQXNCM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDO2FBQ3hDO1lBQ0QsWUFBWSxFQUFFLFVBQVU7U0FHekIsQ0FBQztLQUVIOzs7OztJQUlELHVDQUFXOzs7O0lBQVgsVUFBWSxNQUFNO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztR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QUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO29DQUNMLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUNMLEtBQUs7eUJBSUwsTUFBTTtzQkFDTixNQUFNOzhCQUNOLE1BQU07OzRCQTNHVDs7U0EwRWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxyXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgaWQ9Z3J1cDEgY2xhc3M9XCJlZGl0RGl2QnRuc1wiPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJib3RvRGVzY2FydGFyQ2FudmlzXCIgIGlkPVwiYm9ycmFyQ2FudmlzXCIgdHlwZT1cImJ1dHRvblwiICAoY2xpY2spPVwiZGVsZXRlQ2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiAgZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjbG9zZSA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwiYm90b1VuZG9cIiAgaWQ9XCJ1bmRvXCIgIChjbGljayk9XCJ1bmRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHVuZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cImJvdG9SZWRvXCIgIGlkPVwicmVkb1wiICAoY2xpY2spPVwicmVkbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvclJlZG8gPD0gMFwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiByZWRvIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJib3RvQXBsaWNhckNhbnZpc1wiICBpZD1cImFwbGljYXJDYW52aXNcIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjaGVjayA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBpZD1ncnVwMiBjbGFzcz1cImFjdGlvbnNEaXZCdG5zXCIgPlxyXG4gICAgICAgIDxsYWJlbCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwic2VhcmNoR2VuZXJhbFwidHlwZT1cInRleHRcIiBjbGFzcz1cInNlYXJjaEdlbmVyaWNJbnB1dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XHJcbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImJvdG9FbGltaW5hXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZGVsZXRlIDwvbWF0LWljb24+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidSZW1vdmUnXCI+IDwvc3Bhbj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJib3RvTm91XCIgbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiYm90b05vdVwiICAoY2xpY2spPVwibmV3RGF0YSgpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIj4gYWRkX2NpcmNsZV9vdXRsaW5lIDwvbWF0LWljb24+ICAgICAgXHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidOZXcnXCI+IDwvc3Bhbj4gICAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBzdHlsZT1cIiBoZWlnaHQ6IDEwMCVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYWxwaW5lXCIgaWQ9XCJteUdyaWRcIiBzdHlsZT1cIiB3aWR0aDoxMDAlOyBoZWlnaHQ6IDEwMCVcIiA+XHJcbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcclxuICAgICAgICAgICAgc3R5bGU9XCIgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWFscGluZVwiXHJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3Jvd0RhdGFdPVwicm93RGF0YVwiXHJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxyXG4gICAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxyXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcclxuICAgICAgICAgICAgW3VuZG9SZWRvQ2VsbEVkaXRpbmddPVwidHJ1ZVwiICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXHJcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXHJcbiAgICAgICAgICAgIFtlbmFibGVDZWxsQ2hhbmdlRmxhc2hdPXRydWVcclxuICAgICAgICAgICAgW2ZyYW1ld29ya0NvbXBvbmVudHNdPVwiZnJhbWV3b3JrQ29tcG9uZW50c1wiXHJcbiAgICAgICAgICAgIHJvd1NlbGVjdGlvbj1cIm11bHRpcGxlXCJcclxuICAgICAgICAgICAgKGZpbHRlck1vZGlmaWVkKT1cIm9uRmlsdGVyTW9kaWZpZWQoKVwiXHJcbiAgICAgICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICAoY2VsbFZhbHVlQ2hhbmdlZCk9XCJvbkNlbGxWYWx1ZUNoYW5nZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG5gLFxyXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jYm90b05vdXtjb2xvcjojZmZmO2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNib3RvRWxpbWluYXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc1tkaXNhYmxlZF17YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzgzOTc2Y30jcmVkbywjdW5kb3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZjkzMDA7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvW2Rpc2FibGVkXSwjdW5kb1tkaXNhYmxlZF17YmFja2dyb3VuZDojZmZjOTdmO21hcmdpbi1sZWZ0OjNweH0jYm9ycmFyQ2Fudmlze2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RmMzEzM30jYm9ycmFyQ2FudmlzW2Rpc2FibGVkXXtjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkYThjOGV9LmVkaXREaXZCdG5ze3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6MjAlO2hlaWdodDozMHB4IWltcG9ydGFudDtsaW5lLWhlaWdodDozMHB4IWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnN7dGV4dC1hbGlnbjplbmQ7d2lkdGg6ODAlO2hlaWdodDo2MHB4fS5hY3Rpb25zRGl2QnRucywuZWRpdERpdkJ0bnN7ZGlzcGxheTppbmxpbmUtYmxvY2shaW1wb3J0YW50fS5hY3Rpb25zRGl2QnRucyAubWF0LXN0cm9rZWQtYnV0dG9ue3BhZGRpbmc6NXB4IDIwcHghaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFiIC5tYXQtYnV0dG9uLXdyYXBwZXJ7cGFkZGluZzppbmhlcml0IWltcG9ydGFudDtkaXNwbGF5OmluaGVyaXQhaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LWljb257aGVpZ2h0OjMwcHghaW1wb3J0YW50O2JvdHRvbTo1cHg7cG9zaXRpb246cmVsYXRpdmV9LmVkaXREaXZCdG5zIC5tYXQtbWluaS1mYWJ7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH0uYWN0aW9uc0RpdkJ0bnMgLnNlYXJjaEdlbmVyaWNJbnB1dHtoZWlnaHQ6NDVweCFpbXBvcnRhbnQ7d2lkdGg6NTAlIWltcG9ydGFudH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUdyaWRDb21wb25lbnQge1xyXG4gXHJcblxyXG5cclxuXHJcbiAgbW9kdWxlczogTW9kdWxlW10gPSBBbGxDb21tdW5pdHlNb2R1bGVzO1xyXG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBncmlkQXBpO1xyXG4gIHByaXZhdGUgZ3JpZENvbHVtbkFwaTtcclxuICBjb2x1bW5hRXN0YXQgPSBmYWxzZTtcclxuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW1vcyBlbCBpZCBkZSBsYXMgY2VsYXMgbW9kaWZpY2FkYXMgaSBlbCBuwrogZGUgZWRpY2lvbmVzIGhlY2hhcyBzb2JyZSBlc3Rhc1xyXG4gIHByaXZhdGUgcGFyYW1zOyAvL1BhcmFtZXRyb3MgZGVsIGdyaWQgZW4gbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiBoZWNoYSAocG9yIHNpIGhhY2Vtb3MgYXBwbHkgY2hhbmdlcylcclxuICByb3dEYXRhOiBhbnlbXTtcclxuICBjb21wdGFkb3JDYW52aXM6IG51bWJlcjsgLy8gTnVtZXJvIGRlIGVkaWNpb25lcyBoZWNoYXMgc29icmUgbGFzIGNlbGFzXHJcbiAgY29tcHRhZG9yQ2FudmlzQW50ZXJpb3I6IG51bWJlcjsgLy8gIE51bWVybyBkZSBlZGljaW9uZXMgcXVlIGhhYmlhIGFudGVzIGRlIGhhY2VyIGxhIHVsdGltYSBtb2RpZmljYWNpb24gKGNvbXB0YWRvckNhbnZpcylcclxuICBjb21wdGFkb3JSZWRvOiBudW1iZXI7IC8vIE51bWVybyBkZSByZWRvIHF1ZSBwb2RlbW9zIGhhY2VyXHJcbiAgY2FudmlBbWJNb2RpZmljYWNpb25zID0gZmFsc2U7XHJcbiAgZ3JpZE9wdGlvbnM7XHJcbiAgQElucHV0KCkgZnJhbWV3b3JrQ29tcG9uZW50czogYW55O1xyXG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIEBJbnB1dCgpIGJvdG9EZXNjYXJ0YXJDYW52aXM6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b1VuZG86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b1JlZG86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b0FwbGljYXJDYW52aXM6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b0VsaW1pbmE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b05vdTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzZWFyY2hHZW5lcmFsOiBib29sZWFuO1xyXG5cclxuXHJcblxyXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XHJcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPG51bWJlcj47XHJcbiAgQE91dHB1dCgpIHNlbmRDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XHJcbiAgICAgICAgZmxleDogMSxcclxuICAgICAgICBmaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxyXG4gICAgICB9LFxyXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXHJcbiAgICAgIC8vIHN1cHByZXNzSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcclxuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XHJcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XHJcbiAgICB0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xyXG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5jb2x1bW5EZWZzKSB7XHJcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcclxuICAgICAgICB0aGlzLmNvbHVtbmFFc3RhdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICBcclxuXHJcbiAgfVxyXG5cclxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xyXG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRFbGVtZW50cygpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5nZXRBbGwoKVxyXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XHJcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e3RoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCl9LCAzMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XHJcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XHJcblxyXG4gICAgaWYodGhpcy5jb2x1bW5hRXN0YXQpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5yb3dJbmRleCk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShpZCkuZGF0YS5lc3RhdCA9J0VsaW1pbmF0JztcclxuICAgICAgICB9XHJcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuZGVzZWxlY3RBbGwoKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBuZXdEYXRhKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5uZXcuZW1pdCgtMSk7XHJcbiAgfVxyXG5cclxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLm1hcC5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcclxuICAgIHRoaXMubWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBkZWxldGVDaGFuZ2VzKCk6IHZvaWRcclxuICB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMubWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIG9uRmlsdGVyTW9kaWZpZWQoKTogdm9pZHtcclxuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIHVuZG8oKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xyXG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyArPSAxO1xyXG4gIH1cclxuXHJcbiAgcmVkbygpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyArPSAxO1xyXG4gICAgdGhpcy5jb21wdGFkb3JSZWRvIC09IDE7XHJcbiAgfVxyXG5cclxuXHJcbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcclxuICB7XHJcbiAgICAgIGlmICh0aGlzLmNhbnZpQW1iTW9kaWZpY2FjaW9ucylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzKys7XHJcbiAgICAgICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcclxuICAgICAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcclxuICAgICAgICB0aGlzLmNhbnZpQW1iTW9kaWZpY2FjaW9ucyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xyXG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbW9zIGxvcyBwYXJhbWV0cm9zIHBvciBzaSBoYXkgcXVlIGhhY2VyIHVuIGFwcGx5IGNoYW5nZXNcclxuXHJcbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKVxyXG4gICAgICAvLyBFc3RhIGNvbmRpY2nDs24gc2Vyw6EgY2llcnRhIHNpIHZlbmltb3MgZGUgZWRpdGFyIGxhIGNlbGEgbyBkZSBoYWNlciB1biByZWRvXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAoISB0aGlzLm1hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBTaSBubyBoYWJpYW1vcyBlZGl0YWRvIGxhIGNlbGEgY29uIGFudGVyaW9yaWRhZCwgbGEgYcOxYWRpbW9zIGFsIG1hcCB5IGxhIHBpbnRhbW9zIGRlIHZlcmRlXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgLy8gU2kgeWEgaGFiw61hbW9zIG1vZGlmaWNhZG8gbGEgY2VsYSwgYXVtZW50YW1vcyBlbCBudW1lcm8gZGUgY2FtYmlvcyBlbiBlc3RhXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGlmaWNhY2lvbnNBY3R1YWxzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgKyAxKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gaGEgZXN0YWRvIG1vZGlmaWNhZGEgbGEgbGluaWEsIGxhIHBpbnRhbW9zIGRlIHZlcmRlXHJcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRThGMURFJ307XHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbW9zIGVsIGNlbGxTdHlsZSBibGFuY28gcGFyYSBmdXR1cmFzIG1vZGlmaWNhY2lvbmVzIGludGVybmFzIChlajogZmlsdHJvKVxyXG4gICAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzIDwgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcil7IC8vIEVudHJhcsOhIGFxdcOtIHNpIGhlbW9zIGhlY2hvIHVuIHVuZG9cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID09PSAxKSB7XHJcbiAgICAgICAgICAvLyBTaSBzb2xvIHRpZW5lIHVuYSBtb2RpZmljYWNpb24sIHF1aWVyZSBkZWNpciBxdWUgbGEgY2VsYSBlc3TDoSBlbiBzdSBlc3RhZG8gaW5pY2lhbCwgcG9yIGxvIHF1ZSBsYSBwaW50YW1vcyBkZSBibGFuY29cclxuICAgICAgICAgIHRoaXMubWFwLmRlbGV0ZShwYXJhbXMubm9kZS5pZCk7XHJcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpO1xyXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID4xKSAvLyBMYSBjZWxhIGHDum4gbm8gZXN0w6EgZW4gc3UgZXN0YWRvIGluaWNpYWwsIHBvciBsbyBxdWUgc2VnZ3VpcsOhIHZlcmRlXHJcbiAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIHBvZGVtb3MgaGFjZXIgZWxzZSBwb3Igc2kgaGFjZW1vcyB1biB1bmRvIGRlIHVuYSBjZWxhIHNpbiBjYW1iaW9zXHJcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyAtIDEpKTtcclxuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbW8gYXVuIHRpZW5lIGNhbWJpb3MsIGVsIGJhY2tncm91bmQgdGllbmUgcXVlIHNlZ3VpciB2ZXJkZVxyXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xyXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xyXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yLS07ICAvLyBDb20gdmVuaWVtIGQndW5kbywgaGVtIGRlIGRlY3JlbWVudGFyIGVsIGNvbXB0YWRvciBkZSBjYW52aXNBbnRlcmlvclxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcclxuICAgICAgaWYocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSApXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLmNhbnZpQW1iTW9kaWZpY2FjaW9ucyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBpZiAoIHRoaXMubWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGVuY2FyYSB0ZSBtb2RpZmljYWNpb25zLCBoYSBkZSB0ZW5pciBlbCBiYWNrZ3JvdW5kIHZlcmRcclxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcclxuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcclxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtb3MgZWwgY2VsbFN0eWxlIGJsYW5jbyBwYXJhIGZ1dHVyYXMgbW9kaWZpY2FjaW9uZXMgaW50ZXJuYXMgKGVqOiBmaWx0cm8pXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IrKzsgLy8gQ29tbyBhbCBoYWNlciB1bmRvIHZvbHZlcsOhIGEgZW50cmFyIGEgZXN0YSBtaXNtYSBmdW5jacOzbiwgaGF5IHF1ZSBlbnZpYXJsbyBhIHN1IGlmIGNvcnJlc3BvbmRpZW50ZVxyXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpOyAvL1VuZG8gcGFyYSBkZXNoYWNlciBlbCBjYW1iaW8gc2luIG1vZGlmaWNhY2lvbmVzIGludGVybmFtZW50ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
>>>>>>> e7d2b82ef5a9a7ae3f6a9d0ab577f8a8bc4049bf
