/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
export class DataGridComponent {
    constructor() {
        this.modules = AllCommunityModules;
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
                minWidth: 100,
                cellStyle: { backgroundColor: '#FFFFFF' },
            },
            rowSelection: 'multiple',
        };
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onGridReady(params) {
        this.params = params;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.rowHeight = 100;
        this.getElements();
        this.gridApi.sizeColumnsToFit();
    }
    /**
     * @return {?}
     */
    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }
    /**
     * @return {?}
     */
    getElements() {
        this.getAll()
            .subscribe((items) => {
            console.log(items);
            this.rowData = items;
        });
    }
    /**
     * @return {?}
     */
    removeData() {
        this.gridApi.stopEditing(false);
        /** @type {?} */
        const selectedNodes = this.gridApi.getSelectedNodes();
        /** @type {?} */
        const selectedData = selectedNodes.map(node => node.data);
        console.log(selectedData);
        this.remove.emit(selectedData);
    }
    /**
     * @return {?}
     */
    newData() {
        console.log(this.comptadorCanvis);
        this.gridApi.stopEditing(false);
        this.new.emit(true);
    }
    /**
     * @return {?}
     */
    applyChanges() {
        /** @type {?} */
        const itemsChanged = [];
        this.gridApi.stopEditing(false);
        for (const key of this.map.keys()) {
            itemsChanged.push(this.gridApi.getRowNode(key).data);
        }
        this.sendChanges.emit(itemsChanged);
        this.map.clear();
        this.comptadorCanvis = 0;
        this.comptadorCanvisAnterior = 0;
        this.comptadorRedo = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    }
    /**
     * @return {?}
     */
    deleteChanges() {
        console.log(this.comptadorCanvis);
        for (let i = 0; i < this.comptadorCanvis; i++) {
            this.gridApi.undoCellEditing();
        }
        this.map.clear();
        this.comptadorCanvisAnterior = 0;
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    }
    /**
     * @return {?}
     */
    undo() {
        this.gridApi.stopEditing(false);
        this.gridApi.undoCellEditing();
        this.comptadorCanvis -= 1;
        this.comptadorRedo += 1;
    }
    /**
     * @return {?}
     */
    redo() {
        this.gridApi.stopEditing(false);
        this.gridApi.redoCellEditing();
        this.comptadorCanvis += 1;
        this.comptadorRedo -= 1;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCellEditingStopped(e) {
        this.comptadorCanvis++;
        this.comptadorRedo = 0;
        this.onCellValueChanged(e);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onCellValueChanged(params) {
        this.params = params; // Guardarem els paramatres actuals per si hem de fer un apply changes
        if (this.comptadorCanvis > this.comptadorCanvisAnterior) {
            if (!this.map.has(params.node.id)) {
                this.map.set(params.node.id, 1);
            }
            else {
                /** @type {?} */
                const modificacionsActuals = this.map.get(params.node.id);
                this.map.set(params.node.id, (modificacionsActuals + 1));
            }
            /** @type {?} */
            const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com ha estat modificada la linea, la pintarem de verd
            params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
            this.gridApi.redrawRows({ rowNodes: [row] });
            params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            this.comptadorCanvisAnterior++;
        }
        if (this.comptadorCanvis < this.comptadorCanvisAnterior) {
            /** @type {?} */
            const modificacionsActuals = this.map.get(params.node.id);
            if (modificacionsActuals === 1) {
                // Si només te una modificació, vol dir que amb l'undo hem deixat la cela com a l'estat inicial, pel que l'hem de borrar del map
                this.map.delete(params.node.id);
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                this.gridApi.redrawRows({ rowNodes: [row] });
            }
            else {
                this.map.set(params.node.id, (modificacionsActuals - 1));
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com encara te modificacions, ha de tenir el background verd
                params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            }
            this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
    }
}
DataGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-data-grid',
                template: `
   <div id=grup1 >
    <button  mat-mini-fab  id="borrarCanvis" type="button"  (click)="deleteChanges()" [disabled]="comptadorCanvis <= 0">
        <mat-icon fontSet="material-icons-round" > close </mat-icon>
    </button>
    <button mat-mini-fab  id="undo"  (click)="undo()" [disabled]="comptadorCanvis <= 0" >
        <mat-icon fontSet="material-icons-round" > undo </mat-icon>
    </button>
    <button mat-mini-fab  id="redo"  (click)="redo()" [disabled]="comptadorRedo <= 0">
        <mat-icon fontSet="material-icons-round" > redo </mat-icon>
    </button>
    <button mat-mini-fab  id="aplicarCanvis"  (click)="applyChanges()" [disabled]="comptadorCanvis <= 0" >
        <mat-icon fontSet="material-icons-round" > check </mat-icon>
    </button>
</div>

<div id=grup2 >
    <label>Search </label>
    <input type="text" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
    <button mat-stroked-button id="botoElimina"  (click)="removeData()">
        <mat-icon fontSet="material-icons-round" > delete </mat-icon>
        Elimina
    </button>
    <button mat-stroked-button id="botoNou"  (click)="newData()">
        <mat-icon fontSet="material-icons-round"> add_circle_outline </mat-icon>                 
        Nou
    </button>


    
</div>



<div class="row" style=" height: 100%">
    <div class="ag-theme-balham" id="myGrid" style=" width:100%; height: 100%" >
        <ag-grid-angular
        style=" width: 100%; height: 100%;"
        class="ag-theme-balham"
        [floatingFilter]="true"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        [gridOptions]="gridOptions"
        [animateRows]="true"
        [pagination]="false"
        [modules]="modules"     
        [undoRedoCellEditing]="true"    
        [undoRedoCellEditingLimit]= 200
        [suppressRowClickSelection]=true
        [enableCellChangeFlash]=true
        rowSelection="multiple"
        (cellEditingStopped) ="onCellEditingStopped($event)"
        (cellValueChanged)="onCellValueChanged($event)"
        (gridReady)="onGridReady($event)">
        
        </ag-grid-angular>
    </div>
</div>


`,
                styles: [`input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{background:no-repeat padding-box #68a225;margin-left:3px}#redo,#undo{background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{background:#df3133}#grup1{text-align:start;width:40%}#grup2{text-align:end;width:60%}#grup1,#grup2{display:inline-block}`]
            },] },
];
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }],
    remove: [{ type: Output }],
    new: [{ type: Output }],
    sendChanges: [{ type: Output }]
};
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
    DataGridComponent.prototype.remove;
    /** @type {?} */
    DataGridComponent.prototype.new;
    /** @type {?} */
    DataGridComponent.prototype.sendChanges;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpGLE9BQU8sRUFBRSxtQkFBbUIsRUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBbUU3RSxNQUFNO0lBc0JKO3VCQWxCb0IsbUJBQW1CO21CQUlaLElBQUksR0FBRyxFQUFrQjtRQWdCbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsR0FBRztnQkFDYixTQUFTLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDO2FBQ3hDO1lBQ0QsWUFBWSxFQUFFLFVBQVU7U0FFekIsQ0FBQztLQUVIOzs7OztJQUlELFdBQVcsQ0FBQyxNQUFNO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FHakM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRUQsV0FBVztRQUVULElBQUksQ0FBQyxNQUFNLEVBQUU7YUFDWixTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUNoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7O1FBQ3RELE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNoQzs7OztJQUVELE9BQU87UUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQjs7OztJQUVELFlBQVk7O1FBRVYsTUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FDbEMsQ0FBQztZQUNDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDM0I7Ozs7SUFJRCxhQUFhO1FBRVgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUM3QyxDQUFDO1lBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUksRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMzQjs7OztJQUlELElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7O0lBR0Qsb0JBQW9CLENBQUMsQ0FBQztRQUVwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUtELGtCQUFrQixDQUFDLE1BQU07UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FHdEQsQ0FBQztZQUNDLEVBQUUsQ0FBQyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNuQyxDQUFDO2dCQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxDQUFBLENBQUM7O2dCQUVILE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFEOztZQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBRWhDO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQSxDQUFDOztZQUVyRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUQsRUFBRSxDQUFDLENBQUMsb0JBQW9CLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxDQUNKLENBQUM7Z0JBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDekQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNoQztLQUNGOzs7WUEvUEosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTREWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQywyZ0JBQTJnQixDQUFDO2FBQ3RoQjs7Ozs7eUJBZ0JFLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxNQUFNO2tCQUNOLE1BQU07MEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYFxuICAgPGRpdiBpZD1ncnVwMSA+XG4gICAgPGJ1dHRvbiAgbWF0LW1pbmktZmFiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPlxuICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjbG9zZSA8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LW1pbmktZmFiICBpZD1cInVuZG9cIiAgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5cbiAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LW1pbmktZmFiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5cbiAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gcmVkbyA8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LW1pbmktZmFiICBpZD1cImFwbGljYXJDYW52aXNcIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPlxuICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjaGVjayA8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5cbjxkaXYgaWQ9Z3J1cDIgPlxuICAgIDxsYWJlbD5TZWFyY2ggPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxuICAgIDxidXR0b24gbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiYm90b0VsaW1pbmFcIiAgKGNsaWNrKT1cInJlbW92ZURhdGEoKVwiPlxuICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBkZWxldGUgPC9tYXQtaWNvbj5cbiAgICAgICAgRWxpbWluYVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiYm90b05vdVwiICAoY2xpY2spPVwibmV3RGF0YSgpXCI+XG4gICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIj4gYWRkX2NpcmNsZV9vdXRsaW5lIDwvbWF0LWljb24+ICAgICAgICAgICAgICAgICBcbiAgICAgICAgTm91XG4gICAgPC9idXR0b24+XG5cblxuICAgIFxuPC9kaXY+XG5cblxuXG48ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCIgaGVpZ2h0OiAxMDAlXCI+XG4gICAgPGRpdiBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiIGlkPVwibXlHcmlkXCIgc3R5bGU9XCIgd2lkdGg6MTAwJTsgaGVpZ2h0OiAxMDAlXCIgPlxuICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICAgICAgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIlxuICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzXCJcbiAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcbiAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxuICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXG4gICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXG4gICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcbiAgICAgICAgW3VuZG9SZWRvQ2VsbEVkaXRpbmdMaW1pdF09IDIwMFxuICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxuICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXG4gICAgICAgIHJvd1NlbGVjdGlvbj1cIm11bHRpcGxlXCJcbiAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXG4gICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgIFxuICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG5cbmAsXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jYm90b05vdXtjb2xvcjojZmZmO2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNib3RvRWxpbWluYXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc3tiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jcmVkbywjdW5kb3tiYWNrZ3JvdW5kOiNmZjkzMDA7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvW2Rpc2FibGVkXSwjdW5kb1tkaXNhYmxlZF17YmFja2dyb3VuZDojZmZjOTdmO21hcmdpbi1sZWZ0OjNweH0jYm9ycmFyQ2Fudmlze2JhY2tncm91bmQ6I2RmMzEzM30jZ3J1cDF7dGV4dC1hbGlnbjpzdGFydDt3aWR0aDo0MCV9I2dydXAye3RleHQtYWxpZ246ZW5kO3dpZHRoOjYwJX0jZ3J1cDEsI2dydXAye2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFHcmlkQ29tcG9uZW50IHtcbiBcblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIG1hcDogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7IC8vIEd1YXJkYXJlbSBsJ2lkIGRlIGxlcyBjZWxlcyBtb2RpZmljYWRlcyBpIGVsIG7CuiBkJ2VkaWNpb25zIHNvYnJlIGFxdWVzdGVzXG4gIHByaXZhdGUgcGFyYW1zOyAvLyBQYXJhbXMgZGVsIGdyaWQgYSBsJ8O6bHRpbWEgbW9kaWZpY2FjaW8gKHBlciBzaSBmZW0gYXBwbHkgY2hhbmdlcylcbiAgcm93RGF0YTogYW55W107XG4gIGNvbXB0YWRvckNhbnZpczogbnVtYmVyOyAvLyBOb21icmUgZCdlZGljaW9ucyBmZXRlcyBzb2JyZSBjZWxlc1xuICBjb21wdGFkb3JDYW52aXNBbnRlcmlvcjogbnVtYmVyOyAvLyBOb21icmUgZCdlZGljaW9ucyBhbnRlcmlvciBhIGwnYWN0dWFsIChjb21wdGFkb3JDYW52aXMpXG4gIGNvbXB0YWRvclJlZG86IG51bWJlcjsgLy8gTm9tYnJlIGRlIHJlZG9zIHF1ZSBwb2RlbSBmZXJcbiAgZ3JpZE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgbWluV2lkdGg6IDEwMCxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdyaWRBcGkucm93SGVpZ2h0ID0gMTAwO1xuICAgIHRoaXMuZ2V0RWxlbWVudHMoKTtcbiAgICB0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuXG5cbiAgfVxuXG4gIHF1aWNrU2VhcmNoKCk6IHZvaWR7XG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XG4gIH1cblxuICBnZXRFbGVtZW50cygpOiB2b2lkXG4gIHtcbiAgICB0aGlzLmdldEFsbCgpXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coaXRlbXMpO1xuICAgICAgICB0aGlzLnJvd0RhdGEgPSBpdGVtcztcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5ncmlkQXBpLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgXHQgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkRGF0YSk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChzZWxlY3RlZERhdGEpO1xuICB9XG5cbiAgbmV3RGF0YSgpOiB2b2lkXG4gIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbXB0YWRvckNhbnZpcyk7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLm5ldy5lbWl0KHRydWUpO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCk6IHZvaWRcbiAge1xuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMubWFwLmtleXMoKSlcbiAgICB7XG4gICAgICBpdGVtc0NoYW5nZWQucHVzaCh0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShrZXkpLmRhdGEpO1xuICAgIH1cbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuXG4gIGRlbGV0ZUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc29sZS5sb2codGhpcy5jb21wdGFkb3JDYW52aXMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb21wdGFkb3JDYW52aXM7IGkrKylcbiAgICB7XG4gICAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgfVxuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvciA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgdW5kbygpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyAtPSAxO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyArPSAxO1xuICB9XG5cbiAgcmVkbygpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRvQ2VsbEVkaXRpbmcoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyArPSAxO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyAtPSAxO1xuICB9XG5cblxuICBvbkNlbGxFZGl0aW5nU3RvcHBlZChlKVxuICB7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMrKztcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMub25DZWxsVmFsdWVDaGFuZ2VkKGUpO1xuICB9XG5cblxuXG5cbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbSBlbHMgcGFyYW1hdHJlcyBhY3R1YWxzIHBlciBzaSBoZW0gZGUgZmVyIHVuIGFwcGx5IGNoYW5nZXNcblxuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA+IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpXG4gICAgICAvLyBBcXVlc3RhIGNvbmRpY2nDsyBzZXLDoCBjZXJ0YSBzaSB2ZW5pbSBkJ2VkaXRhciBvIGRlIGZlciB1biByZWRvIChjb21wdGFkb3IgY2FudmlzID4pLCBwZXLDsiBubyBzaSB2ZW5pbSBkJ3VuIHVuZG9cblxuICAgICAge1xuICAgICAgICBpZiAoISB0aGlzLm1hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBTaSBubyBoZW0gZWRpdGF0IGxhIGNlbGEgYW1iIGFudGVyaW9yaXRhdCwgbCdhZmVnaXJlbSBhbCBtYXAgaSBjYW52aWFyZW0gZWwgYmFja2dyb3VuZCBhIHZlcmRcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgLy8gU2kgamEgZXN0YXZhIG1vZGlmaWNhZGEsIGluY3JlbWVudGFyZW0gZWwgbm9tYnJlIGRlIGNhbnZpcyBkJ2FxdWVzdGEgY2VsYSBhbCBtYXBcbiAgICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGhhIGVzdGF0IG1vZGlmaWNhZGEgbGEgbGluZWEsIGxhIHBpbnRhcmVtIGRlIHZlcmRcbiAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtIGVsIGNlbGxTdHlsZSBibGFuYyBwZXIgcHJveGltZXMgY2VsZXNcbiAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrO1xuXG4gICAgICB9XG4gICAgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzIDwgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcil7IC8vIEVudHJhcsOgIGFxdcOtIHNpIHZlbmltIGQndW4gdW5kb1xuICAgICAgICAvLyBDb20gc2FiZW0gcXVlIGphIGhhdmllbSBlZGl0YXQgbGEgY2VsYSwgYWdhZmVtIGVsIG5vbWJyZSBkZSBtb2RpZmljYWNpb25zIHF1ZSBsJ2hlbSBmZXRcbiAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuXG4gICAgICAgIGlmIChtb2RpZmljYWNpb25zQWN0dWFscyA9PT0gMSkge1xuICAgICAgICAgIC8vIFNpIG5vbcOpcyB0ZSB1bmEgbW9kaWZpY2FjacOzLCB2b2wgZGlyIHF1ZSBhbWIgbCd1bmRvIGhlbSBkZWl4YXQgbGEgY2VsYSBjb20gYSBsJ2VzdGF0IGluaWNpYWwsIHBlbCBxdWUgbCdoZW0gZGUgYm9ycmFyIGRlbCBtYXBcbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgLy8gTGEgY2VsYSBlbmNhcmEgbm8gZXN0w6AgY29tIGEgbCdlc3RhdCBpbmljaWFsLCBwZWwgcXVlIG5vbWVzIHJlc3RlbSBlbCBub21icmUgZGUgbW9kaWZpY2FjaW9ucyBhbCBtYXBcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzIC0gMSkpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBlbmNhcmEgdGUgbW9kaWZpY2FjaW9ucywgaGEgZGUgdGVuaXIgZWwgYmFja2dyb3VuZCB2ZXJkXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvci0tOyAgLy8gQ29tIHZlbmllbSBkJ3VuZG8sIGhlbSBkZSBkZWNyZW1lbnRhciBlbCBjb21wdGFkb3IgZGUgY2FudmlzQW50ZXJpb3JcbiAgICAgIH1cbiAgICB9XG5cblxufVxuIl19