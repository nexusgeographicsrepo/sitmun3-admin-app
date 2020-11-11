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
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#17AB4D' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
            }
            else {
                /** @type {?} */
                const modificacionsActuals = this.map.get(params.node.id);
                this.map.set(params.node.id, (modificacionsActuals + 1));
            }
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
            }
            this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
    }
}
DataGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-data-grid',
                template: `<div class="container" style="margin: 50px;"  >


    

    <div class="row">
        <div class="text-left" >
            <label>Search </label>
            <input type="text" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
            
        </div>


        <div class=" text-right btn-group-sm">
            <button class="btn btn-danger"  (click)="deleteChanges()" [disabled]="comptadorCanvis <= 0">Delete Changes</button>
            <button class="btn btn-warning" (click)="undo()" [disabled]="comptadorCanvis <= 0" >Undo</button>
            <button class="btn btn-warning" (click)="redo()" [disabled]="comptadorRedo <= 0">Redo</button>
            <button class="btn btn-success" (click)="applyChanges()" [disabled]="comptadorCanvis <= 0" >Apply Changes</button>
        </div>

        
        <div class=" text-right btn-group-sm">
            <button class="btn btn-secondary" (click)="removeData()">Remove</button>
            <button class="btn btn-success" (click)="newData()">New</button>
        </div>


    </div>

    <div class="row">
        <div class="ag-theme-balham" id="myGrid" >
            <ag-grid-angular
            style=" width: 750px; height: 500px;"
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
</div>

`,
                styles: [`label{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}`]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpGLE9BQU8sRUFBRSxtQkFBbUIsRUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBOEQ3RSxNQUFNO0lBc0JKO3VCQWxCb0IsbUJBQW1CO21CQUlaLElBQUksR0FBRyxFQUFrQjtRQWdCbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsR0FBRztnQkFDYixTQUFTLEVBQUUsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDO2FBQ3hDO1lBQ0QsWUFBWSxFQUFFLFVBQVU7U0FFekIsQ0FBQztLQUVIOzs7OztJQUlELFdBQVcsQ0FBQyxNQUFNO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMx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QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUM1QztZQUNELElBQUksQ0FDSixDQUFDO2dCQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxRDtZQUNELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO0tBQ0Y7OztZQXJQSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVEWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyw2RUFBNkUsQ0FBQzthQUN4Rjs7Ozs7eUJBZ0JFLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxNQUFNO2tCQUNOLE1BQU07MEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiBzdHlsZT1cIm1hcmdpbjogNTBweDtcIiAgPlxuXG5cbiAgICBcblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGVmdFwiID5cbiAgICAgICAgICAgIDxsYWJlbD5TZWFyY2ggPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiIHRleHQtcmlnaHQgYnRuLWdyb3VwLXNtXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPkRlbGV0ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5VbmRvPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5SZWRvPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPkFwcGx5IENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIgdGV4dC1yaWdodCBidG4tZ3JvdXAtc21cIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwibmV3RGF0YSgpXCI+TmV3PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiIGlkPVwibXlHcmlkXCIgPlxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxuICAgICAgICAgICAgc3R5bGU9XCIgd2lkdGg6IDc1MHB4OyBoZWlnaHQ6IDUwMHB4O1wiXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgICAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2VsbFZhbHVlQ2hhbmdlZCk9XCJvbkNlbGxWYWx1ZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZ3JpZFJlYWR5KT1cIm9uR3JpZFJlYWR5KCRldmVudClcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuICBtb2R1bGVzOiBNb2R1bGVbXSA9IEFsbENvbW11bml0eU1vZHVsZXM7XG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgZ3JpZEFwaTtcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW0gbCdpZCBkZSBsZXMgY2VsZXMgbW9kaWZpY2FkZXMgaSBlbCBuwrogZCdlZGljaW9ucyBzb2JyZSBhcXVlc3Rlc1xuICBwcml2YXRlIHBhcmFtczsgLy8gUGFyYW1zIGRlbCBncmlkIGEgbCfDumx0aW1hIG1vZGlmaWNhY2lvIChwZXIgc2kgZmVtIGFwcGx5IGNoYW5nZXMpXG4gIHJvd0RhdGE6IGFueVtdO1xuICBjb21wdGFkb3JDYW52aXM6IG51bWJlcjsgLy8gTm9tYnJlIGQnZWRpY2lvbnMgZmV0ZXMgc29icmUgY2VsZXNcbiAgY29tcHRhZG9yQ2FudmlzQW50ZXJpb3I6IG51bWJlcjsgLy8gTm9tYnJlIGQnZWRpY2lvbnMgYW50ZXJpb3IgYSBsJ2FjdHVhbCAoY29tcHRhZG9yQ2FudmlzKVxuICBjb21wdGFkb3JSZWRvOiBudW1iZXI7IC8vIE5vbWJyZSBkZSByZWRvcyBxdWUgcG9kZW0gZmVyXG4gIGdyaWRPcHRpb25zO1xuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBhbnlbXTtcbiAgQElucHV0KCkgZ2V0QWxsOiAoKSA9PiBPYnNlcnZhYmxlPGFueT47XG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgQE91dHB1dCgpIHNlbmRDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLnJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLnNlbmRDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7XG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIG1pbldpZHRoOiAxMDAsXG4gICAgICAgIGNlbGxTdHlsZToge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfSxcbiAgICAgIH0sXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXG5cbiAgICB9O1xuXG4gIH1cblxuXG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5ncmlkQXBpLnJvd0hlaWdodCA9IDEwMDtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcblxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gIFx0IGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZERhdGEpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoc2VsZWN0ZWREYXRhKTtcbiAgfVxuXG4gIG5ld0RhdGEoKTogdm9pZFxuICB7XG4gICAgY29uc29sZS5sb2codGhpcy5jb21wdGFkb3JDYW52aXMpO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5uZXcuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGFwcGx5Q2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBjb25zdCBpdGVtc0NoYW5nZWQ6IGFueVtdID0gW107XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLm1hcC5rZXlzKCkpXG4gICAge1xuICAgICAgaXRlbXNDaGFuZ2VkLnB1c2godGhpcy5ncmlkQXBpLmdldFJvd05vZGUoa2V5KS5kYXRhKTtcbiAgICB9XG4gICAgdGhpcy5zZW5kQ2hhbmdlcy5lbWl0KGl0ZW1zQ2hhbmdlZCk7XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvciA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cblxuICBkZWxldGVDaGFuZ2VzKCk6IHZvaWRcbiAge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY29tcHRhZG9yQ2FudmlzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIH1cbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuXG4gIHVuZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgKz0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gLT0gMTtcbiAgfVxuXG5cbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcbiAge1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzKys7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcbiAgfVxuXG5cblxuXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyAvLyBHdWFyZGFyZW0gZWxzIHBhcmFtYXRyZXMgYWN0dWFscyBwZXIgc2kgaGVtIGRlIGZlciB1biBhcHBseSBjaGFuZ2VzXG5cbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKVxuICAgICAgLy8gQXF1ZXN0YSBjb25kaWNpw7Mgc2Vyw6AgY2VydGEgc2kgdmVuaW0gZCdlZGl0YXIgbyBkZSBmZXIgdW4gcmVkbyAsIHBlcsOyIG5vIHNpIHZlbmltIGQndW4gdW5kb1xuXG4gICAgICB7XG4gICAgICAgIGlmICghIHRoaXMubWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIC8vIFNpIG5vIGhlbSBlZGl0YXQgbGEgY2VsYSBhbWIgYW50ZXJpb3JpdGF0LCBsJ2FmZWdpcmVtIGFsIG1hcCBpIGNhbnZpYXJlbSBlbCBiYWNrZ3JvdW5kIGEgdmVyZFxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAxKTtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyMxN0FCNEQnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXsgLy8gU2kgamEgZXN0YXZhIG1vZGlmaWNhZGEsIGluY3JlbWVudGFyZW0gZWwgbm9tYnJlIGRlIGNhbnZpcyBkJ2FxdWVzdGEgY2VsYSBhbCBtYXBcbiAgICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrO1xuXG4gICAgICB9XG4gICAgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzIDwgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcil7IC8vIEVudHJhcsOgIGFxdcOtIHNpIHZlbmltIGQndW4gdW5kb1xuICAgICAgICAvLyBDb20gc2FiZW0gcXVlIGphIGhhdmllbSBlZGl0YXQgbGEgY2VsYSwgYWdhZmVtIGVsIG5vbWJyZSBkZSBtb2RpZmljYWNpb25zIHF1ZSBsJ2hlbSBmZXRcbiAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuXG4gICAgICAgIGlmIChtb2RpZmljYWNpb25zQWN0dWFscyA9PT0gMSkge1xuICAgICAgICAgIC8vIFNpIG5vbcOpcyB0ZSB1bmEgbW9kaWZpY2FjacOzLCB2b2wgZGlyIHF1ZSBhbWIgbCd1bmRvIGhlbSBkZWl4YXQgbGEgY2VsYSBjb20gYSBsJ2VzdGF0IGluaWNpYWwsIHBlbCBxdWUgbCdoZW0gZGUgYm9ycmFyIGRlbCBtYXBcbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgLy8gTGEgY2VsYSBlbmNhcmEgbm8gZXN0w6AgY29tIGEgbCdlc3RhdCBpbmljaWFsLCBwZWwgcXVlIG5vbWVzIHJlc3RlbSBlbCBub21icmUgZGUgbW9kaWZpY2FjaW9ucyBhbCBtYXBcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzIC0gMSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3ItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXG4gICAgICB9XG4gICAgfVxufSJdfQ==