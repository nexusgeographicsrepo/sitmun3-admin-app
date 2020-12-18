import { OnInit, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class DialogGridComponent implements OnInit {
    getAllRows: Subject<boolean>;
    private _addButtonClickedSubscription;
    tablesReceivedCounter: number;
    allRowsReceived: Array<any[]>;
    themeGrid: any;
    getAllsTable: Array<() => Observable<any>>;
    columnDefsTable: Array<any[]>;
    singleSelectionTable: Array<boolean>;
    addButtonClickedSubscription: Observable<boolean>;
    joinTables: EventEmitter<Array<any[]>>;
    constructor();
    ngOnInit(): void;
    getAllSelectedRows(): void;
    joinRowsReceived(data: any[]): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DialogGridComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DialogGridComponent, "app-dialog-grid", never, { "themeGrid": "themeGrid"; "getAllsTable": "getAllsTable"; "columnDefsTable": "columnDefsTable"; "singleSelectionTable": "singleSelectionTable"; "addButtonClickedSubscription": "addButtonClickedSubscription"; }, { "joinTables": "joinTables"; }, never, never>;
}

//# sourceMappingURL=dialog-grid.component.d.ts.map