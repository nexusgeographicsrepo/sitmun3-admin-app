import { OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '@ag-grid-community/all-modules';
import * as ɵngcc0 from '@angular/core';
export declare class DataGridComponent implements OnInit {
    modules: Module[];
    searchValue: string;
    private gridApi;
    private gridColumnApi;
    columnDefs: any[];
    rowData: any[];
    getAll: () => Observable<any>;
    remove: EventEmitter<any[]>;
    new: EventEmitter<boolean>;
    constructor();
    ngOnInit(): void;
    onGridReady(params: any): void;
    quickSearch(): void;
    getElements(): void;
    removeData(): void;
    newData(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DataGridComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DataGridComponent, "app-data-grid", never, { "columnDefs": "columnDefs"; "getAll": "getAll"; }, { "remove": "remove"; "new": "new"; }, never, never>;
}

//# sourceMappingURL=data-grid.component.d.ts.map