import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '@ag-grid-community/all-modules';
import * as ɵngcc0 from '@angular/core';
export declare class DataGridComponent {
    modules: Module[];
    searchValue: string;
    private gridApi;
    private gridColumnApi;
    statusColumn: boolean;
    map: Map<number, number>;
    private params;
    rowData: any[];
    changeCounter: number;
    previousChangeCounter: number;
    redoCounter: number;
    modificationChange: boolean;
    gridOptions: any;
    frameworkComponents: any;
    columnDefs: any[];
    getAll: () => Observable<any>;
    discardChangesButton: boolean;
    undoButton: boolean;
    redoButton: boolean;
    applyChangesButton: boolean;
    deleteButton: boolean;
    newButton: boolean;
    globalSearch: boolean;
    remove: EventEmitter<any[]>;
    new: EventEmitter<number>;
    sendChanges: EventEmitter<any[]>;
    constructor();
    onGridReady(params: any): void;
    quickSearch(): void;
    getElements(): void;
    removeData(): void;
    newData(): void;
    applyChanges(): void;
    deleteChanges(): void;
    onFilterModified(): void;
    undo(): void;
    redo(): void;
    onCellEditingStopped(e: any): void;
    onCellValueChanged(params: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataGridComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DataGridComponent, "app-data-grid", never, { "frameworkComponents": "frameworkComponents"; "columnDefs": "columnDefs"; "getAll": "getAll"; "discardChangesButton": "discardChangesButton"; "undoButton": "undoButton"; "redoButton": "redoButton"; "applyChangesButton": "applyChangesButton"; "deleteButton": "deleteButton"; "newButton": "newButton"; "globalSearch": "globalSearch"; }, { "remove": "remove"; "new": "new"; "sendChanges": "sendChanges"; }, never, never>;
}

//# sourceMappingURL=data-grid.component.d.ts.map