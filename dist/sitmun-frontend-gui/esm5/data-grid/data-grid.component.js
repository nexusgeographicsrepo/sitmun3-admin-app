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
        this.columnaEstat = false;
        this.map = new Map();
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
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
            for (var _a = tslib_1.__values(this.columnDefs), _b = _a.next(); !_b.done; _b = _a.next()) {
                var col = _b.value;
                if (col.field === 'estat') {
                    this.columnaEstat = true;
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
        { type: Component, args: [{
                    selector: 'app-data-grid',
                    template: "\n\n\n    <div id=grup1 >\n        <button  mat-mini-fab *ngIf=\"botoDescartarCanvis\"  id=\"borrarCanvis\" type=\"button\"  (click)=\"deleteChanges()\" [disabled]=\"comptadorCanvis <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > close </mat-icon>\n        </button>\n        <button mat-mini-fab *ngIf=\"botoUndo\"  id=\"undo\"  (click)=\"undo()\" [disabled]=\"comptadorCanvis <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > undo </mat-icon>\n        </button>\n        <button mat-mini-fab *ngIf=\"botoRedo\"  id=\"redo\"  (click)=\"redo()\" [disabled]=\"comptadorRedo <= 0\">\n            <mat-icon fontSet=\"material-icons-round\" > redo </mat-icon>\n        </button>\n        <button mat-mini-fab  *ngIf=\"botoAplicarCanvis\"  id=\"aplicarCanvis\"  (click)=\"applyChanges()\" [disabled]=\"comptadorCanvis <= 0\" >\n            <mat-icon fontSet=\"material-icons-round\" > check </mat-icon>\n        </button>\n    </div>\n\n    <div id=grup2 >\n        <label *ngIf=\"searchGeneral\" >Search </label>\n        <input *ngIf=\"searchGeneral\"type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n        <button *ngIf=\"botoElimina\"  mat-stroked-button id=\"botoElimina\"  (click)=\"removeData()\">\n            <mat-icon fontSet=\"material-icons-round\" > delete </mat-icon>\n            Elimina\n        </button>\n        <button  *ngIf=\"botoNou\" mat-stroked-button id=\"botoNou\"  (click)=\"newData()\">\n            <mat-icon fontSet=\"material-icons-round\"> add_circle_outline </mat-icon>                 \n            Nou\n        </button>\n\n\n        \n    </div>\n\n\n\n    <div class=\"row\" style=\" height: 100%\">\n        <div class=\"ag-theme-balham\" id=\"myGrid\" style=\" width:100%; height: 100%\" >\n            <ag-grid-angular\n            style=\" width: 100%; height: 100%;\"\n            class=\"ag-theme-balham\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [gridOptions]=\"gridOptions\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"     \n            [undoRedoCellEditing]=\"true\"    \n            [undoRedoCellEditingLimit]= 200\n            [suppressRowClickSelection]=true\n            [enableCellChangeFlash]=true\n            rowSelection=\"multiple\"\n            (filterModified)=\"onFilterModified()\"\n            (cellEditingStopped) =\"onCellEditingStopped($event)\"\n            (cellValueChanged)=\"onCellValueChanged($event)\"\n            (gridReady)=\"onGridReady($event)\">\n            \n            </ag-grid-angular>\n        </div>\n    </div>\n\n\n",
                    styles: ["input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{background:no-repeat padding-box #68a225;margin-left:3px}#redo,#undo{background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{background:#df3133}#grup1{text-align:start;width:40%}#grup2{text-align:end;width:60%}#grup1,#grup2{display:inline-block}"]
                },] },
    ];
    /** @nocollapse */
    DataGridComponent.ctorParameters = function () { return []; };
    DataGridComponent.propDecorators = {
        columnDefs: [{ type: Input }],
        getAll: [{ type: Input }],
        botoDescartarCanvis: [{ type: Input }],
        botoUndo: [{ type: Input }],
        botoRedo: [{ type: Input }],
        botoAplicarCanvis: [{ type: Input }],
        botoElimina: [{ type: Input }],
        botoNou: [{ type: Input }],
        searchGeneral: [{ type: Input }],
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
    DataGridComponent.prototype.columnaEstat;
    /** @type {?} */
    DataGridComponent.prototype.map;
    /** @type {?} */
    DataGridComponent.prototype.params;
    /** @type {?} */
    DataGridComponent.prototype.rowData;
    /** @type {?} */
    DataGridComponent.prototype.comptadorCanvis;
    /** @type {?} */
    DataGridComponent.prototype.comptadorCanvisAnterior;
    /** @type {?} */
    DataGridComponent.prototype.comptadorRedo;
    /** @type {?} */
    DataGridComponent.prototype.gridOptions;
    /** @type {?} */
    DataGridComponent.prototype.columnDefs;
    /** @type {?} */
    DataGridComponent.prototype.getAll;
    /** @type {?} */
    DataGridComponent.prototype.botoDescartarCanvis;
    /** @type {?} */
    DataGridComponent.prototype.botoUndo;
    /** @type {?} */
    DataGridComponent.prototype.botoRedo;
    /** @type {?} */
    DataGridComponent.prototype.botoAplicarCanvis;
    /** @type {?} */
    DataGridComponent.prototype.botoElimina;
    /** @type {?} */
    DataGridComponent.prototype.botoNou;
    /** @type {?} */
    DataGridComponent.prototype.searchGeneral;
    /** @type {?} */
    DataGridComponent.prototype.remove;
    /** @type {?} */
    DataGridComponent.prototype.new;
    /** @type {?} */
    DataGridComponent.prototype.sendChanges;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6RixPQUFPLEVBQUUsbUJBQW1CLEVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUF3RzNFO3VCQTdCb0IsbUJBQW1COzRCQUl4QixLQUFLO21CQUNPLElBQUksR0FBRyxFQUFrQjtRQTBCbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDO2FBQ3hDO1lBQ0QsWUFBWSxFQUFFLFVBQVU7U0FFekIsQ0FBQztLQUVIOzs7OztJQUlELHVDQUFXOzs7O0lBQVgsVUFBWSxNQUFNO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMxQixJQUFJLENB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LElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDekQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNoQztLQUNGOztnQkFoU0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsMHFGQStEWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQywyZ0JBQTJnQixDQUFDO2lCQUN0aEI7Ozs7OzZCQWtCRSxLQUFLO3lCQUNMLEtBQUs7c0NBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7b0NBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7Z0NBQ0wsS0FBSzt5QkFJTCxNQUFNO3NCQUNOLE1BQU07OEJBQ04sTUFBTTs7NEJBMUdUOztTQTJFYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcbiAgdGVtcGxhdGU6IGBcblxuXG4gICAgPGRpdiBpZD1ncnVwMSA+XG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9EZXNjYXJ0YXJDYW52aXNcIiAgaWQ9XCJib3JyYXJDYW52aXNcIiB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNsb3NlIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9VbmRvXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgKm5nSWY9XCJib3RvUmVkb1wiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiICAqbmdJZj1cImJvdG9BcGxpY2FyQ2FudmlzXCIgIGlkPVwiYXBsaWNhckNhbnZpc1wiICAoY2xpY2spPVwiYXBwbHlDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjaGVjayA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgaWQ9Z3J1cDIgPlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJzZWFyY2hHZW5lcmFsXCIgPlNlYXJjaCA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZWFyY2hHZW5lcmFsXCJ0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJib3RvRWxpbWluYVwiICBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJib3RvRWxpbWluYVwiICAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBkZWxldGUgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIEVsaW1pbmFcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gICpuZ0lmPVwiYm90b05vdVwiIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9Ob3VcIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBhZGRfY2lyY2xlX291dGxpbmUgPC9tYXQtaWNvbj4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgTm91XG4gICAgICAgIDwvYnV0dG9uPlxuXG5cbiAgICAgICAgXG4gICAgPC9kaXY+XG5cblxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCIgaWQ9XCJteUdyaWRcIiBzdHlsZT1cIiB3aWR0aDoxMDAlOyBoZWlnaHQ6IDEwMCVcIiA+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgICAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgKGZpbHRlck1vZGlmaWVkKT1cIm9uRmlsdGVyTW9kaWZpZWQoKVwiXG4gICAgICAgICAgICAoY2VsbEVkaXRpbmdTdG9wcGVkKSA9XCJvbkNlbGxFZGl0aW5nU3RvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cblxuYCxcbiAgc3R5bGVzOiBbYGlucHV0LGxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjo1cHggNXB4IDVweCAxMHB4fSNib3RvTm91e2NvbG9yOiNmZmY7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I2JvdG9FbGltaW5he2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICNmZmY7bWFyZ2luLWxlZnQ6M3B4fSNhcGxpY2FyQ2Fudmlze2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvLCN1bmRve2JhY2tncm91bmQ6I2ZmOTMwMDttYXJnaW4tbGVmdDozcHh9I3JlZG9bZGlzYWJsZWRdLCN1bmRvW2Rpc2FibGVkXXtiYWNrZ3JvdW5kOiNmZmM5N2Y7bWFyZ2luLWxlZnQ6M3B4fSNib3JyYXJDYW52aXN7YmFja2dyb3VuZDojZGYzMTMzfSNncnVwMXt0ZXh0LWFsaWduOnN0YXJ0O3dpZHRoOjQwJX0jZ3J1cDJ7dGV4dC1hbGlnbjplbmQ7d2lkdGg6NjAlfSNncnVwMSwjZ3J1cDJ7ZGlzcGxheTppbmxpbmUtYmxvY2t9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YUdyaWRDb21wb25lbnQge1xuIFxuXG5cblxuICBtb2R1bGVzOiBNb2R1bGVbXSA9IEFsbENvbW11bml0eU1vZHVsZXM7XG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgZ3JpZEFwaTtcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xuICBjb2x1bW5hRXN0YXQgPSBmYWxzZTtcbiAgbWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTsgLy8gR3VhcmRhcmVtIGwnaWQgZGUgbGVzIGNlbGVzIG1vZGlmaWNhZGVzIGkgZWwgbsK6IGQnZWRpY2lvbnMgc29icmUgYXF1ZXN0ZXNcbiAgcHJpdmF0ZSBwYXJhbXM7IC8vIFBhcmFtcyBkZWwgZ3JpZCBhIGwnw7psdGltYSBtb2RpZmljYWNpbyAocGVyIHNpIGZlbSBhcHBseSBjaGFuZ2VzKVxuICByb3dEYXRhOiBhbnlbXTtcbiAgY29tcHRhZG9yQ2FudmlzOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGZldGVzIHNvYnJlIGNlbGVzXG4gIGNvbXB0YWRvckNhbnZpc0FudGVyaW9yOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGFudGVyaW9yIGEgbCdhY3R1YWwgKGNvbXB0YWRvckNhbnZpcylcbiAgY29tcHRhZG9yUmVkbzogbnVtYmVyOyAvLyBOb21icmUgZGUgcmVkb3MgcXVlIHBvZGVtIGZlclxuICBncmlkT3B0aW9ucztcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSBib3RvRGVzY2FydGFyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvVW5kbzogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b1JlZG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvdG9BcGxpY2FyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvRWxpbWluYTogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b05vdTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VhcmNoR2VuZXJhbDogYm9vbGVhbjtcblxuXG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5hRXN0YXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiBcbiAgIFxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoc2VsZWN0ZWREYXRhKTtcblxuICAgIGlmKHRoaXMuY29sdW1uYUVzdGF0KVxuICAgIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5yb3dJbmRleCk7XG5cbiAgICAgIGZvciAoY29uc3QgaWQgb2Ygc2VsZWN0ZWRSb3dzKXtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShpZCkuZGF0YS5lc3RhdCA9J0VsaW1pbmF0JztcbiAgICAgICAgfVxuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkucmVmcmVzaENlbGxzKCk7XG4gICAgfVxuICB9XG5cblxuXG5cblxuXG4gIG5ld0RhdGEoKTogdm9pZFxuICB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLm5ldy5lbWl0KHRydWUpO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCk6IHZvaWRcbiAge1xuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMubWFwLmtleXMoKSlcbiAgICB7XG4gICAgICBpdGVtc0NoYW5nZWQucHVzaCh0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShrZXkpLmRhdGEpO1xuICAgIH1cbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuXG4gIGRlbGV0ZUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbXB0YWRvckNhbnZpczsgaSsrKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cbiAgb25GaWx0ZXJNb2RpZmllZCgpOiB2b2lke1xuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xuICB9XG5cblxuICB1bmRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzIC09IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvICs9IDE7XG4gIH1cblxuICByZWRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnJlZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzICs9IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvIC09IDE7XG4gIH1cblxuXG4gIG9uQ2VsbEVkaXRpbmdTdG9wcGVkKGUpXG4gIHtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcysrO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XG4gIH1cblxuXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyAvLyBHdWFyZGFyZW0gZWxzIHBhcmFtYXRyZXMgYWN0dWFscyBwZXIgc2kgaGVtIGRlIGZlciB1biBhcHBseSBjaGFuZ2VzXG5cbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKVxuICAgICAgLy8gQXF1ZXN0YSBjb25kaWNpw7Mgc2Vyw6AgY2VydGEgc2kgdmVuaW0gZCdlZGl0YXIgbyBkZSBmZXIgdW4gcmVkbyAoY29tcHRhZG9yIGNhbnZpcyA+KSwgcGVyw7Igbm8gc2kgdmVuaW0gZCd1biB1bmRvXG5cbiAgICAgIHtcbiAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGVtIGVkaXRhdCBsYSBjZWxhIGFtYiBhbnRlcmlvcml0YXQsIGwnYWZlZ2lyZW0gYWwgbWFwIGkgY2FudmlhcmVtIGVsIGJhY2tncm91bmQgYSB2ZXJkXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgIC8vIFNpIGphIGVzdGF2YSBtb2RpZmljYWRhLCBpbmNyZW1lbnRhcmVtIGVsIG5vbWJyZSBkZSBjYW52aXMgZCdhcXVlc3RhIGNlbGEgYWwgbWFwXG4gICAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBoYSBlc3RhdCBtb2RpZmljYWRhIGxhIGxpbmVhLCBsYSBwaW50YXJlbSBkZSB2ZXJkXG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IrKztcblxuICAgICAgfVxuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA8IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpeyAvLyBFbnRyYXLDoCBhcXXDrSBzaSB2ZW5pbSBkJ3VuIHVuZG9cbiAgICAgICAgLy8gQ29tIHNhYmVtIHF1ZSBqYSBoYXZpZW0gZWRpdGF0IGxhIGNlbGEsIGFnYWZlbSBlbCBub21icmUgZGUgbW9kaWZpY2FjaW9ucyBxdWUgbCdoZW0gZmV0XG4gICAgICAgIGNvbnN0IG1vZGlmaWNhY2lvbnNBY3R1YWxzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcblxuICAgICAgICBpZiAobW9kaWZpY2FjaW9uc0FjdHVhbHMgPT09IDEpIHtcbiAgICAgICAgICAvLyBTaSBub23DqXMgdGUgdW5hIG1vZGlmaWNhY2nDsywgdm9sIGRpciBxdWUgYW1iIGwndW5kbyBoZW0gZGVpeGF0IGxhIGNlbGEgY29tIGEgbCdlc3RhdCBpbmljaWFsLCBwZWwgcXVlIGwnaGVtIGRlIGJvcnJhciBkZWwgbWFwXG4gICAgICAgICAgdGhpcy5tYXAuZGVsZXRlKHBhcmFtcy5ub2RlLmlkKTtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gTGkgcG9zYXJlbSB1biBhbHRyZSBjb3AgZWwgYmFja2dyb3VuZCBibGFuY1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIC8vIExhIGNlbGEgZW5jYXJhIG5vIGVzdMOgIGNvbSBhIGwnZXN0YXQgaW5pY2lhbCwgcGVsIHF1ZSBub21lcyByZXN0ZW0gZWwgbm9tYnJlIGRlIG1vZGlmaWNhY2lvbnMgYWwgbWFwXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyAtIDEpKTtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gZW5jYXJhIHRlIG1vZGlmaWNhY2lvbnMsIGhhIGRlIHRlbmlyIGVsIGJhY2tncm91bmQgdmVyZFxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3ItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXG4gICAgICB9XG4gICAgfVxufVxuIl19